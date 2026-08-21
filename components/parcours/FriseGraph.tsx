"use client";

import { Poste } from "@/lib/simulation";
import {
  categoryColor,
  categoryLegendColor,
  categoryOrder,
} from "@/lib/simulation-colors";

interface FriseGraphProps {
  postes: Poste[];
  total: number;
  referenceTotal: number;
}

export default function FriseGraph({
  postes,
  total,
  referenceTotal,
}: FriseGraphProps) {
  const sorted = [...postes].sort((a, b) => b.size - a.size);
  const widthPercent =
    total >= referenceTotal
      ? 100
      : 20 + Math.floor(80 * (total / referenceTotal));

  return (
    <div>
      <div
        className="ml-auto transition-all duration-500"
        style={{ width: `${widthPercent}%` }}
      >
        <div className="flex h-14 w-full overflow-hidden rounded-md">
          {sorted.map((poste) => {
            const share = poste.size / total;
            return (
              <div
                key={poste.name}
                title={`${poste.name} — ${Math.round(poste.size)} kgCO₂eq`}
                className="flex h-full items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-medium text-white transition-all duration-500"
                style={{
                  width: `${share * 100}%`,
                  backgroundColor: categoryColor(poste.category, poste.size),
                }}
              >
                {share > 0.09
                  ? poste.name
                  : share > 0.045
                    ? poste.name.split(" ").at(-1)
                    : ""}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-end gap-x-3 gap-y-1">
        {categoryOrder.map((category) => (
          <span
            key={category}
            className="flex items-center gap-1 text-[11px] text-muted-foreground"
          >
            <span
              className="inline-block h-2 w-2 rounded-sm"
              style={{ backgroundColor: categoryLegendColor(category) }}
            />
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
