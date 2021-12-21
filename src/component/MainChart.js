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
            formatter: function(context) {
                if (context >= 1000) {
                    return Math.round(context / 1000) + 'T';
                }
                return Math.round(context);
            },
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
            },
            ticks:  {
                callback: function(value, index, values) {
                    if (parseInt(value) >= 1000) {
                        return parseFloat(value) / 1000 + 'T'
                    }
                    return parseFloat(value);
                }
            },
        },
        xAxis: {
            barThickness: 2
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
        <div className={"chart-section " + (datasets.length > 0 ? '' : 'hidden')}>
            {datasets.length === 0 &&
                <a
                    href={"#input-sliders-wrapper"}
                    ref={(reference) => {if (reference !== null) {playRef.current = reference}}}
                    className={"play"}>
                    Joue avec les options <br/>
                    <div className={"text-center arrow-wrapper"}><span className="arrow arrow-bar is-bottom"/></div>
                </a>
            }
            <div className={"chart-section-content"}>
                <div className={"main-chart-wrapper"}>
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
                <div className={"main-chart-title"}>Empreinte carbone (CO2eq) d'actions individuelles</div>
                <div className={"source"}>
                    Source : <a target="_blank" href="https://data.ademe.fr/datasets/base-carbone(r)">Base carbone® Ademe</a>
                </div>
            </div>
        </div>
    )
};

export default MainChart;