"use client";

import { motion } from "framer-motion";
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
  /** Version condensée pour le récap sticky : frise fine, sans légende */
  compact?: boolean;
  /** Contenu ajouté en fin de ligne de légende (ex. lien méthodologie) */
  footerExtra?: React.ReactNode;
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

export default function FriseGraph({
  postes,
  total,
  referenceTotal,
  parisTargetKg,
  compact = false,
  footerExtra,
}: FriseGraphProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const [fillWidth, setFillWidth] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
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
      <div
        className={`relative w-full rounded-md bg-neutral-200/60 ${
          compact ? "mt-1 h-8" : "mt-6 h-16 md:h-20"
        }`}
      >
        <div
          ref={fillRef}
          className="flex h-full overflow-hidden rounded-md transition-all duration-500"
          style={{ width: `${fillPercent}%` }}
        >
          {sorted.map((poste) => {
            const share = poste.size / total;
            const segmentPx = share * fillWidth;
            const { label, emoji } = splitName(poste.name);
            const showFullLabel = segmentPx >= FULL_LABEL_MIN_PX;
            return (
              <motion.div
                key={poste.name}
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                title={`${poste.name} : ${Math.round(poste.size)} kgCO₂eq`}
                onMouseEnter={() => setHovered(poste.name)}
                onMouseLeave={() => setHovered(null)}
                className={`flex h-full items-center justify-center text-[11px] font-medium text-white transition-[filter] ${
                  showFullLabel ? "overflow-hidden" : ""
                } ${hovered === poste.name ? "brightness-110 saturate-110" : ""}`}
                style={{
                  width: `${share * 100}%`,
                  backgroundColor: categoryColor(poste.category, poste.size),
                }}
              >
                {showFullLabel ? (
                  <span className="truncate px-1">
                    {`${emoji} ${label}`.trim()}
                  </span>
                ) : (
                  emoji && <span className="text-[13px]">{emoji}</span>
                )}
              </motion.div>
            );
          })}
        </div>
        {!compact &&
          hovered &&
          (() => {
            let cumulative = 0;
            for (const poste of sorted) {
              const share = poste.size / total;
              if (poste.name === hovered) {
                const centerPercent = (cumulative + share / 2) * fillPercent;
                const { label, emoji } = splitName(hovered);
                return (
                  <div
                    className={`pointer-events-none absolute top-full z-10 mt-1.5 whitespace-nowrap rounded-md bg-foreground/90 px-2 py-1 text-[11px] text-background ${
                      centerPercent > 85
                        ? "-translate-x-full"
                        : centerPercent < 15
                          ? ""
                          : "-translate-x-1/2"
                    }`}
                    style={{ left: `${centerPercent}%` }}
                  >
                    <span className="font-medium">
                      {emoji} {label}
                    </span>{" "}
                    : {Math.round(poste.size)} kgCO₂eq (
                    {Math.round(share * 100)} %)
                  </div>
                );
              }
              cumulative += share;
            }
            return null;
          })()}
        <div
          className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-foreground"
          style={{ left: `${targetPercent}%` }}
        />
        {!compact && (
          <div
            className="absolute -top-6 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold text-primary"
            style={{ left: `${targetPercent}%` }}
          >
            2 t
          </div>
        )}
        {aboveAverage && (
          <div
            className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-neutral-600"
            style={{ left: `${averagePercent}%` }}
          />
        )}
        {!compact && (
          <div
            className={`absolute -top-6 whitespace-nowrap font-mono text-[10px] font-semibold text-neutral-500 ${
              averagePercent > 88 ? "-translate-x-full" : "-translate-x-1/2"
            }`}
            style={{ left: `${averagePercent}%` }}
          >
            moy. {formatTonnes(referenceTotal)} t
          </div>
        )}
      </div>
      {!compact && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <div className="text-[11px] text-muted-foreground">
            <span className="text-primary">2 t</span> = objectif de
            l&apos;accord de Paris, <span className="font-medium">moy.</span> =
            empreinte moyenne française.
            {footerExtra && <> {footerExtra}</>}
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
      )}
    </div>
  );
}
