const STORAGE_KEY = 'az-kviz-palette';
const PALETTES = new Set(['light', 'warm', 'dark']);

export function initializePalettePicker(selects) {
  const pickers = Array.from(selects);
  if (pickers.length === 0) return;

  function applyPalette(palette) {
    if (!PALETTES.has(palette)) return;
    document.documentElement.dataset.palette = palette;
    pickers.forEach(picker => { picker.value = palette; });
    try {
      localStorage.setItem(STORAGE_KEY, palette);
    } catch (error) {
      console.error('Nepodařilo se uložit barevné schéma.', error);
    }
  }

  try {
    const savedPalette = localStorage.getItem(STORAGE_KEY);
    if (PALETTES.has(savedPalette)) pickers.forEach(picker => { picker.value = savedPalette; });
  } catch (error) {
    console.error('Nepodařilo se načíst uložené barevné schéma.', error);
  }

  applyPalette(pickers[0].value);
  pickers.forEach(picker => {
    picker.addEventListener('change', () => applyPalette(picker.value));
  });
}
