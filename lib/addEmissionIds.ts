import Category from "@/types/category";

interface RawEmission {
  label: string;
  value: number;
  color: string;
  min: number;
  max: number;
  isVisible: boolean;
}

interface RawCategory {
  label: string;
  img: string;
  emissions: RawEmission[];
}

export const addEmissionIds = (categories: RawCategory[]): Category[] => {
  return categories.map((category) => ({
    ...category,
    emissions: category.emissions.map((emission: RawEmission, index: number) => ({
      ...emission,
      id: `${category.label.toLowerCase().replace(/\s+/g, '-')}-${emission.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
      quantity: 0,
    })),
  }));
};