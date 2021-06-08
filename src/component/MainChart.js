
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import useWindowSize from "../hook/useWindowSize";

defaults.font.family = 'mattoneregular';
defaults.font.size = 18;

const options = {
    plugins: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                font: {
                    size: 40,
                }
            }
        },
    },
}

const MainChart = ({ datasets, chartRef, playRef }) => {
    const size = useWindowSize();

    if (size.width < 992) {
        defaults.font.size = 12;
    }

    return (
        <div className={"main-chart-wrapper"}>
            {datasets.length === 0 &&
                <div
                    ref={(reference) => {if (reference !== null) {playRef.current = reference}}}
                    className={"play"}>
                        Jouez avec les options <br/>
                    <div className={"text-center arrow-wrapper"}><span className="arrow arrow-bar is-bottom"></span></div>
                </div>
            }
            <Bar
                ref={(reference) => {if (reference !== null) {chartRef.current = reference} }}
                data={{
                    labels: ['Empreinte carbone'],
                    datasets: datasets
                }}
                options={options}
            />
        </div>
    )
};

export default MainChart;