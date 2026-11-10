const STORAGE_KEY = 'az-kviz-palette';
const PALETTES = new Set(['light', 'warm', 'dark']);

export function initializePalettePicker(select) {
  function applyPalette(palette) {
    if (!PALETTES.has(palette)) return;
    document.documentElement.dataset.palette = palette;
    try {
      localStorage.setItem(STORAGE_KEY, palette);
    } catch (error) {
      console.error('Nepodařilo se uložit barevné schéma.', error);
    }
  }

  try {
    const savedPalette = localStorage.getItem(STORAGE_KEY);
    if (PALETTES.has(savedPalette)) select.value = savedPalette;
  } catch (error) {
    console.error('Nepodařilo se načíst uložené barevné schéma.', error);
  }

  applyPalette(select.value);
  select.addEventListener('change', () => applyPalette(select.value));
}
