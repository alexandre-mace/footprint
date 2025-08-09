export interface VersusSide {
  label: string;
  emissions: Record<string, number>;
}

export interface Versus {
  id: string;
  name: string;
  description: string;
  sideA: VersusSide;
  sideB: VersusSide;
  sideC?: VersusSide; // Pour les comparaisons à 3 éléments
}

// Type pour les données JSON brutes
export interface VersusRawSide {
  label: string;
  emissions: Record<string, number | undefined>;
}

export interface VersusRaw {
  id: string;
  name: string;
  description: string;
  sideA: VersusRawSide;
  sideB: VersusRawSide;
  sideC?: VersusRawSide;
}