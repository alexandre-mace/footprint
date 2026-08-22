"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import FriseGraph from "@/components/parcours/FriseGraph";
import MethodologyDialog from "@/components/parcours/MethodologyDialog";
import {
  SimulationState,
  computePostes,
  computeTotal,
  defaultSimulationState,
  formatTonnes,
  FRENCH_AVERAGE_KG,
  PARIS_TARGET_KG,
} from "@/lib/simulation";

interface SimulatorTabProps {
  state: SimulationState;
  onChange: (state: SimulationState) => void;
  onNextStep: () => void;
}

interface ToggleRowProps {
  label: string;
  emoji: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleRow({ label, emoji, checked, onCheckedChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span
        className="cursor-pointer text-sm select-none"
        onClick={() => onCheckedChange(!checked)}
      >
        <span className="mr-1.5">{emoji}</span>
        {label}
      </span>
      <Switch
        aria-label={label}
        isSelected={checked}
        onChange={onCheckedChange}
      />
    </div>
  );
}

interface SliderRowProps {
  label: string;
  emoji: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
}

function SliderRow({
  label,
  emoji,
  value,
  displayValue,
  min,
  max,
  step,
  onValueChange,
}: SliderRowProps) {
  return (
    <div className="py-2">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>
          <span className="mr-1.5">{emoji}</span>
          {label}
        </span>
        <span className="font-semibold tabular-nums">{displayValue}</span>
      </div>
      <Slider
        aria-label={label}
        value={value}
        minValue={min}
        maxValue={max}
        step={step}
        onChange={(v) => onValueChange(Array.isArray(v) ? v[0] : v)}
      />
    </div>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 mt-6 text-sm font-semibold text-muted-foreground first:mt-0 md:first:mt-0">
      {children}
    </div>
  );
}

const diets = [
  { id: "omnivore", label: "Omnivore" },
  { id: "vegetarian", label: "Végétarien" },
  { id: "vegan", label: "Vegan" },
] as const;

export default function SimulatorTab({
  state,
  onChange,
  onNextStep,
}: SimulatorTabProps) {
  const postes = computePostes(state);
  const total = computeTotal(state);
  const lastToastedTotal = useRef<number | null>(null);

  useEffect(() => {
    if (lastToastedTotal.current === null) {
      lastToastedTotal.current = total;
      return;
    }
    const timer = setTimeout(() => {
      const previous = lastToastedTotal.current;
      if (previous === null || Math.abs(total - previous) < 100) return;
      const delta = total - previous;
      lastToastedTotal.current = total;
      if (delta < 0) {
        toast.success(`${formatTonnes(delta)} t sur ton empreinte, bien joué`);
      } else {
        toast(`+${formatTonnes(delta)} t sur ton empreinte`);
      }
    }, 900);
    return () => clearTimeout(timer);
  }, [total]);
  const set = (patch: Partial<SimulationState>) =>
    onChange({ ...state, ...patch });
  const diet = state.vegan
    ? "vegan"
    : state.vegetarian
      ? "vegetarian"
      : "omnivore";
  const deltaVsAverage = total - FRENCH_AVERAGE_KG;
  const showDelta = Math.abs(deltaVsAverage) >= 50;
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
          <div className="shrink-0 text-center">
            <div className="text-sm text-muted-foreground">Ton empreinte</div>
            <div className="font-display text-5xl font-semibold tracking-tight">
              {formatTonnes(total)} t
            </div>
            <div className="text-sm text-muted-foreground">CO₂e par an</div>
            <div
              className={`mt-1 text-sm font-medium ${
                showDelta
                  ? deltaVsAverage <= 0
                    ? "text-green-700"
                    : "text-orange-600"
                  : "text-muted-foreground"
              }`}
            >
              {showDelta
                ? `${deltaVsAverage <= 0 ? "−" : "+"}${formatTonnes(Math.abs(deltaVsAverage))} t vs moyenne française`
                : "dans la moyenne française"}
            </div>
          </div>
      </div>

      <div className="mt-2 w-full md:px-6">
          <FriseGraph
            postes={postes}
            total={total}
            referenceTotal={FRENCH_AVERAGE_KG}
            parisTargetKg={PARIS_TARGET_KG}
          />
          <div className="mt-1">
            <MethodologyDialog />
          </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-x-12 md:grid-cols-2">
        <div>
          <GroupTitle>Déplacements</GroupTitle>
          <SliderRow
            label="Voiture"
            emoji="🚗"
            value={state.carKm}
            displayValue={`${state.carKm.toLocaleString("fr-FR")} km/an`}
            min={0}
            max={30000}
            step={1000}
            onValueChange={(carKm) => set({ carKm })}
          />
          <SliderRow
            label="Vols moyen-courrier"
            emoji="✈️"
            value={state.mediumFlights}
            displayValue={`${state.mediumFlights.toLocaleString("fr-FR")} / an`}
            min={0}
            max={6}
            step={0.5}
            onValueChange={(mediumFlights) => set({ mediumFlights })}
          />
          <SliderRow
            label="Vols long-courrier"
            emoji="🌏"
            value={state.longFlights}
            displayValue={`${state.longFlights.toLocaleString("fr-FR")} / an`}
            min={0}
            max={4}
            step={0.5}
            onValueChange={(longFlights) => set({ longFlights })}
          />

          <GroupTitle>Nourriture</GroupTitle>
          <div className="flex gap-2 py-2">
            {diets.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() =>
                  set({
                    vegan: d.id === "vegan",
                    vegetarian: d.id === "vegetarian",
                  })
                }
                className={`rounded-lg border px-3 py-1 text-sm font-medium transition-colors ${
                  diet === d.id
                    ? "border-black bg-black text-white"
                    : "border-input text-muted-foreground hover:bg-accent"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="min-h-[62px]">
            {diet === "omnivore" && (
              <SliderRow
                label="Repas avec de la viande"
                emoji="🥩"
                value={state.meatMealsPerWeek}
                displayValue={`${state.meatMealsPerWeek} / semaine`}
                min={0}
                max={14}
                step={1}
                onValueChange={(meatMealsPerWeek) => set({ meatMealsPerWeek })}
              />
            )}
          </div>
          <ToggleRow
            label="Je mange local"
            emoji="🧑‍🌾"
            checked={state.localFood}
            onCheckedChange={(localFood) => set({ localFood })}
          />

          <GroupTitle>Société</GroupTitle>
          <ToggleRow
            label="Des services publics décarbonés"
            emoji="🏛️"
            checked={state.publicDecarb}
            onCheckedChange={(publicDecarb) => set({ publicDecarb })}
          />
        </div>

        <div>
          <GroupTitle>Logement</GroupTitle>
          <ToggleRow
            label="J'habite en appartement"
            emoji="🏢"
            checked={state.flat}
            onCheckedChange={(flat) => set({ flat })}
          />
          <ToggleRow
            label="Je me chauffe sans énergie fossile (PAC, électrique...)"
            emoji="🔥"
            checked={state.noHousingFossile}
            onCheckedChange={(noHousingFossile) => set({ noHousingFossile })}
          />
          <ToggleRow
            label="Je prends des douches courtes"
            emoji="🚿"
            checked={state.shortShowers}
            onCheckedChange={(shortShowers) => set({ shortShowers })}
          />

          <GroupTitle>Consommation</GroupTitle>
          <ToggleRow
            label="Je garde mes objets longtemps"
            emoji="🛋️"
            checked={state.keeper}
            onCheckedChange={(keeper) => set({ keeper })}
          />
          <ToggleRow
            label="Mes vêtements sont de seconde main"
            emoji="🧢"
            checked={state.secondHandClothes}
            onCheckedChange={(secondHandClothes) =>
              set({ secondHandClothes })
            }
          />
          <ToggleRow
            label="Mode de vie zéro déchet"
            emoji="🗑️"
            checked={state.noThrash}
            onCheckedChange={(noThrash) => set({ noThrash })}
          />
          <ToggleRow
            label="Une heure de streaming en moins par jour"
            emoji="📺"
            checked={state.stopYoutubeStreaming}
            onCheckedChange={(stopYoutubeStreaming) =>
              set({ stopYoutubeStreaming })
            }
          />

        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
        <button
          type="button"
          onClick={() => {
            lastToastedTotal.current = computeTotal(defaultSimulationState);
            onChange(defaultSimulationState);
          }}
          className="rounded-lg border border-input bg-white px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          ↺ Revenir au Français moyen
        </button>
        <button
          type="button"
          onClick={onNextStep}
          className="rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Étape suivante : Agir →
        </button>
      </div>
    </div>
  );
}
