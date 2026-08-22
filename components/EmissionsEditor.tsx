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
      className={"flex items-center justify-between gap-2 py-2"}
    >
      <div className={"min-w-0"} title={emission.label}>
        <div className={"truncate text-xs font-medium md:text-sm"}>
          {emission.label}
        </div>
        <div className={"font-mono text-[11px] text-muted-foreground"}>
          {emission.value} <span className={"text-[10px]"}>kg CO2eq</span>
        </div>
      </div>
      <div className={"flex shrink-0 items-center gap-1"}>
        <AnimatedButton
          variant="outline"
          size="icon"
          onPress={handleDecrement}
          animationType="ripple"
          className={"h-7 w-7 shrink-0"}
          isDisabled={emission.quantity <= emission.min}
        >
          <Minus className={"h-3 w-3"} />
        </AnimatedButton>
        <AnimatedInput
          value={emission.quantity}
          className={
            "h-7 w-20 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          }
          onChange={handleInputChange}
          validator={validator}
          type="number"
          min={emission.min}
          max={emission.max}
        />
        <AnimatedButton
          variant="outline"
          size="icon"
          onPress={handleIncrement}
          animationType="ripple"
          className={"h-7 w-7 shrink-0"}
          isDisabled={emission.quantity >= emission.max}
        >
          <Plus className={"h-3 w-3"} />
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
    // Resynchronise le miroir local quand les émissions changent en dehors
    // de SearchAndFilters (versus appliqué, reset, etc.)
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      {/* Recherche et outils sur une seule rangée */}
      <div className={"flex flex-wrap items-center gap-2"}>
        <SearchAndFilters
          className={"min-w-40 grow"}
          categories={emissions}
          onFilteredChange={handleFilteredChange}
          onToggleVisibility={toggleEmissionVisibility}
        />
        <div className={"flex items-center gap-2"}>
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
      </div>

      {/* Liste des émissions */}
      <div className={"flex flex-col gap-4"}>
        {filteredEmissions.map((category) => (
        <div
          className={
            "rounded-xl border bg-card p-4"
          }
          key={category.label}
        >
          <div className={"mb-1 flex items-center gap-2"}>
            <Image
              className={"h-4 w-4 md:h-5 md:w-5"}
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
          <div className={"divide-y divide-neutral-100"}>
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
          <p className="text-sm">Essaie de modifier ta recherche.</p>
        </div>
      )}
    </div>
  );
};

export default EmissionsEditor;
