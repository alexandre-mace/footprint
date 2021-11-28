import React, {useRef} from 'react';
import ActionSliders from "./ActionSliders";
import MainChart from "./MainChart";
import updateBarChartData from "../service/BarChartData";
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const IndividualDataVisualisation = ({ actions }) => {
    Chart.register(ChartDataLabels);

    const chartRef = useRef(null);
    const playRef = useRef(null);
    let activeActions = [];

    const resetValues = () => {
        activeActions = [];
        chartRef.current.config.data.datasets = [];
        updateBarChartData(chartRef.current.config.data, [])
        chartRef.current.update();
    }

    const handleActionValueChange = (action, newValue) => {
        let activeAction = activeActions.filter((filteredAction) => filteredAction.label === action.label);
        if (activeAction.length === 0) {
            activeAction = {...action};
        } else {
            activeAction = activeAction[0];
        }

        activeAction.value = action.value * newValue;
        activeActions = [
            ...activeActions.filter((filteredAction) => (filteredAction.label !== action.label)),
            activeAction
        ];

        updateBarChartData(chartRef.current.config.data, activeActions)
        chartRef.current.config.data.datasets = chartRef.current.config.data.datasets.sort((a, b) => {
            return b.data[0] - a.data[0];
        });

        if (playRef.current.style.display !== 'none') {
            playRef.current.style.display = 'none'
        }
        chartRef.current.update();
    }

    return (
        <>
            <MainChart playRef={playRef} chartRef={chartRef} datasets={[]}/>
            <ActionSliders actions={actions} handleActionValueChange={handleActionValueChange} resetValues={resetValues}/>
        </>
    )
}
export default IndividualDataVisualisation;