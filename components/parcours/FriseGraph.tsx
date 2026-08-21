"use client";

import { useEffect, useRef, useState } from "react";
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
}: FriseGraphProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const sorted = [...postes].sort((a, b) => b.size - a.size);
  const widthPercent =
    total >= referenceTotal
      ? 100
      : 20 + Math.floor(80 * (total / referenceTotal));

  useEffect(() => {
    const element = barRef.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setBarWidth(entries[0]?.contentRect.width ?? 0);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        className="ml-auto transition-all duration-500"
        style={{ width: `${widthPercent}%` }}
      >
        <div ref={barRef} className="flex h-16 w-full overflow-hidden rounded-md md:h-20">
          {sorted.map((poste) => {
            const share = poste.size / total;
            const segmentPx = share * barWidth;
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
