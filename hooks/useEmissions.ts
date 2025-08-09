import { useState, useCallback, useMemo } from "react";
import emissionsData from "@/data/emissions.json";
import Category from "@/types/category";
import Emission from "@/types/emission";
import { ChartData } from "@/types/chart";
import { addEmissionIds } from "@/lib/addEmissionIds";
import { validateQuantityUpdate, validateEmissionsData } from "@/lib/validation";
import { toast } from "sonner";
import { Preset } from "@/types/preset";
import { Versus } from "@/types/versus";
import { parseShareUrl, ShareData } from "@/lib/urlSharing";

export const useEmissions = () => {
  
  const initializeEmissions = useCallback((): Category[] => {
    try {
      // D'abord ajouter les IDs, puis valider
      const initialEmissions = addEmissionIds(emissionsData);
      
      // Maintenant valider les données avec IDs
      const validatedData = validateEmissionsData(initialEmissions);
      
      // Vérifier s'il y a des données partagées dans l'URL
      const shareData = parseShareUrl();
      if (shareData) {
        // Appliquer les données partagées
        const updatedEmissions = validatedData.map(category => ({
          ...category,
          emissions: category.emissions.map(emission => {
            const sharedQuantity = shareData.emissions[emission.id];
            return {
              ...emission,
              quantity: sharedQuantity || 0,
            };
          })
        }));
        
        toast.success("Configuration importée depuis le lien partagé");
        return updatedEmissions;
      }
      
      return validatedData;
    } catch (error) {
      console.error("Erreur d'initialisation:", error);
      toast.error("Erreur lors du chargement des données");
      // En cas d'erreur, retourner les données de base sans validation
      return addEmissionIds(emissionsData);
    }
  }, []);

  const [emissions, setEmissions] = useState<Category[]>(initializeEmissions);

  const reset = useCallback(() => {
    try {
      setEmissions(initializeEmissions());
      toast.success( "Données réinitialisées");
    } catch (error) {
      toast.error( "Erreur lors de la réinitialisation");
    }
  }, [initializeEmissions]);

  const resetValues = useCallback(() => {
    try {
      setEmissions(prevEmissions => 
        prevEmissions.map(category => ({
          ...category,
          emissions: category.emissions.map(emission => ({
            ...emission,
            quantity: 0
          }))
        }))
      );
      toast.success( "Valeurs réinitialisées");
    } catch (error) {
      toast.error( "Erreur lors de la réinitialisation des valeurs");
    }
  }, []);

  const resetAll = useCallback(() => {
    try {
      setEmissions(initializeEmissions());
      toast.success( "Tout réinitialisé");
    } catch (error) {
      toast.error( "Erreur lors de la réinitialisation complète");
    }
  }, [initializeEmissions]);

  const updateEmissionQuantity = useCallback((
    emissionId: string,
    newQuantity: number
  ) => {
    const validation = validateQuantityUpdate({ emissionId, quantity: newQuantity });
    
    if (!validation.success) {
      toast.error( validation.error.message);
      return;
    }

    setEmissions(prevEmissions => {
      const updated = prevEmissions.map(category => ({
        ...category,
        emissions: category.emissions.map(emission => {
          if (emission.id === emissionId) {
            const clampedQuantity = Math.min(
              emission.max,
              Math.max(emission.min, newQuantity)
            );
            
            // Si on ajoute une quantité > 0 et que l'activité n'est pas visible, l'activer
            const shouldBeVisible = clampedQuantity > 0 || emission.isVisible;
            
            // Notification si la valeur a été clampée
            if (clampedQuantity !== newQuantity) {
              if (newQuantity > emission.max) {
                toast.warning( `Valeur limitée au maximum: ${emission.max}`);
              } else if (newQuantity < emission.min) {
                toast.warning( `Valeur limitée au minimum: ${emission.min}`);
              }
            }
            
            return { 
              ...emission, 
              quantity: clampedQuantity,
              isVisible: shouldBeVisible
            };
          }
          return emission;
        })
      }));
      
      return updated;
    });
  }, []);

  const toggleEmissionVisibility = useCallback((emissionId: string) => {
    setEmissions(prevEmissions =>
      prevEmissions.map(category => ({
        ...category,
        emissions: category.emissions.map(emission =>
          emission.id === emissionId
            ? { ...emission, isVisible: !emission.isVisible }
            : emission
        ),
      }))
    );
  }, []);

  const applyPreset = useCallback((preset: Preset) => {
    try {
      setEmissions(prevEmissions => {
        // D'abord, remettre toutes les quantités à 0
        let resetEmissions = prevEmissions.map(category => ({
          ...category,
          emissions: category.emissions.map(emission => ({
            ...emission,
            quantity: 0
          }))
        }));

        // Ensuite, appliquer les valeurs du preset
        resetEmissions = resetEmissions.map(category => ({
          ...category,
          emissions: category.emissions.map(emission => {
            const presetQuantity = preset.emissions[emission.id];
            if (presetQuantity !== undefined) {
              const clampedQuantity = Math.min(
                emission.max,
                Math.max(emission.min, presetQuantity)
              );
              return { ...emission, quantity: clampedQuantity };
            }
            return emission;
          })
        }));

        return resetEmissions;
      });

      toast.success( `Preset "${preset.name}" appliqué avec succès`);
    } catch (error) {
      toast.error( "Erreur lors de l'application du preset");
    }
  }, []);

  const applyVersus = useCallback((versus: Versus) => {
    try {
      setEmissions(prevEmissions => {
        // D'abord, remettre toutes les quantités à 0
        let resetEmissions = prevEmissions.map(category => ({
          ...category,
          emissions: category.emissions.map(emission => ({
            ...emission,
            quantity: 0,
            isVisible: emission.isVisible || false
          }))
        }));

        // Fonction helper pour appliquer les émissions d'un côté du versus
        const applyEmissions = (emissions: Record<string, number>) => {
          resetEmissions = resetEmissions.map(category => ({
            ...category,
            emissions: category.emissions.map(emission => {
              const quantity = emissions[emission.id];
              if (quantity !== undefined) {
                const clampedQuantity = Math.min(
                  emission.max,
                  Math.max(emission.min, quantity)
                );
                return { 
                  ...emission, 
                  quantity: clampedQuantity,
                  isVisible: true // Activer l'émission quand on l'utilise
                };
              }
              return emission;
            })
          }));
        };

        // Appliquer les émissions de tous les côtés du versus
        applyEmissions(versus.sideA.emissions);
        applyEmissions(versus.sideB.emissions);
        if (versus.sideC) {
          applyEmissions(versus.sideC.emissions);
        }

        return resetEmissions;
      });

      toast.success( `Versus "${versus.name}" appliqué avec succès`);
    } catch (error) {
      toast.error( "Erreur lors de l'application du versus");
    }
  }, []);

  const getShareableEmissions = useCallback((): Record<string, number> => {
    const shareableData: Record<string, number> = {};
    emissions.forEach(category => {
      category.emissions.forEach(emission => {
        if (emission.quantity > 0) {
          shareableData[emission.id] = emission.quantity;
        }
      });
    });
    return shareableData;
  }, [emissions]);

  const visibleEmissions = useMemo(() => 
    emissions.flatMap(category => 
      category.emissions.filter(emission => emission.isVisible && emission.quantity > 0)
    ), [emissions]
  );

  const chartData: ChartData = useMemo(() => 
    visibleEmissions.map(emission => ({
      label: `${emission.quantity} × ${emission.label}`,
      value: parseFloat((emission.value * emission.quantity).toFixed(2)),
      fill: emission.color,
    })).sort((a, b) => b.value - a.value),
    [visibleEmissions]
  );

  return {
    emissions,
    setEmissions,
    reset,
    resetValues,
    resetAll,
    updateEmissionQuantity,
    toggleEmissionVisibility,
    applyPreset,
    applyVersus,
    getShareableEmissions,
    visibleEmissions,
    chartData,
  };
};