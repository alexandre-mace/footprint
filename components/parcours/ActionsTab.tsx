"use client";

import {
  SimulationState,
  computeTotal,
  formatTonnes,
  rankActions,
} from "@/lib/simulation";

interface ActionsTabProps {
  state: SimulationState;
}

const NEGLIGIBLE_KG = 20;

export default function ActionsTab({ state }: ActionsTabProps) {
  const ranked = rankActions(state);
  const relevant = ranked.filter((a) => a.deltaKg > NEGLIGIBLE_KG);
  const negligible = ranked.filter((a) => a.deltaKg <= NEGLIGIBLE_KG);
  const maxDelta = Math.max(...ranked.map((a) => a.deltaKg), 1);
  const total = computeTotal(state);

  return (
    <div className="mx-auto max-w-2xl p-4">
      <p className="text-lg font-medium">
        Tes leviers, classés pour ton profil
      </p>
      <p className="mb-6 text-sm text-muted-foreground">
        Chaque économie est calculée à partir de tes réponses de l&apos;étape 2
        (empreinte actuelle : {formatTonnes(total)} t). Modifie ta simulation et
        le classement s&apos;adapte.
      </p>
      <div className="flex flex-col gap-2">
        {relevant.map((action) => (
          <div
            key={action.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <span className="text-xl">{action.emoji}</span>
            <span className="flex-1 text-sm">{action.label}</span>
            <div
              className="h-3 shrink-0 rounded-sm bg-black/80"
              style={{ width: `${(action.deltaKg / maxDelta) * 120}px` }}
            />
            <span className="w-16 shrink-0 text-right text-sm font-semibold tabular-nums">
              −{formatTonnes(action.deltaKg)} t
            </span>
          </div>
        ))}
      </div>
      {negligible.length > 0 && (
        <>
          <p className="mb-2 mt-8 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Sans effet notable pour ton profil
          </p>
          <div className="flex flex-col gap-2 opacity-50">
            {negligible.map((action) => (
              <div
                key={action.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <span className="text-xl">{action.emoji}</span>
                <span className="flex-1 text-sm">{action.label}</span>
                <span className="w-16 shrink-0 text-right text-sm tabular-nums">
                  −{formatTonnes(action.deltaKg)} t
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Soit parce que tu le fais déjà, soit parce que l&apos;ordre de
            grandeur est minuscule. Trier ses mails ne sauvera pas le climat.
          </p>
        </>
      )}
    </div>
  );
}
