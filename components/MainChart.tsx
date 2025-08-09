"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartData } from "@/types/chart";
import { Button } from "@/components/ui/button";
import { Swords } from "lucide-react";
import { Versus, VersusRaw } from "@/types/versus";
import versusData from "@/data/versus.json";

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const MainChart = React.memo<{
  chartData: ChartData;
  onApplyVersus?: (versus: Versus) => void;
  onOpenVersusDialog?: () => void;
}>(({ chartData, onApplyVersus, onOpenVersusDialog }) => {
  // Convertir les données JSON en objets Versus
  const versus: Versus[] = (versusData as VersusRaw[]).map((v: VersusRaw) => ({
    id: v.id,
    name: v.name,
    description: v.description,
    sideA: {
      label: v.sideA.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideA.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    },
    sideB: {
      label: v.sideB.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideB.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    },
    sideC: v.sideC ? {
      label: v.sideC.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideC.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    } : undefined
  }));

  // Si pas de données, afficher les suggestions de versus
  if (chartData.length === 0) {
    return (
      <div className="h-[50vh] w-full flex flex-col items-center justify-center space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">Aucune donnée à afficher</p>
          <p className="text-xs text-muted-foreground">Essayez ces comparaisons :</p>
        </div>
        <div className="grid gap-2 w-full max-w-md">
          {versus.slice(0, 3).map(versusItem => (
            <Button
              key={versusItem.id}
              variant="outline"
              size="sm"
              className="justify-start text-xs h-auto p-2"
              onClick={() => onApplyVersus?.(versusItem)}
            >
              <Swords className="h-3 w-3 mr-2 text-orange-500 flex-shrink-0" />
              <span className="truncate">{versusItem.name}</span>
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="justify-center text-xs h-auto p-2 border-dashed"
            onClick={() => onOpenVersusDialog?.()}
          >
            <Swords className="h-3 w-3 mr-2 text-orange-500 flex-shrink-0" />
            Voir les autres versus
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className={"h-[50vh] w-full"}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
        barCategoryGap={2}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" radius={8} barSize={32}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
});

MainChart.displayName = 'MainChart';

export default MainChart;
