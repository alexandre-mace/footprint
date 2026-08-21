"use client";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  SimulationState,
  computeByCategory,
  computeTotal,
  formatTonnes,
  FRENCH_AVERAGE_KG,
  PARIS_TARGET_KG,
} from "@/lib/simulation";

interface SimulatorTabProps {
  state: SimulationState;
  onChange: (state: SimulationState) => void;
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleRow({ label, checked, onCheckedChange }: ToggleRowProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-1.5">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground first:mt-0">
      {children}
    </div>
  );
}

const diets = [
  { id: "omnivore", label: "Omnivore" },
  { id: "vegetarian", label: "Végétarien" },
  { id: "vegan", label: "Vegan" },
] as const;

export default function SimulatorTab({ state, onChange }: SimulatorTabProps) {
  const total = computeTotal(state);
  const byCategory = computeByCategory(state);
  const maxCategory = Math.max(...byCategory.map((c) => c.size));
  const set = (patch: Partial<SimulationState>) =>
    onChange({ ...state, ...patch });
  const diet = state.vegan ? "vegan" : state.vegetarian ? "vegetarian" : "omnivore";
  const targetRatio = Math.min(1, PARIS_TARGET_KG / total);

  return (
    <div className="mx-auto flex max-w-4xl flex-col-reverse gap-8 p-4 md:flex-row">
      <div className="md:w-1/2">
        <GroupTitle>Déplacements</GroupTitle>
        <ToggleRow
          label="Je n'ai pas de voiture"
          checked={state.noCar}
          onCheckedChange={(noCar) => set({ noCar })}
        />
        <div className="py-1.5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Vols moyen-courrier par an</span>
            <span className="text-muted-foreground">{state.mediumFlights}</span>
          </div>
          <Slider
            value={[state.mediumFlights]}
            min={0}
            max={6}
            step={0.5}
            onValueChange={([mediumFlights]) => set({ mediumFlights })}
          />
        </div>
        <div className="py-1.5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Vols long-courrier par an</span>
            <span className="text-muted-foreground">{state.longFlights}</span>
          </div>
          <Slider
            value={[state.longFlights]}
            min={0}
            max={4}
            step={0.5}
            onValueChange={([longFlights]) => set({ longFlights })}
          />
        </div>

        <GroupTitle>Nourriture</GroupTitle>
        <div className="flex gap-2 py-1.5">
          {diets.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() =>
                set({
                  vegan: d.id === "vegan",
                  vegetarian: d.id === "vegetarian",
                  meatReduction: d.id === "omnivore" ? state.meatReduction : 0,
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
        {diet === "omnivore" && (
          <div className="py-1.5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Je divise ma consommation de viande par</span>
              <span className="text-muted-foreground">
                {state.meatReduction === 0 ? "—" : state.meatReduction}
              </span>
            </div>
            <Slider
              value={[state.meatReduction]}
              min={0}
              max={4}
              step={1}
              onValueChange={([meatReduction]) => set({ meatReduction })}
            />
          </div>
        )}
        <ToggleRow
          label="Je mange local"
          checked={state.localFood}
          onCheckedChange={(localFood) => set({ localFood })}
        />

        <GroupTitle>Logement</GroupTitle>
        <ToggleRow
          label="J'habite en appartement"
          checked={state.flat}
          onCheckedChange={(flat) => set({ flat })}
        />
        <ToggleRow
          label="Je me chauffe sans énergie fossile (PAC, électrique...)"
          checked={state.noHousingFossile}
          onCheckedChange={(noHousingFossile) => set({ noHousingFossile })}
        />
        <ToggleRow
          label="Je prends des douches courtes"
          checked={state.shortShowers}
          onCheckedChange={(shortShowers) => set({ shortShowers })}
        />

        <GroupTitle>Consommation</GroupTitle>
        <ToggleRow
          label="Je garde mes objets longtemps"
          checked={state.keeper}
          onCheckedChange={(keeper) => set({ keeper })}
        />
        <ToggleRow
          label="Mes vêtements sont de seconde main"
          checked={state.secondHandClothes}
          onCheckedChange={(secondHandClothes) => set({ secondHandClothes })}
        />
        <ToggleRow
          label="Mode de vie zéro déchet"
          checked={state.noThrash}
          onCheckedChange={(noThrash) => set({ noThrash })}
        />
        <ToggleRow
          label="Une heure de streaming en moins par jour"
          checked={state.stopYoutubeStreaming}
          onCheckedChange={(stopYoutubeStreaming) =>
            set({ stopYoutubeStreaming })
          }
        />

        <GroupTitle>Société</GroupTitle>
        <ToggleRow
          label="Des services publics décarbonés"
          checked={state.publicDecarb}
          onCheckedChange={(publicDecarb) => set({ publicDecarb })}
        />
      </div>

      <div className="md:w-1/2">
        <div className="sticky top-4 rounded-xl border border-dashed border-black p-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Ton empreinte</div>
            <div className="text-5xl font-semibold tracking-tight">
              {formatTonnes(total)} t
            </div>
            <div className="mb-4 text-sm text-muted-foreground">
              CO₂e par an
            </div>
            <div className="relative mx-auto h-3 max-w-sm overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-3 rounded-full bg-black transition-all"
                style={{
                  width: `${Math.min(100, (total / FRENCH_AVERAGE_KG) * 100)}%`,
                }}
              />
              <div
                className="absolute top-0 h-3 w-0.5 bg-orange-500"
                style={{ left: `${targetRatio * 100}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Objectif 2 t (accord de Paris) · moyenne française{" "}
              {formatTonnes(FRENCH_AVERAGE_KG)} t
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {byCategory.map((c) => (
              <div key={c.category} className="flex items-center gap-2">
                <span className="w-36 shrink-0 text-xs text-muted-foreground">
                  {c.category}
                </span>
                <div
                  className="h-3 rounded-sm bg-black/80 transition-all"
                  style={{ width: `${(c.size / maxCategory) * 100 * 0.6}%` }}
                />
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatTonnes(c.size)} t
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
