"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import FriseGraph from "@/components/parcours/FriseGraph";
import TreemapGraph from "@/components/parcours/TreemapGraph";
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
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span className="text-sm">
        <span className="mr-1.5">{emoji}</span>
        {label}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
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
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onValueChange(v)}
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
  const [view, setView] = useState<"frise" | "cubes">("frise");
  const postes = computePostes(state);
  const total = computeTotal(state);
  const set = (patch: Partial<SimulationState>) =>
    onChange({ ...state, ...patch });
  const diet = state.vegan
    ? "vegan"
    : state.vegetarian
      ? "vegetarian"
      : "omnivore";
  const deltaVsAverage = total - FRENCH_AVERAGE_KG;
  const showDelta = Math.abs(deltaVsAverage) >= 50;
  const scaleMax = Math.max(total, FRENCH_AVERAGE_KG);

  return (
    <div className="p-4">
      <div className="mx-auto max-w-4xl rounded-xl border border-dashed border-black bg-white p-5 md:p-6">
        <div className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <div className="shrink-0 text-center">
            <div className="text-sm text-muted-foreground">Ton empreinte</div>
            <div className="text-5xl font-semibold tracking-tight">
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
          <div className="w-full flex-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                  Toi
                </span>
                <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-4 rounded-full bg-black transition-all"
                    style={{ width: `${(total / scaleMax) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 h-4 w-0.5 bg-orange-500"
                    style={{ left: `${(PARIS_TARGET_KG / scaleMax) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-right text-xs text-muted-foreground">
                  Moyenne
                </span>
                <div className="relative h-4 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-4 rounded-full bg-neutral-400 transition-all"
                    style={{
                      width: `${(FRENCH_AVERAGE_KG / scaleMax) * 100}%`,
                    }}
                  />
                  <div
                    className="absolute top-0 h-4 w-0.5 bg-orange-500"
                    style={{ left: `${(PARIS_TARGET_KG / scaleMax) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <span className="mr-1 inline-block h-2 w-0.5 bg-orange-500 align-middle" />
                objectif 2 t (accord de Paris)
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 w-full md:px-6">
          <div className="mb-3 flex justify-center gap-1">
            <button
              type="button"
              aria-label="Vue frise"
              onClick={() => setView("frise")}
              className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                view === "frise"
                  ? "border-black bg-black text-white"
                  : "border-input text-muted-foreground hover:bg-accent"
              }`}
            >
              ▬ frise
            </button>
            <button
              type="button"
              aria-label="Vue cubes"
              onClick={() => setView("cubes")}
              className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                view === "cubes"
                  ? "border-black bg-black text-white"
                  : "border-input text-muted-foreground hover:bg-accent"
              }`}
            >
              ▦ cubes
            </button>
          </div>
          {view === "frise" ? (
            <FriseGraph
              postes={postes}
              total={total}
              referenceTotal={FRENCH_AVERAGE_KG}
            />
          ) : (
            <TreemapGraph postes={postes} />
          )}
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
            displayValue={`${state.mediumFlights} / an`}
            min={0}
            max={6}
            step={0.5}
            onValueChange={(mediumFlights) => set({ mediumFlights })}
          />
          <SliderRow
            label="Vols long-courrier"
            emoji="🌏"
            value={state.longFlights}
            displayValue={`${state.longFlights} / an`}
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
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
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

          <GroupTitle>Société</GroupTitle>
          <ToggleRow
            label="Des services publics décarbonés"
            emoji="🏛️"
            checked={state.publicDecarb}
            onCheckedChange={(publicDecarb) => set({ publicDecarb })}
          />
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(defaultSimulationState)}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Réinitialiser la simulation
        </button>
        <button
          type="button"
          onClick={onNextStep}
          className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-transform hover:-translate-y-0.5"
        >
          Étape suivante : Agir →
        </button>
      </div>
    </div>
  );
}
