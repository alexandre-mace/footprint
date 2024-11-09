import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ListRestart, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Emission from "@/types/emission";
import Category from "@/types/category";
import emissionsData from "@/data/emissions.json";
import { Chart as ChartJS } from "chart.js";
import handleEmissionQuantityChange from "@/lib/handleEmissionQuantityChange";
import { EmissionsEditorConfig } from "@/components/EmissionsEditorConfig";
import updateChartData from "@/lib/updateChartData";

const EmissionsEditor = ({
  chartRef,
}: {
  chartRef: React.MutableRefObject<ChartJS | null>;
}) => {
  const [emissions, setEmissions] = useState<Category[]>(
    emissionsData.map((emissionSector) => ({
      ...emissionSector,
      emissions: emissionSector.emissions.map((emission) => ({
        ...emission,
        quantity: 0,
      })),
    })),
  );

  const reset = () => {
    setEmissions(
      emissionsData.map((emissionSector) => ({
        ...emissionSector,
        emissions: emissionSector.emissions.map((emission) => ({
          ...emission,
          quantity: 0,
        })),
      })),
    );
    if (chartRef?.current) {
      chartRef.current.config.data.datasets = [];
      updateChartData(chartRef.current.config.data, []);
      chartRef.current.update();
    }
  };

  return (
    <div className={"relative grid gap-4 md:grid-cols-1 xl:grid-cols-2"}>
      <div className={"absolute -top-12 flex items-center justify-end gap-2"}>
        <EmissionsEditorConfig
          emissions={emissions}
          setEmissions={setEmissions}
        />
        <Button onClick={reset} variant={"outline"} size={"icon"}>
          <ListRestart className={"h-4 w-4"} />
        </Button>
      </div>

      {emissions.map((category) => (
        <div
          className={
            "space-y-2 rounded-xl border bg-white p-4 hover:shadow-orange-light"
          }
          key={category.label}
        >
          <div className={"flex items-center gap-2"}>
            <Image
              className={"h-4 w-4 md:h-6 md:w-6"}
              src={category.img}
              alt={category.label}
              height={32}
              width={32}
            />
            <div
              className={"text-xs font-medium text-muted-foreground md:text-sm"}
            >
              {category.label}
            </div>
          </div>
          <div className={"space-y-4"}>
            {category.emissions
              .filter((emission: Emission) => emission.isVisible)
              .map((emission) => (
                <div
                  key={emission.label}
                  className={
                    "flex justify-between gap-4 rounded-lg border border-dashed border-black p-2 md:p-4"
                  }
                >
                  <div className={"space-y-1"}>
                    <div className={"text-xs font-medium md:text-sm"}>
                      {emission.label}
                    </div>
                    <div className={"text-xs text-muted-foreground"}>
                      {emission.value}kco2eq
                    </div>
                  </div>
                  <div className={"flex shrink-0 items-center gap-2"}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleEmissionQuantityChange(
                          emission,
                          emission.quantity - 1,
                          setEmissions,
                          chartRef,
                        )
                      }
                    >
                      <Minus />
                    </Button>
                    <Input
                      value={emission.quantity}
                      className={"max-w-24 text-center"}
                      onChange={(e) =>
                        handleEmissionQuantityChange(
                          emission,
                          parseInt(
                            e.target.value === "" ? "0" : e.target.value,
                          ),
                          setEmissions,
                          chartRef,
                        )
                      }
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleEmissionQuantityChange(
                          emission,
                          emission.quantity + 1,
                          setEmissions,
                          chartRef,
                        )
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmissionsEditor;
