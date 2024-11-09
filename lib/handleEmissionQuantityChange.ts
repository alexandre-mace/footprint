import Emission from "@/types/emission";
import Category from "@/types/category";
import React, { MutableRefObject, SetStateAction } from "react";
import updateChartData from "@/lib/updateChartData";
import { Chart as ChartJS } from "chart.js";

const handleEmissionQuantityChange = (
  emission: Emission,
  quantity: null | number = null,
  setEmissions: React.Dispatch<SetStateAction<Category[]>>,
  chartRef: MutableRefObject<ChartJS | null>,
) => {
  setEmissions((prevData) => {
    const newEmissions = prevData.map((category) => {
      const updatedEmissions = category.emissions.map((categoryEmission) => {
        if (categoryEmission.label === emission.label) {
          const newQuantity = Math.min(
            categoryEmission.max,
            Math.max(categoryEmission.min, quantity ?? 0),
          );

          return { ...categoryEmission, quantity: newQuantity };
        }
        return categoryEmission;
      });

      return { ...category, emissions: updatedEmissions };
    });

    if (chartRef !== null && chartRef.current !== null) {
      updateChartData(chartRef.current.config.data, newEmissions);
      chartRef.current.config.data.datasets =
        chartRef.current.config.data.datasets.sort((a, b) => {
          // @ts-expect-error chartJs ts limit testing
          return (b?.data[0] ?? 0) - (a?.data[0] ?? 0);
        });

      chartRef.current.update();
    }

    return newEmissions;
  });
};

export default handleEmissionQuantityChange;
