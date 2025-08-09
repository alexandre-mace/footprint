import { z } from 'zod';

export const EmissionSchema = z.object({
  id: z.string().min(1, "ID requis"),
  label: z.string().min(1, "Label requis"),
  value: z.number().positive("Valeur doit être positive"),
  quantity: z.number().int().min(0, "Quantité doit être positive ou zéro").max(1000000, "Quantité trop importante"),
  color: z.string().regex(/^(#|rgb|rgba|hsl)/, "Format de couleur invalide"),
  min: z.number().min(0),
  max: z.number().positive(),
  isVisible: z.boolean(),
}).refine(data => data.min <= data.max, {
  message: "La valeur minimum doit être inférieure ou égale au maximum",
  path: ["min"]
});

export const CategorySchema = z.object({
  label: z.string().min(1, "Label de catégorie requis"),
  img: z.string().url("URL d'image invalide"),
  emissions: z.array(EmissionSchema).min(1, "Au moins une émission requise"),
});

export const EmissionsDataSchema = z.array(CategorySchema);

export const QuantityUpdateSchema = z.object({
  emissionId: z.string().min(1),
  quantity: z.number().int().min(0).max(1000000),
});

// Validation pour les presets
export const PresetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Nom du preset requis").max(50, "Nom trop long"),
  description: z.string().max(200, "Description trop longue").optional(),
  emissions: z.record(z.string(), z.number().min(0)),
  createdAt: z.date().optional(),
  category: z.enum(['transport', 'numérique', 'alimentation', 'personnel']).optional(),
});

export type ValidationError = {
  field?: string;
  message: string;
  code: string;
};

export const validateQuantityUpdate = (data: unknown): { success: true; data: z.infer<typeof QuantityUpdateSchema> } | { success: false; error: ValidationError } => {
  try {
    const result = QuantityUpdateSchema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return {
        success: false,
        error: {
          field: firstError.path.join('.'),
          message: firstError.message,
          code: firstError.code
        }
      };
    }
    return {
      success: false,
      error: {
        message: "Erreur de validation inconnue",
        code: "UNKNOWN_ERROR"
      }
    };
  }
};

export const validateEmissionsData = (data: unknown) => {
  try {
    return EmissionsDataSchema.parse(data);
  } catch (error) {
    console.error("Données d'émissions invalides:", error);
    throw new Error("Format de données invalide");
  }
};