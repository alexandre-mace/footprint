"use client";

import { toast } from "sonner";
import { Button, LinkButton } from "@/components/ui/button";
import {
  SimulationState,
  climateActions,
  computeTotal,
  averageSimulationState,
  defaultSimulationState,
  formatTonnes,
  PARIS_TARGET_KG,
} from "@/lib/simulation";

interface ActionsTabProps {
  state: SimulationState;
  onGoToSimulator: () => void;
}

export default function ActionsTab({ state, onGoToSimulator }: ActionsTabProps) {
  const isPersonalized =
    JSON.stringify(state) !== JSON.stringify(defaultSimulationState);
  const total = computeTotal(state);
  const averageTotal = computeTotal(averageSimulationState);

  const rows = climateActions
    .map((action) => ({
      ...action,
      deltaAverage: Math.max(
        0,
        Math.round(
          averageTotal - computeTotal(action.apply(averageSimulationState)),
        ),
      ),
      deltaMe: Math.max(
        0,
        Math.round(total - computeTotal(action.apply(state))),
      ),
    }))
    .sort((a, b) => b.deltaMe - a.deltaMe);

  const maxDelta = Math.max(
    ...rows.map((r) => Math.max(r.deltaAverage, r.deltaMe)),
    1,
  );

  const allApplied = climateActions.reduce(
    (s, action) => action.apply(s),
    state,
  );
  const totalIfAll = computeTotal(allApplied);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <p className="text-lg font-medium">Le top des actions</p>
      <p className="mb-4 text-sm text-muted-foreground">
        {isPersonalized ? (
          <>
            Classées par économie <em>pour toi</em> (empreinte actuelle :{" "}
            {formatTonnes(total)} t), comparées à un Français moyen.
          </>
        ) : (
          <>
            Classées pour le profil de départ ({formatTonnes(total)} t/an :
            voiture, avion, viande, chauffage au gaz). En gris, ce que ça
            donnerait pour un Français moyen ({formatTonnes(averageTotal)}{" "}
            t/an).
          </>
        )}
      </p>

      {!isPersonalized && (
        <button
          type="button"
          onClick={onGoToSimulator}
          className="mb-4 w-full rounded-xl border border-dashed border-black bg-card p-3 text-left text-sm transition-colors hover:bg-muted"
        >
          👉 Passe par l&apos;étape 2 pour voir ce que chaque action changerait{" "}
          <em>pour toi</em>.
        </button>
      )}

      <div className="mb-4 flex justify-end gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-neutral-300" />
          Français moyen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-600" />
          {isPersonalized ? "Toi" : "Profil de départ"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((action, index) => (
          <div
            key={action.id}
            className="flex items-center gap-3 rounded-xl border bg-card p-3"
          >
            <span className="text-xl">{action.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">
                {action.label}
                {isPersonalized && index === 0 && action.deltaMe > 0 && (
                  <span className="ml-2 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    ton levier n°1
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 rounded-sm bg-neutral-300 transition-all"
                    style={{
                      width: `${(action.deltaAverage / maxDelta) * 160}px`,
                    }}
                  />
                  <span className="font-mono text-[11px] text-muted-foreground">
                    −{formatTonnes(action.deltaAverage)} t
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {action.deltaMe > 0 ? (
                    <>
                      <div
                        className="h-2.5 rounded-sm bg-green-600 transition-all"
                        style={{
                          width: `${(action.deltaMe / maxDelta) * 160}px`,
                        }}
                      />
                      <span className="font-mono text-[11px] font-semibold">
                        −{formatTonnes(action.deltaMe)} t
                        <span className="hidden sm:inline">
                          {" "}
                          · {Math.round((action.deltaMe / total) * 100)} % de{" "}
                          {isPersonalized ? "ton empreinte" : "l'empreinte"}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">
                      {isPersonalized
                        ? "✓ déjà le cas pour toi"
                        : "✓ déjà dans le profil"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border bg-card p-4 text-sm">
        {isPersonalized ? (
          <>
            En cumulant tout ce qui dépend de toi :{" "}
            <span className="font-semibold">{formatTonnes(totalIfAll)} t</span>{" "}
            au lieu de <span className="font-semibold">{formatTonnes(total)} t</span>.
          </>
        ) : (
          <>
            En cumulant toutes ces actions, le profil de départ passerait de{" "}
            <span className="font-semibold">{formatTonnes(total)} t</span> à{" "}
            <span className="font-semibold">
              {formatTonnes(totalIfAll)} t
            </span>
            .
          </>
        )}
        {totalIfAll > PARIS_TARGET_KG && (
          <span className="text-muted-foreground">
            {" "}
            Le reste (services publics, infrastructures...) dépend des choix
            collectifs : c&apos;est aussi pour ça qu&apos;on vote.
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        L&apos;avion reste énorme en général : un seul aller-retour
        long-courrier pèse environ 2 t.
      </p>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Button
          size="lg"
          onPress={async () => {
            const url = window.location.origin;
            if (navigator.share) {
              try {
                await navigator.share({
                  title: "Footprint",
                  text: "Comprends ce qui pèse vraiment dans une empreinte carbone",
                  url,
                });
              } catch {
                // partage annulé
              }
            } else {
              await navigator.clipboard.writeText(url);
              toast.success("Lien copié, à diffuser sans modération");
            }
          }}
        >
          Partager l&apos;outil autour de toi
        </Button>
        <LinkButton
          variant="outline"
          size="lg"
          href="https://climatelab.fr"
          target="_blank"
          rel="noreferrer"
        >
          Découvrir les autres outils du ClimateLab →
        </LinkButton>
      </div>
    </div>
  );
}
