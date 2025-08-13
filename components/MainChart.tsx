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

export interface MainChartRef {
  exportToPNG: () => void;
}

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const MainChart = React.forwardRef<MainChartRef, {
  chartData: ChartData;
  onApplyVersus?: (versus: Versus) => void;
  onOpenVersusDialog?: () => void;
}>(({ chartData, onApplyVersus, onOpenVersusDialog }, ref) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  const exportToPNG = React.useCallback(() => {
    const chartContainer = chartRef.current;
    if (!chartContainer) return;
    
    const svgElement = chartContainer.querySelector('svg');
    if (!svgElement) return;

    // Créer un canvas pour l'export PNG
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cloner le SVG pour éviter de modifier l'original
    const svgClone = svgElement.cloneNode(true) as SVGElement;
    
    // Ajouter un style pour forcer une police sans-serif lisible
    const defs = svgClone.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    if (!svgClone.querySelector('defs')) {
      svgClone.insertBefore(defs, svgClone.firstChild);
    }
    
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `
      text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        font-weight: 500;
      }
    `;
    defs.appendChild(style);

    const svgData = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Fond blanc pour le PNG
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(img, 0, 0);
      
      // Télécharger le PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = 'footprint-chart.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        }
      }, 'image/png');
      
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  React.useImperativeHandle(ref, () => ({
    exportToPNG
  }), [exportToPNG]);
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
      <div className="md:h-[50vh] w-full flex flex-col items-center justify-center space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">Aucune donnée à afficher</p>
          <p className="text-xs text-muted-foreground">Essayez ces comparaisons :</p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-2xl">
          {versus.slice(0, 3).map(versusItem => (
            <Button
              key={versusItem.id}
              variant={"outline"}
              className={"py-2 h-auto"}
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
            </Button>
          ))}
          <Button
          variant={"outline"}
          className={"py-2 h-auto"}
          onClick={() => onOpenVersusDialog?.()}
          >
            <div className="flex items-center justify-center gap-2 text-xs">
              <Swords className="h-3 w-3 text-orange-500" />
              <span>Voir les autres versus</span>
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ChartContainer config={chartConfig} className={"h-[50vh] w-full"} ref={chartRef}>
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 40,
            bottom: 20
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
            content={<ChartTooltipContent hideLabel formatter={(value) => [`${value} kg CO2eq`, '']} />}
          />
          <Bar dataKey="value" radius={8} barSize={32}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
          {/* Indicateur d'unité dans le SVG */}
          <text
            x="95%"
            y="8%"
            textAnchor="end"
            className="fill-muted-foreground"
            fontSize={12}
            fontWeight={500}
          >
            kg CO2eq
          </text>
        </BarChart>
      </ChartContainer>
    </div>
  );
});

MainChart.displayName = 'MainChart';

export default MainChart;
