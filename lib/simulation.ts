import computeData from "@/lib/simulation-compute";

export const DEFAULT_CAR_KM = 12000;
export const DEFAULT_MEAT_MEALS = 7;

// ACV Ademe par km : 0,103 kgCO2e (électrique, mix français) vs 0,218 (thermique)
export const ELECTRIC_CAR_RATIO = 0.103 / 0.218;

export interface SimulationState {
  vegan: boolean;
  vegetarian: boolean;
  carKm: number;
  electricCar: boolean;
  noThrash: boolean;
  keeper: boolean;
  flat: boolean;
  noHousingFossile: boolean;
  secondHandClothes: boolean;
  publicDecarb: boolean;
  meatMealsPerWeek: number;
  longFlights: number;
  mediumFlights: number;
  localFood: boolean;
  shortShowers: boolean;
  stopYoutubeStreaming: boolean;
}

/**
 * Profil de départ : un mode de vie courant mais chargé (voiture, avion,
 * viande quotidienne, chauffage au gaz), volontairement au-dessus de la
 * moyenne.
 * La moyenne avion est biaisée (11 % des Français prennent régulièrement
 * l'avion) et gommerait la réalité de ces postes pour qui veut se situer.
 */
export const defaultSimulationState: SimulationState = {
  vegan: false,
  vegetarian: false,
  carKm: 15000,
  electricCar: false,
  noThrash: false,
  keeper: false,
  flat: false,
  noHousingFossile: false,
  secondHandClothes: false,
  publicDecarb: false,
  meatMealsPerWeek: DEFAULT_MEAT_MEALS,
  longFlights: 1,
  mediumFlights: 2,
  localFood: false,
  shortShowers: false,
  stopYoutubeStreaming: false,
};

/** Français moyen statistique : la référence de la frise et du classement. */
export const averageSimulationState: SimulationState = {
  ...defaultSimulationState,
  carKm: DEFAULT_CAR_KM,
  meatMealsPerWeek: DEFAULT_MEAT_MEALS,
  longFlights: 0,
  mediumFlights: 0.5,
};

export interface Poste {
  name: string;
  size: number;
  category: string;
}

export function computePostes(s: SimulationState): Poste[] {
  const postes = computeData(
    s.vegan,
    s.vegetarian,
    false,
    s.noThrash,
    s.keeper,
    s.flat,
    s.noHousingFossile,
    s.secondHandClothes,
    s.publicDecarb,
    0,
    s.longFlights,
    s.mediumFlights,
    s.localFood,
    s.shortShowers,
    s.stopYoutubeStreaming,
  );
  return postes.map((poste) => {
    if (poste.name.startsWith("Voiture")) {
      return {
        ...poste,
        size:
          poste.size *
          (s.carKm / DEFAULT_CAR_KM) *
          (s.electricCar ? ELECTRIC_CAR_RATIO : 1),
      };
    }
    if (poste.name.startsWith("Viande") && !s.vegan && !s.vegetarian) {
      return {
        ...poste,
        size: poste.size * (s.meatMealsPerWeek / DEFAULT_MEAT_MEALS),
      };
    }
    return poste;
  });
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

export const FRENCH_AVERAGE_KG = computeTotal(averageSimulationState);

export interface ClimateAction {
  id: string;
  label: string;
  emoji: string;
  /** Catégorie de la frise (étape 2) sur laquelle l'action agit */
  category: string;
  apply: (s: SimulationState) => SimulationState;
}

export const climateActions: ClimateAction[] = [
  {
    id: "no-flights",
    category: "Déplacements",
    label: "Remplacer l'avion par le train",
    emoji: "🚄",
    apply: (s) => ({ ...s, longFlights: 0, mediumFlights: 0 }),
  },
  {
    id: "vegetarian",
    category: "Nourriture",
    label: "Devenir végétarien",
    emoji: "🥦",
    apply: (s) => ({ ...s, vegetarian: true }),
  },
  {
    id: "less-meat",
    category: "Nourriture",
    label: "Passer à 2 repas de viande par semaine",
    emoji: "🥩",
    apply: (s) =>
      s.vegan || s.vegetarian
        ? s
        : { ...s, meatMealsPerWeek: Math.min(s.meatMealsPerWeek, 2) },
  },
  {
    id: "no-car",
    category: "Déplacements",
    label: "Me passer de voiture",
    emoji: "🚲",
    apply: (s) => ({ ...s, carKm: 0 }),
  },
  {
    id: "half-car",
    category: "Déplacements",
    label: "Diviser mes km en voiture par 2 (covoiturage, vélo)",
    emoji: "🚴",
    apply: (s) => ({ ...s, carKm: s.carKm / 2 }),
  },
  {
    id: "electric-car",
    category: "Déplacements",
    label: "Passer à la voiture électrique",
    emoji: "⚡",
    apply: (s) => ({ ...s, electricCar: true }),
  },
  {
    id: "no-fossil-heating",
    category: "Logement",
    label: "Me chauffer sans énergie fossile",
    emoji: "🔥",
    apply: (s) => ({ ...s, noHousingFossile: true }),
  },
  {
    id: "local-food",
    category: "Nourriture",
    label: "Manger local",
    emoji: "🧑‍🌾",
    apply: (s) => ({ ...s, localFood: true }),
  },
  {
    id: "keeper",
    category: "Achats",
    label: "Garder mes objets deux fois plus longtemps",
    emoji: "🛋️",
    apply: (s) => ({ ...s, keeper: true }),
  },
  {
    id: "second-hand",
    category: "Achats",
    label: "Acheter mes vêtements d'occasion",
    emoji: "🧢",
    apply: (s) => ({ ...s, secondHandClothes: true }),
  },
  {
    id: "zero-waste",
    category: "Achats",
    label: "Passer au zéro déchet",
    emoji: "🗑️",
    apply: (s) => ({ ...s, noThrash: true }),
  },
  {
    id: "short-showers",
    category: "Logement",
    label: "Prendre des douches courtes",
    emoji: "🚿",
    apply: (s) => ({ ...s, shortShowers: true }),
  },
  {
    id: "less-streaming",
    category: "Logement",
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
