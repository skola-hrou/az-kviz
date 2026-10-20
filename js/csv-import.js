const LETTERS = ['A', 'B', 'C', 'D'];

function splitRecords(text, delim) {
  const records = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch !== '"') {
        field += ch;
      } else if (text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = false;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delim) {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      records.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    records.push(row);
  }
  return records;
}

// Format: first row is a header; columns otázka;odpověď A;odpověď B;odpověď C;odpověď D;správná (A–D).
// Delimiter is ';' or ',' according to the header row.
export function parseQuestionsCsv(text) {
  const clean = text.replace(/^\uFEFF/, '');
  const headerLine = clean.split(/\r?\n/, 1)[0];
  const delim = headerLine.includes(';') ? ';' : ',';
  const records = splitRecords(clean, delim).filter(r => r.some(c => c.trim() !== ''));
  if (records.length < 2) {
    throw new Error('CSV neobsahuje žádné otázky (první řádek je hlavička).');
  }

  const questions = [];
  const errors = [];
  records.slice(1).forEach((cells, i) => {
    const line = i + 2;
    if (cells.length < 6) {
      errors.push(`Řádek ${line}: chybí sloupce (očekávám 6).`);
      return;
    }
    const txt = cells[0].trim();
    const options = cells.slice(1, 5).map(c => c.trim());
    const correctIndex = LETTERS.indexOf(cells[5].trim().toUpperCase());
    if (!txt || options.some(o => !o)) {
      errors.push(`Řádek ${line}: chybí text otázky nebo některá odpověď.`);
    } else if (correctIndex < 0) {
      errors.push(`Řádek ${line}: sloupec „správná“ musí být A, B, C nebo D.`);
    } else {
      questions.push({ text: txt, imageUrl: null, options, correctIndex });
    }
  });

  if (errors.length) {
    const shown = errors.slice(0, 5).join(' ');
    const more = errors.length > 5 ? ` (a dalších ${errors.length - 5})` : '';
    throw new Error(shown + more);
  }
  return questions;
}
