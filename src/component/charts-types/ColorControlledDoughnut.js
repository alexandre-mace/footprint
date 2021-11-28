import React from 'react';
import {Doughnut as ChartDoughnut} from 'react-chartjs-2';
import 'chartjs-plugin-labels';

const ColorControlledDoughnut = ({datasets, options = {}}) => (
    <ChartDoughnut
        height={150}
        options={{
            responsive: true,
            plugins: {
                datalabels: false,
                labels: {
                    render: 'label',
                    fontSize: 12,
                    fontStyle: 'bold',
                    fontColor: '#fff',
                    fontFamily: 'Helvetica, sans-serif'
                }
            },
            legend: {
                display: false
            }
        }}
        data={{
            labels: datasets.map(dataset => dataset.name),
            datasets: [{
                data: datasets.map(dataset => dataset.value),
                backgroundColor: datasets.map(dataset => dataset.color)
            }]
        }} />
)
export default ColorControlledDoughnut;