import React from 'react';
import {Doughnut as ChartDoughnut} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import useWindowDimensions from "../utils/useWindowDimension";
import distinctColors from "distinct-colors";
import getRandomColor from "../utils/getRandomColor";

const Doughnut = ({datasets, options = {}}) => {
    const { width } = useWindowDimensions();

    let palette = distinctColors({
        count: datasets.length
    })

    return (
        <ChartDoughnut
            options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    datalabels: false,
                    labels: [
                        {
                            render: 'label',
                            fontSize: width > 760 ? '14' : '8',
                            fontStyle: 'bold',
                            fontColor: '#000',
                            fontFamily: 'Helvetica, sans-serif'
                         },
                        {
                            render: 'percentage',
                            fontSize: width > 760 ? '14' : '8',
                            position: 'outside',
                            fontColor: '#000',
                            fontFamily: 'Helvetica, sans-serif'
                        },
                    ]
                },
                legend: {
                    display: width > 760
                },
            }}
            data={{
                labels: datasets.map(dataset => dataset.name),
                datasets: [{
                    data: datasets.map(dataset => dataset.value),
                    backgroundColor: datasets.map((dataset, index) => `rgba(${getRandomColor(palette, index, dataset.name)},0.6)`)
                }]
            }}/>
    )
}
export default Doughnut;