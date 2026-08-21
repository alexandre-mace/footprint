"use client";

import {
  SimulationState,
  climateActions,
  computeTotal,
  defaultSimulationState,
  formatTonnes,
  PARIS_TARGET_KG,
} from "@/lib/simulation";

interface ActionsTabProps {
  state: SimulationState;
}

export default function ActionsTab({ state }: ActionsTabProps) {
  const total = computeTotal(state);
  const averageTotal = computeTotal(defaultSimulationState);

  const rows = climateActions
    .map((action) => ({
      ...action,
      deltaAverage: Math.max(
        0,
        Math.round(averageTotal - computeTotal(action.apply(defaultSimulationState))),
      ),
      deltaMe: Math.max(0, Math.round(total - computeTotal(action.apply(state)))),
    }))
    .sort((a, b) => b.deltaAverage - a.deltaAverage);

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
        Classées par économie pour un Français moyen, comparées à ce
        qu&apos;elles changeraient <em>pour toi</em> (d&apos;après
        l&apos;étape 2, empreinte actuelle : {formatTonnes(total)} t).
      </p>
      <div className="mb-4 flex justify-end gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-neutral-300" />
          Français moyen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-black" />
          Toi
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((action) => (
          <div
            key={action.id}
            className="flex items-center gap-3 rounded-xl border border-dashed border-black bg-white p-3"
          >
            <span className="text-xl">{action.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{action.label}</div>
              <div className="mt-1.5 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 rounded-sm bg-neutral-300 transition-all"
                    style={{
                      width: `${(action.deltaAverage / maxDelta) * 160}px`,
                    }}
                  />
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    −{formatTonnes(action.deltaAverage)} t
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 rounded-sm bg-black transition-all"
                    style={{ width: `${(action.deltaMe / maxDelta) * 160}px` }}
                  />
                  <span className="text-[11px] font-semibold tabular-nums">
                    −{formatTonnes(action.deltaMe)} t
                  </span>
                </div>
              </div>
            </div>
            <span className="w-12 shrink-0 text-right text-xs text-muted-foreground">
              {action.deltaMe > 0
                ? `${Math.round((action.deltaMe / total) * 100)} %`
                : "fait ✓"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-black bg-white p-4 text-sm">
        En cumulant tout ce qui dépend de toi :{" "}
        <span className="font-semibold">{formatTonnes(totalIfAll)} t</span> au
        lieu de <span className="font-semibold">{formatTonnes(total)} t</span>.
        {totalIfAll > PARIS_TARGET_KG && (
          <span className="text-muted-foreground">
            {" "}
            Le reste (services publics, infrastructures...) dépend des choix
            collectifs : c&apos;est aussi pour ça qu&apos;on vote.
          </span>
        )}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Une action à 0 t pour toi signifie que tu la fais déjà (ou
        qu&apos;elle ne s&apos;applique pas à ton profil). L&apos;avion reste
        énorme en général : un seul aller-retour long-courrier pèse environ 2 t.
      </p>
    </div>
  );
}
