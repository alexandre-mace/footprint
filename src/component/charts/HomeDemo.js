import React, {useRef} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";

highcharts3d(Highcharts);

const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        backgroundColor: null,
        plotShadow: false,
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            size:'130%',
            allowPointSelect: true,
            slicedOffset: 40,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: false,
            }
        }
    },
    series: [{
        type: 'pie',
        data: [],
    }],
    credits: {
        enabled: false
    },
};

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let generateDynamicData = (dynamicDataLength) => [...Array(dynamicDataLength).keys()].map((i) => [i, randomIntFromInterval(0, 2)]);

let deltaY = 0;
let dynamicDataLength = 7

const HomeDemo = () => {
    const chartComponentRef = useRef(null);
    const [currentInterval, setCurrentInterval] = React.useState(null)
    const [dynamicData, setDynamicData] = React.useState(generateDynamicData(dynamicDataLength))

    React.useEffect(() => {
        let interval = setInterval(() => {
            setDynamicData(generateDynamicData(dynamicDataLength))
        }, 2500)
        setCurrentInterval(interval)
    }, [])

    // window.addEventListener("wheel", event => {
    //     if (Math.floor(event.deltaY) === deltaY) {
    //         return;
    //     }
    //     deltaY = Math.floor(event.deltaY)
    //
    //     let deltaData = Math.floor(event.deltaY / 14)
    //     console.log(deltaData)
    //
    //     const delta = Math.sign(event.deltaY);
    //     if (delta > 0) {
    //         dynamicDataLength = dynamicDataLength + deltaData
    //         clearInterval(currentInterval)
    //         let interval = setInterval(() => {
    //             setDynamicData(generateDynamicData(dynamicDataLength))
    //         }, 2500)
    //         setCurrentInterval(interval)
    //     } else {
    //         dynamicDataLength = ((dynamicDataLength + deltaData) <= 2 ? 2 : (dynamicDataLength + deltaData))
    //         clearInterval(currentInterval)
    //         let interval = setInterval(() => {
    //             setDynamicData(generateDynamicData(dynamicDataLength))
    //         }, 2500)
    //         setCurrentInterval(interval)
    //     }
    // });

    return (
        <div className={"demo-chart"}>
            <HighchartsReact
                highcharts={Highcharts}
                options={{...options, ...{series: [{
                            type: 'pie',
                            data: dynamicData
                        }]}}}
                ref={chartComponentRef}
            />
        </div>
    )
}
export default HomeDemo