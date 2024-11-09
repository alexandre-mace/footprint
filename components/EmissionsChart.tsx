import React, { MutableRefObject } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "chart.js";

Chart.register(ChartDataLabels);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Legend);
Chart.register(Tooltip);

const options = {
  plugins: {
    datalabels: {
      color: "black",
      display: true,
      font: {
        family: "mattone",
      },
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: {
          size: 10,
          family: "mattone",
        },
      },
    },
    tooltip: {
      enabled: true,
      titleFont: {
        size: 12,
        family: "mattone",
      },
      bodyFont: {
        size: 12,
        family: "mattone",
      },
      footerFont: {
        size: 12,
        family: "mattone",
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "(kgCO2eq)",
        font: {
          family: "mattone",
        },
      },
      ticks: {
        callback: (value: number) =>
          value >= 1000 ? `${(value / 1000).toFixed(2)}T` : value,
      },
    },
  },
};

const EmissionsChart = ({
  datasets,
  chartRef,
}: {
  datasets: [];
  chartRef: MutableRefObject<ChartJS | null>;
}) => {
  return (
    <div className={"flex h-[300px] justify-center md:h-[68vh]"}>
      <div className={"w-full"}>
        <Bar
          // @ts-expect-error ts incompatibility
          ref={chartRef}
          data={{
            labels: [""],
            datasets,
          }}
          // @ts-expect-error ts incompatibility
          options={options}
        />
      </div>
    </div>
  );
};

export default EmissionsChart;
