import computeData from "@/lib/simulation-compute";

export interface SimulationState {
  vegan: boolean;
  vegetarian: boolean;
  noCar: boolean;
  noThrash: boolean;
  keeper: boolean;
  flat: boolean;
  noHousingFossile: boolean;
  secondHandClothes: boolean;
  publicDecarb: boolean;
  meatReduction: number;
  longFlights: number;
  mediumFlights: number;
  localFood: boolean;
  shortShowers: boolean;
  stopYoutubeStreaming: boolean;
}

export const defaultSimulationState: SimulationState = {
  vegan: false,
  vegetarian: false,
  noCar: false,
  noThrash: false,
  keeper: false,
  flat: false,
  noHousingFossile: false,
  secondHandClothes: false,
  publicDecarb: false,
  meatReduction: 0,
  longFlights: 0,
  mediumFlights: 0.5,
  localFood: false,
  shortShowers: false,
  stopYoutubeStreaming: false,
};

export interface Poste {
  name: string;
  size: number;
  category: string;
}

export function computePostes(s: SimulationState): Poste[] {
  return computeData(
    s.vegan,
    s.vegetarian,
    s.noCar,
    s.noThrash,
    s.keeper,
    s.flat,
    s.noHousingFossile,
    s.secondHandClothes,
    s.publicDecarb,
    s.meatReduction,
    s.longFlights,
    s.mediumFlights,
    s.localFood,
    s.shortShowers,
    s.stopYoutubeStreaming,
  );
}

export function computeTotal(s: SimulationState): number {
  return computePostes(s).reduce((acc, poste) => acc + poste.size, 0);
}

export function computeByCategory(
  s: SimulationState,
): { category: string; size: number }[] {
  const postes = computePostes(s);
  const byCategory = new Map<string, number>();
  postes.forEach((poste) => {
    byCategory.set(
      poste.category,
      (byCategory.get(poste.category) ?? 0) + poste.size,
    );
  });
  return Array.from(byCategory.entries())
    .map(([category, size]) => ({ category, size }))
    .sort((a, b) => b.size - a.size);
}

export const PARIS_TARGET_KG = 2000;

export const FRENCH_AVERAGE_KG = computeTotal(defaultSimulationState);

export interface ClimateAction {
  id: string;
  label: string;
  emoji: string;
  apply: (s: SimulationState) => SimulationState;
}

export const climateActions: ClimateAction[] = [
  {
    id: "no-flights",
    label: "Remplacer l'avion par le train",
    emoji: "🚄",
    apply: (s) => ({ ...s, longFlights: 0, mediumFlights: 0 }),
  },
  {
    id: "vegetarian",
    label: "Devenir végétarien",
    emoji: "🥦",
    apply: (s) => ({ ...s, vegetarian: true, meatReduction: 0 }),
  },
  {
    id: "less-meat",
    label: "Diviser ma consommation de viande par 2",
    emoji: "🥩",
    apply: (s) =>
      s.vegan || s.vegetarian
        ? s
        : { ...s, meatReduction: Math.max(s.meatReduction, 2) },
  },
  {
    id: "no-car",
    label: "Me passer de voiture",
    emoji: "🚲",
    apply: (s) => ({ ...s, noCar: true }),
  },
  {
    id: "no-fossil-heating",
    label: "Me chauffer sans énergie fossile",
    emoji: "🔥",
    apply: (s) => ({ ...s, noHousingFossile: true }),
  },
  {
    id: "local-food",
    label: "Manger local",
    emoji: "🧑‍🌾",
    apply: (s) => ({ ...s, localFood: true }),
  },
  {
    id: "keeper",
    label: "Garder mes objets deux fois plus longtemps",
    emoji: "🛋️",
    apply: (s) => ({ ...s, keeper: true }),
  },
  {
    id: "second-hand",
    label: "Acheter mes vêtements d'occasion",
    emoji: "🧢",
    apply: (s) => ({ ...s, secondHandClothes: true }),
  },
  {
    id: "zero-waste",
    label: "Passer au zéro déchet",
    emoji: "🗑️",
    apply: (s) => ({ ...s, noThrash: true }),
  },
  {
    id: "short-showers",
    label: "Prendre des douches courtes",
    emoji: "🚿",
    apply: (s) => ({ ...s, shortShowers: true }),
  },
  {
    id: "less-streaming",
    label: "Une heure de streaming en moins par jour",
    emoji: "📺",
    apply: (s) => ({ ...s, stopYoutubeStreaming: true }),
  },
];

export interface RankedAction extends ClimateAction {
  deltaKg: number;
}

export function rankActions(s: SimulationState): RankedAction[] {
  const baseTotal = computeTotal(s);
  return climateActions
    .map((action) => ({
      ...action,
      deltaKg: Math.max(0, Math.round(baseTotal - computeTotal(action.apply(s)))),
    }))
    .sort((a, b) => b.deltaKg - a.deltaKg);
}

export function formatTonnes(kg: number): string {
  return (kg / 1000).toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
