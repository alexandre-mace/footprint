"use client";

import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import { Poste } from "@/lib/simulation";
import { categoryColor } from "@/lib/simulation-colors";

interface TreemapGraphProps {
  postes: Poste[];
}

interface CellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  category?: string;
}

function Cell({ x = 0, y = 0, width = 0, height = 0, name, size, category }: CellProps) {
  if (width <= 0 || height <= 0) return null;
  const showLabel = width > 70 && height > 28;
  const showShortLabel = !showLabel && width > 34 && height > 18;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={categoryColor(category ?? "", size ?? 1)}
        stroke="#fff"
        strokeWidth={1}
      />
      {(showLabel || showShortLabel) && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={10}
          fontWeight={500}
        >
          {showLabel ? name : name?.split(" ").at(-1)}
        </text>
      )}
    </g>
  );
}

export default function TreemapGraph({ postes }: TreemapGraphProps) {
  const data = postes
    .filter((poste) => poste.size > 0)
    .map((poste) => ({
      name: poste.name,
      size: poste.size,
      category: poste.category,
    }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          animationDuration={400}
          content={<Cell />}
        >
          <Tooltip
            formatter={(value: number) => [`${Math.round(value)} kgCO₂eq`]}
            labelFormatter={() => ""}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
