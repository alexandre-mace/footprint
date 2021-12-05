import React from 'react';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import useWindowSize from "../hook/useWindowSize";
import "chartjs-plugin-datalabels";

defaults.font.family = 'mattoneregular';
defaults.font.size = 18;

const options = {
    plugins: {
        datalabels: {
            color: 'black',
            display: true,
            align: 'end',
            anchor: 'center',
            font: {
                size: 15,
            },
            formatter: Math.round
        },
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 8,
                }
            }
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        y: {
            title: {
                display: true,
                text: '(kgCO2eq)'
            }
        }
    }
}

const MainChart = ({ datasets, chartRef, playRef }) => {
    const size = useWindowSize();

    if (size.width < 992) {
        defaults.font.size = 12;
    }

    if (size.width < 492) {
        defaults.font.size = 10;
    }

    return (
        <>
            <div className={"main-chart-wrapper"}>
                {datasets.length === 0 &&
                <div
                    ref={(reference) => {if (reference !== null) {playRef.current = reference}}}
                    className={"play"}>
                    Jouez avec les options <br/>
                    <div className={"text-center arrow-wrapper"}><span className="arrow arrow-bar is-bottom"/></div>
                </div>
                }
                <Bar
                    ref={(reference) => {if (reference !== null) {chartRef.current = reference} }}
                    data={{
                        labels: ['Empreinte carbone (CO2eq)'],
                        datasets: datasets
                    }}
                    options={options}
                    type={'bar'}
                />
            </div>
            <div className={"source"}>
                Source : <a target="_blank" href="https://data.ademe.fr/datasets/base-carbone(r)">Base carbone® Ademe</a>
            </div>
        </>
    )
};

export default MainChart;