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
        let activeAction = activeActions.find((filteredAction) => filteredAction.label === action.label);
        if (!activeAction) {
            activeAction = {...action};
        }

        activeAction.value = parseFloat((Math.round(action.value * newValue * 100) / 100).toFixed(2));
        activeActions = [
            ...activeActions.filter((filteredAction) => (filteredAction.label !== action.label)),
            activeAction
        ];

        let total = 0
        activeActions.forEach(action => {
            total+= parseFloat(action.value)
        })

        if (activeActions.length === 1) {
            total = parseFloat(activeActions[0].value)
        }

        updateBarChartData(chartRef.current.config.data, activeActions)
        chartRef.current.config.data.datasets = chartRef.current.config.data.datasets.sort((a, b) => {
            return b.data[0] - a.data[0];
        });

        if (playRef.current.style.display !== 'none') {
            playRef.current.style.display = 'none'
        }
        if (document.getElementsByClassName('chart-section')[0].classList.contains('hidden')) {
            document.getElementsByClassName('chart-section')[0].classList.remove('hidden')
        }
        if (document.getElementsByClassName('total-wrapper')[0].classList.contains('hidden')) {
            document.getElementsByClassName('total-wrapper')[0].classList.remove('hidden')
        }
        chartRef.current.update();
        document.getElementById('total').innerText = total.toFixed(2)
        if (total > 2000) {
            document.getElementById('total').style.color = 'red';
        } else if (total <= 2000) {
            document.getElementById('total').style.color = 'green';
        } 
    }

    return (
        <>
            <div className={"mode-baseline-subtitle"}>Apprivoisez les <span className={"important-word"}>ordres de grandeurs</span> des émissions de gaz à effet de serre relatifs à nos activités quotidiennes.</div>
            <MainChart playRef={playRef} chartRef={chartRef} datasets={[]}/>
            <ActionSliders actions={actions} handleActionValueChange={handleActionValueChange} resetValues={resetValues}/>
        </>
    )
}
export default IndividualDataVisualisation;