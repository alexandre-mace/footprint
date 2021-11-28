import React from 'react';
import {Line as ChartLine} from 'react-chartjs-2';
import distinctColors from 'distinct-colors'
import getRandomColor from "../../utils/getRandomColor";

const MultipleLines = ({datasets, plugins, options = {}, fill = true}) => {
    if (typeof datasets !== 'undefined') {

    const datasetsValues = (Array.isArray(datasets)) ? datasets : datasets.values
    const labels = (Array.isArray(datasets)) ? datasets[0] ? datasets[0].keys : [] : datasets.keys
    let palette = distinctColors({
        count: datasetsValues.length
    }).reverse()

    return (
    <ChartLine
        plugins={plugins}
        options={options}
        data={{
            labels: labels,
            datasets: datasetsValues.map((dataset, index) => {
                const color = getRandomColor(palette, index, dataset.name)
                return {
                    label: dataset.name,
                    fill: fill,
                    lineTension: 0.1,
                    backgroundColor: `rgba(${color},1)`,
                    borderColor: `rgba(${color},1)`,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderWidth: 2,
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'round',
                    pointBorderColor: `rgba(${color},0)`,
                    pointBackgroundColor: `rgba(${color},1)`,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: `rgba(${color},1)`,
                    pointHoverBorderColor: `rgba(${color},1)`,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 25,
                    data: dataset.values.map(value => Math.round(value))
                }
            })
        }}/>
    )
    }
}
export default MultipleLines;