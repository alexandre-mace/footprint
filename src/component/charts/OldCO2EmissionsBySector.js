import MultipleLines from "../charts-types/MultipleLines";
import React from "react";
import useWindowDimensions from "../../utils/useWindowDimension";
import kFormatThousands from "../../utils/kFormatThousands";
import totalCO2EmissionsBySectorData from "../../data/dataset/co2-emissions-by-sector-World.csv";
import getIaeDataCsv from "../../data/adapter/Iae/getIaeDataCsv";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const OldCO2EmissionsBySector = ({animation = true}) => {
    const {width} = useWindowDimensions();

    const [CO2EmissionsBySectorDatasets, setCO2EmissionsBySectorDatasets] = React.useState([])

    React.useEffect(() => {
        getIaeDataCsv(totalCO2EmissionsBySectorData, setCO2EmissionsBySectorDatasets)
    }, [])

    return (
        <>
            <div className="container my-3 my-md-5 pb-4 pb-md-5">
                <div className="row">
                    <div className="col px-0 px-sm-auto">
                            <MultipleLines
                                name='total final energy consumption by sector'
                                datasets={CO2EmissionsBySectorDatasets}
                                plugins={[ChartDataLabels]}
                                options={{
                                    hover: {
                                        mode: 'index',
                                        intersect: false
                                    },
                                    ...(!animation && {animation: {duration: 0}}),
                                    ...(!animation && {hover: {animationDuration: 0}}),
                                    ...(!animation && {responsiveAnimationDuration: 0}),
                                    maintainAspectRatio: width > 760,
                                    plugins: {
                                        tooltip: {
                                            usePointStyle: true,
                                            mode: 'index',
                                            intersect: false,
                                            backgroundColor: '#fbfbfb',
                                            titleColor: '#666',
                                            bodyColor: '#666',
                                            borderColor: 'lightgrey',
                                            borderWidth: 1
                                        },
                                        datalabels: {
                                            font: {
                                                weight: 'bold',
                                                size: width > 760 ? '14' : '10'
                                            },
                                            formatter: function(value, context) {
                                                if (context.dataIndex === context.dataset.data.length - 3 && value > 1500) {
                                                    return context.dataset.label
                                                }
                                                return null;
                                            },
                                            color: function(context) {
                                                return context.dataset.borderColor
                                            },
                                            align: 'top'
                                        }
                                    },
                                    scales: {
                                        y: {
                                            ticks: {
                                                callback: function(value, index, values) {
                                                    return kFormatThousands(value)
                                                }
                                            },
                                            title: {
                                                display: true,
                                                text: 'ktoe (Kilotonne of Oil Equivalent)',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            grid: {
                                                drawBorder: false,
                                            },
                                        },
                                        x: {
                                            title: {
                                                display: true,
                                                text: 'Years',
                                                fontColor: '#666666',
                                                fontSize: width > 760 ? '14' : '10'
                                            },
                                            grid : {
                                                display : false
                                            }
                                        }
                                    },
                                    legend: {
                                        position: width > 760 ? 'right' : 'top',
                                        reverse: true,
                                        labels: {
                                            boxWidth: width > 760 ? 40 : 12,
                                            fontSize: width > 760 ? 12 : 10
                                        }
                                    },
                                }}
                                fill={false}
                            >
                            </MultipleLines>
                            <div className="chart-legend">Final energy consumption by sector</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OldCO2EmissionsBySector