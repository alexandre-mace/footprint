
import React, {useRef} from 'react';
import CustomSlider from "./CustomSlider";
import MainChart from "./MainChart";
import updateBarChartData from "../service/BarChartData";

const DataVisualisation = ({ actions }) => {
    const chartRef = useRef(null);
    const playRef = useRef(null);
    let activeActions = [];

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

            <div className="d-flex input-sliders-wrapper">
                {actions.map((action, key) => (
                    <div style={{marginRight: '1.5rem'}} key={key}>
                        <CustomSlider action={action} value={action.value} setValue={handleActionValueChange}/>
                    </div>
                ))}
            </div>
        </>
    )
};

export default DataVisualisation;