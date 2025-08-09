export type PresetCategory = 'transport' | 'numérique' | 'alimentation' | 'personnel' | 'mixte';

export interface Preset {
  id: string;
  name: string;
  description?: string;
  emissions: Record<string, number>; // emissionId -> quantity
  category: PresetCategory;
  createdAt: Date;
  isDefault?: boolean;
}

export interface PresetGroup {
  category: PresetCategory;
  label: string;
  icon: string;
  presets: Preset[];
}