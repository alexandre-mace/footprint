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
import { Swords, Mail, Car, Smartphone, Zap, Beef, Train, Plane, Flame, MonitorSpeaker } from "lucide-react";
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
  // Fonction pour obtenir l'icône appropriée selon l'activité
  const getActivityIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('mail') || lowerLabel.includes('email')) {
      return <Mail className="h-3 w-3 text-blue-500" />;
    } else if (lowerLabel.includes('repas') || lowerLabel.includes('boeuf') || lowerLabel.includes('viande')) {
      return <Beef className="h-3 w-3 text-red-500" />;
    } else if (lowerLabel.includes('train') || lowerLabel.includes('tgv')) {
      return <Train className="h-3 w-3 text-green-500" />;
    } else if (lowerLabel.includes('avion')) {
      return <Plane className="h-3 w-3 text-blue-400" />;
    } else if (lowerLabel.includes('smartphone')) {
      return <Smartphone className="h-3 w-3 text-purple-500" />;
    } else if (lowerLabel.includes('chauffage')) {
      return <Flame className="h-3 w-3 text-orange-500" />;
    } else if (lowerLabel.includes('streaming') || lowerLabel.includes('vidéo')) {
      return <MonitorSpeaker className="h-3 w-3 text-pink-500" />;
    } else if (lowerLabel.includes('voiture')) {
      return <Car className="h-3 w-3 text-gray-600" />;
    } else {
      return <Zap className="h-3 w-3 text-yellow-500" />;
    }
  };

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
        <div className="flex flex-col gap-3 w-full max-w-2xl">
          {versus.slice(0, 3).map(versusItem => (
            <div
              key={versusItem.id}
              className="cursor-pointer hover:bg-muted/30 transition-colors rounded-lg p-3 border border-border"
              onClick={() => onApplyVersus?.(versusItem)}
            >
              <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1.5 rounded-md">
                  {getActivityIcon(versusItem.sideA.label)}
                  <span>{versusItem.sideA.label}</span>
                </div>
                
                <div className="flex items-center justify-center px-1">
                  <span className="font-bold text-orange-500 text-xs">VS</span>
                </div>
                
                <div className="flex items-center gap-1 bg-red-50 px-2 py-1.5 rounded-md">
                  {getActivityIcon(versusItem.sideB.label)}
                  <span>{versusItem.sideB.label}</span>
                </div>
                
                {versusItem.sideC && (
                  <>
                    <div className="flex items-center justify-center px-1">
                      <span className="font-bold text-orange-500 text-xs">VS</span>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1.5 rounded-md">
                      {getActivityIcon(versusItem.sideC.label)}
                      <span>{versusItem.sideC.label}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div
            className="cursor-pointer hover:bg-muted/30 transition-colors rounded-lg p-3 border border-dashed border-border"
            onClick={() => onOpenVersusDialog?.()}
          >
            <div className="flex items-center justify-center gap-2 text-xs">
              <Swords className="h-3 w-3 text-orange-500" />
              <span>Voir les autres versus</span>
            </div>
          </div>
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
