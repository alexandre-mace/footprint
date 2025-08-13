import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedInput } from "@/components/ui/animated-input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useCallback, useMemo, useRef } from "react";
import Emission from "@/types/emission";
import Category from "@/types/category";
import { useEmissions } from "@/hooks/useEmissions";
import { EmissionsEditorConfig } from "@/components/EmissionsEditorConfig";
import { PresetSelector } from "@/components/PresetSelector";
import { ShareButton } from "@/components/ShareButton";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { ResetPopover } from "@/components/ResetPopover";
import { ChartData } from "@/types/chart";
import { Versus } from "@/types/versus";

interface EmissionsEditorProps {
  onChartDataChange: (data: ChartData) => void;
  setApplyVersusRef?: (applyVersus: (versus: Versus) => void) => void;
  setOpenVersusDialogRef?: (openDialog: () => void) => void;
}

const EmissionItem = React.memo<{
  emission: Emission;
  onUpdateQuantity: (id: string, quantity: number) => void;
}>(({ emission, onUpdateQuantity }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const validator = useCallback((value: string) => {
    const num = parseInt(value || "0");
    if (isNaN(num)) {
      return { isValid: false, error: "Nombre invalide" };
    }
    if (num < emission.min) {
      return { isValid: false, error: `Minimum: ${emission.min}` };
    }
    if (num > emission.max) {
      return { isValid: false, error: `Maximum: ${emission.max}` };
    }
    return { isValid: true };
  }, [emission.min, emission.max]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuantity(emission.id, parseInt(e.target.value === "" ? "0" : e.target.value));
  }, [emission.id, onUpdateQuantity]);

  const handleDecrement = useCallback(() => {
    onUpdateQuantity(emission.id, emission.quantity - 1);
  }, [emission.id, emission.quantity, onUpdateQuantity]);

  const handleIncrement = useCallback(() => {
    onUpdateQuantity(emission.id, emission.quantity + 1);
  }, [emission.id, emission.quantity, onUpdateQuantity]);

  return (
    <div
      ref={itemRef}
      className={
        "flex flex-col sm:flex-row lg:flex-col 2xl:flex-row justify-between gap-4 rounded-lg border border-dashed border-black p-2 md:p-4 slide-in"
      }
    >
      <div className={"space-y-1"}>
        <div className={"text-xs font-medium md:text-sm"}>
          {emission.label}
        </div>
        <div className={"text-xs text-muted-foreground"}>
          {emission.value} <span className={"text-[10px]"}>kg CO2eq</span>
        </div>
      </div>
      <div className={"flex shrink-0 items-center gap-2"}>
        <AnimatedButton
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          animationType="ripple"
          className={"shrink-0"}
          disabled={emission.quantity <= emission.min}
        >
          <Minus />
        </AnimatedButton>
        <AnimatedInput
          value={emission.quantity}
          className={"md:max-w-24 text-center grow md:w-24"}
          onChange={handleInputChange}
          validator={validator}
          type="number"
          min={emission.min}
          max={emission.max}
        />
        <AnimatedButton
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          animationType="ripple"
          className={"shrink-0"}
          disabled={emission.quantity >= emission.max}
        >
          <Plus />
        </AnimatedButton>
      </div>
    </div>
  );
});

EmissionItem.displayName = 'EmissionItem';

const EmissionsEditor: React.FC<EmissionsEditorProps> = ({ onChartDataChange, setApplyVersusRef, setOpenVersusDialogRef }) => {
  const { 
    emissions, 
    resetValues,
    resetAll,
    updateEmissionQuantity, 
    toggleEmissionVisibility,
    applyVersus,
    getShareableEmissions,
    chartData 
  } = useEmissions();

  const [filteredEmissions, setFilteredEmissions] = React.useState(emissions);

  React.useEffect(() => {
    onChartDataChange(chartData);
  }, [chartData, onChartDataChange]);

  React.useEffect(() => {
    setFilteredEmissions(emissions);
  }, [emissions]);

  React.useEffect(() => {
    if (setApplyVersusRef) {
      setApplyVersusRef(applyVersus);
    }
  }, [setApplyVersusRef, applyVersus]);

  const handleFilteredChange = React.useCallback((filtered: Category[]) => {
    setFilteredEmissions(filtered);
  }, []);

  return (
    <div className={"space-y-4"}>
      {/* Barre d'outils en haut */}
      <div className={"flex items-center justify-end gap-2 flex-wrap"}>
        <ShareButton emissions={getShareableEmissions()} />
        <PresetSelector 
          onApplyVersus={applyVersus} 
          setOpenDialogRef={setOpenVersusDialogRef}
        />
        <EmissionsEditorConfig
          emissions={emissions}
          onToggleVisibility={toggleEmissionVisibility}
        />
        <ResetPopover
          onResetValues={resetValues}
          onResetAll={resetAll}
        />
      </div>

      {/* Filtres de recherche */}
      <SearchAndFilters 
        categories={emissions}
        onFilteredChange={handleFilteredChange}
        onToggleVisibility={toggleEmissionVisibility}
      />

      {/* Grille des émissions */}
      <div className={"grid gap-4 md:grid-cols-1 lg:grid-cols-2"}>
        {filteredEmissions.map((category, index) => (
        <div
          className={
            "space-y-2 rounded-xl border bg-white p-4 hover:shadow-orange-light"
          }
          key={category.label}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={"flex items-center gap-2"}>
            <Image
              className={"h-4 w-4 md:h-6 md:w-6"}
              src={category.img}
              alt={category.label}
              height={32}
              width={32}
            />
            <div
              className={"text-xs font-medium text-muted-foreground md:text-sm"}
            >
              {category.label}
            </div>
          </div>
          <div className={"space-y-4"}>
            {category.emissions
              .filter((emission: Emission) => emission.isVisible)
              .map((emission) => (
                <EmissionItem
                  key={emission.id}
                  emission={emission}
                  onUpdateQuantity={updateEmissionQuantity}
                />
              ))}
          </div>
        </div>
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredEmissions.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-lg font-medium mb-2">Aucune émission trouvée</p>
          <p className="text-sm">Essayez de modifier vos critères de recherche ou filtres.</p>
        </div>
      )}
    </div>
  );
};

export default EmissionsEditor;
