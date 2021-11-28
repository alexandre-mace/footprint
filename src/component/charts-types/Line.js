import React from 'react';
import {Line as ChartLine} from 'react-chartjs-2';

const Line = ({name, keys, values, options = {}, color = '75,192,192'}) => (
    <ChartLine
        options={options}
        data={{
            labels: keys,
            datasets: [
                {
                    label: name,
                    // fill: false,
                    lineTension: 0.1,
                    displayColors: false,
                    backgroundColor: `rgba(${color},0.6)`,
                    borderColor: `rgba(${color},1)`,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderWidth: 2,
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: `rgba(${color},0)`,
                    pointBackgroundColor: `rgba(${color},0)`,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: `rgba(${color},1)`,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 25,
                    data: values
                }
            ]
        }} />
)
export default Line;