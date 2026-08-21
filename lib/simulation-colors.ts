const categoryRgb: Record<string, [number, number, number]> = {
  "Déplacements": [59, 91, 219],
  "Nourriture": [220, 56, 45],
  "Logement": [26, 137, 63],
  "Achats": [130, 54, 166],
  "Dépense publique": [110, 110, 110],
};

export function categoryColor(category: string, size: number): string {
  const rgb = categoryRgb[category] ?? [128, 128, 128];
  const alpha = Math.min(1, (1 + Math.log(Math.max(size, 1))) / 13 + 0.25);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

export function categoryLegendColor(category: string): string {
  const rgb = categoryRgb[category] ?? [128, 128, 128];
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export const categoryOrder = Object.keys(categoryRgb);
