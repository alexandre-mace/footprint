"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
        <span className="font-mono font-medium">{displayValue}</span>
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

function GroupCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-1 font-mono text-sm text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}

const diets = [
  { id: "omnivore", label: "Omnivore" },
  { id: "vegetarian", label: "Végétarien" },
  { id: "vegan", label: "Vegan" },
] as const;

// 0,5 vol / an ne parle à personne : on affiche des allers-retours
function formatFlights(perYear: number): string {
  if (perYear === 0) return "jamais";
  if (Number.isInteger(perYear))
    return `${perYear} A/R par an`;
  return `${perYear * 2} A/R tous les 2 ans`;
}

export default function SimulatorTab({
  state,
  onChange,
  onNextStep,
}: SimulatorTabProps) {
  const postes = computePostes(state);
  const total = computeTotal(state);
  const lastToastedTotal = useRef<number | null>(null);
  const [condensed, setCondensed] = useState(false);

  // Sur desktop, le récap (chiffre + frise) se condense et reste collé sous
  // la barre d'onglets pendant qu'on manipule les contrôles.
  // Hystérésis obligatoire : la condensation raccourcit la page (~180px),
  // un seuil unique ferait osciller l'état en boucle au point de bascule.
  useEffect(() => {
    const onScroll = () => {
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setCondensed(false);
        return;
      }
      setCondensed((prev) =>
        prev ? window.scrollY > 60 : window.scrollY > 300,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
  const deltaText = showDelta
    ? `${deltaVsAverage <= 0 ? "−" : "+"}${formatTonnes(Math.abs(deltaVsAverage))} t vs moyenne française`
    : "dans la moyenne française";
  const deltaColor = showDelta
    ? deltaVsAverage <= 0
      ? "text-green-700"
      : "text-destructive"
    : "text-muted-foreground";

  return (
    <div className="p-4">
      <div className="bg-background md:sticky md:top-[54px] md:z-10">
        {condensed ? (
          <div className="hidden items-baseline justify-center gap-3 pt-1 md:flex">
            <span className="text-2xl font-semibold tracking-tight">
              {formatTonnes(total)} t
            </span>
            <span className={`text-xs font-medium ${deltaColor}`}>
              {deltaText}
            </span>
          </div>
        ) : null}
        <div className={condensed ? "md:hidden" : ""}>
          <div className="flex flex-col items-center">
            <div className="shrink-0 text-center">
              <div className="text-sm text-muted-foreground">Ton empreinte</div>
              <div className="text-5xl font-semibold tracking-tight">
                {formatTonnes(total)} t
              </div>
              <div className="text-sm text-muted-foreground">CO₂e par an</div>
              <div className={`mt-1 text-sm font-medium ${deltaColor}`}>
                {deltaText}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full pb-2 md:px-6">
          <FriseGraph
            postes={postes}
            total={total}
            referenceTotal={FRENCH_AVERAGE_KG}
            parisTargetKg={PARIS_TARGET_KG}
            compact={condensed}
            footerExtra={<MethodologyDialog />}
          />
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        <GroupCard title="Déplacements">
          <SliderRow
            label="Voiture"
            emoji="🚗"
            value={state.carKm}
            displayValue={`${state.carKm.toLocaleString("fr-FR")} km/an`}
            min={0}
            max={50000}
            step={1000}
            onValueChange={(carKm) => set({ carKm })}
          />
          <ToggleRow
            label="Ma voiture est électrique"
            emoji="⚡"
            checked={state.electricCar}
            onCheckedChange={(electricCar) => set({ electricCar })}
          />
          <SliderRow
            label="Vols moyen-courrier"
            emoji="✈️"
            value={state.mediumFlights}
            displayValue={formatFlights(state.mediumFlights)}
            min={0}
            max={6}
            step={0.5}
            onValueChange={(mediumFlights) => set({ mediumFlights })}
          />
          <SliderRow
            label="Vols long-courrier"
            emoji="🌏"
            value={state.longFlights}
            displayValue={formatFlights(state.longFlights)}
            min={0}
            max={4}
            step={0.5}
            onValueChange={(longFlights) => set({ longFlights })}
          />
        </GroupCard>

        <GroupCard title="Nourriture">
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
                    ? "border-primary bg-primary text-primary-foreground"
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
        </GroupCard>

        <GroupCard title="Logement">
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
        </GroupCard>

        <GroupCard title="Consommation">
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
        </GroupCard>
      </div>

      <div className="mx-auto mt-4 flex max-w-4xl flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm">
            <span className="mr-1.5">🏛️</span>
            Des services publics décarbonés
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Une partie de ton empreinte (écoles, hôpitaux, routes...) dépend
            des choix collectifs, pas de toi seul.
          </div>
        </div>
        <Switch
          aria-label="Des services publics décarbonés"
          isSelected={state.publicDecarb}
          onChange={(publicDecarb) => set({ publicDecarb })}
        />
      </div>

      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          size="lg"
          onPress={() => {
            lastToastedTotal.current = computeTotal(defaultSimulationState);
            onChange(defaultSimulationState);
          }}
        >
          ↺ Revenir au profil de départ
        </Button>
        <Button size="lg" onPress={onNextStep}>
          Étape suivante : Agir →
        </Button>
      </div>
    </div>
  );
}
