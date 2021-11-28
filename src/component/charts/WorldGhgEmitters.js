import React, {useRef} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import getOwidDataCsv from "../../data/adapter/Owid/getOwidDataCsv";
import ghgEmissionsBySectorData from "../../data/dataset/ghg-emissions-by-sector-211121.csv";

highcharts3d(Highcharts);

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const WorldGhgEmitters = () => {
    // Set up the chart
    React.useEffect(() => {
        const chart = new Highcharts.Chart({
            chart: {
                renderTo: 'world-ghg-emitters',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                backgroundColor: null,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'CO2 Emissions by energy source (2019)'
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Delivered amount',
                data: [
                    ['Coal', 14798],
                    ['Oil', 11344],
                    ['Gas', 7250],
                    ['Other', 230],
                ]
            }],
            credits: {
                enabled: false
            },
        });
        

    }, [])



    return (
        <div id="world-ghg-emitters"></div>
    )
}

export default WorldGhgEmitters;