import React from 'react';
import {Bubble as ChartBubble} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import 'chartjs-plugin-datalabels';
import distinctColors from "distinct-colors";
import getRandomColor from "../utils/getRandomColor";

const Bubble = ({datasets, options = {}}) => {

    let palette = distinctColors({
        count: datasets.length
    })
    return (
        <ChartBubble
            options={options}
            data={{
                labels: datasets.map(data => data.label),
                datasets: datasets.map((dataset, index) => {
                    return {
                        label: dataset.label,
                        backgroundColor: `rgba(${getRandomColor(palette, index, dataset.label)},0.4)`,
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [{x: dataset.data.x, y: dataset.data.y, r: 5}]
                    }
                })
            }}/>
    )
}
export default Bubble;