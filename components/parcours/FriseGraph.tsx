"use client";

import { useEffect, useRef, useState } from "react";
import { Poste, formatTonnes } from "@/lib/simulation";
import {
  categoryColor,
  categoryLegendColor,
  categoryOrder,
} from "@/lib/simulation-colors";

interface FriseGraphProps {
  postes: Poste[];
  total: number;
  referenceTotal: number;
  parisTargetKg: number;
}

function splitName(name: string): { label: string; emoji: string } {
  const tokens = name.split(" ");
  const last = tokens[tokens.length - 1];
  const isEmoji = last !== undefined && !/[a-zA-Z0-9]/.test(last);
  return {
    label: isEmoji ? tokens.slice(0, -1).join(" ") : name,
    emoji: isEmoji ? last : "",
  };
}

const FULL_LABEL_MIN_PX = 90;
const EMOJI_MIN_PX = 26;

export default function FriseGraph({
  postes,
  total,
  referenceTotal,
  parisTargetKg,
}: FriseGraphProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [fillWidth, setFillWidth] = useState(0);
  const sorted = [...postes].sort((a, b) => b.size - a.size);
  const scale = Math.max(total, referenceTotal);
  const fillPercent = (total / scale) * 100;
  const targetPercent = (parisTargetKg / scale) * 100;
  const averagePercent = (referenceTotal / scale) * 100;
  const aboveAverage = total > referenceTotal;

  useEffect(() => {
    const element = fillRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setFillWidth(entries[0]?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="relative h-16 w-full overflow-hidden rounded-md bg-neutral-200/60 md:h-20">
        <div
          ref={fillRef}
          className="flex h-full transition-all duration-500"
          style={{ width: `${fillPercent}%` }}
        >
          {sorted.map((poste) => {
            const share = poste.size / total;
            const segmentPx = share * fillWidth;
            const { label, emoji } = splitName(poste.name);
            const content =
              segmentPx >= FULL_LABEL_MIN_PX
                ? label
                : segmentPx >= EMOJI_MIN_PX
                  ? emoji
                  : "";
            return (
              <div
                key={poste.name}
                title={`${poste.name} — ${Math.round(poste.size)} kgCO₂eq`}
                className="flex h-full items-center justify-center overflow-hidden text-[11px] font-medium text-white transition-all duration-500"
                style={{
                  width: `${share * 100}%`,
                  backgroundColor: categoryColor(poste.category, poste.size),
                }}
              >
                {content && <span className="truncate px-1">{content}</span>}
              </div>
            );
          })}
        </div>
        <div
          className="absolute top-0 h-full w-0.5 bg-orange-500"
          style={{ left: `${targetPercent}%` }}
        />
        {aboveAverage && (
          <div
            className="absolute top-0 h-full w-0.5 bg-neutral-500"
            style={{ left: `${averagePercent}%` }}
          />
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-0.5 bg-orange-500" />
            objectif 2 t (accord de Paris)
          </span>
          <span className="flex items-center gap-1">
            {aboveAverage ? (
              <>
                <span className="inline-block h-2.5 w-0.5 bg-neutral-500" />
                moyenne française ({formatTonnes(referenceTotal)} t)
              </>
            ) : (
              <>
                <span className="inline-block h-2 w-3 rounded-sm bg-neutral-200" />
                le fond gris va jusqu&apos;à la moyenne française (
                {formatTonnes(referenceTotal)} t)
              </>
            )}
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
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
    </div>
  );
}
