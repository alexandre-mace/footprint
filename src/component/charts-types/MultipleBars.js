import React from 'react';
import Bar from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import distinctColors from "distinct-colors";
import getRandomColor from "../utils/getRandomColor";

const MultipleBars = ({datasets, options = {}}) => {
    let palette = distinctColors({
        count: 0
    })

    if (datasets.datasets) {
        palette = distinctColors({
            count: datasets.datasets.length
        })
    }

    return (
        <>
        {datasets.datasets &&
            <Bar
                type={'bar'}
                options={options}
                data={{
                    labels: datasets.keys,
                    datasets: datasets.datasets.map((dataset, index) => {
                        const label = dataset.name

                        return {
                            label: label,
                            stack: 2,
                            data: dataset.values,
                            backgroundColor: `rgba(${getRandomColor(palette, index, label)},0.6)`
                        }})
                }} />
        }
        </>
    )}
export default MultipleBars;