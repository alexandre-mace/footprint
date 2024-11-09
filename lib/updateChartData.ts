import Category from "@/types/category";
import Emission from "@/types/emission";
import { ChartData } from "chart.js";

const calculateEmissionData = (emission: Emission) =>
  parseFloat((emission.value * emission.quantity).toFixed(2));

const updateChartData = (chartData: ChartData, emissions: Category[]) => {
  const existingDatasets = new Map(
    chartData.datasets.map((dataset) => [
      dataset && dataset.label ? dataset.label[0] : "",
      dataset,
    ]),
  );

  const barThickness = window.innerWidth < 700 ? 35 : 50;

  emissions
    .flatMap((category) => category.emissions)
    .filter(
      (emission) =>
        emission.quantity > 0 || existingDatasets.has(emission.label),
    )
    .forEach((emission) => {
      const newValue = calculateEmissionData(emission);

      if (existingDatasets.has(emission.label)) {
        const dataset = existingDatasets.get(emission.label);
        if (dataset && dataset?.data[0] !== newValue) {
          dataset.data[0] = newValue;
        }
      } else {
        chartData.datasets.push({
          barThickness,
          // @ts-expect-error typescript error of label key
          label: [emission.label],
          // datalabels: {
          //   color: emission.color,
          // },
          backgroundColor: [emission.color],
          borderColor: "transparent",
          borderWidth: 3,
          hoverBackgroundColor: [emission.color],
          hoverBorderColor: [emission.color],
          data: [newValue],
        });
      }
    });
};

export default updateChartData;
