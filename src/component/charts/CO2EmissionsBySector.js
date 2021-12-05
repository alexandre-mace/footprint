import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import ghgEmissionsBySectorData from "../../data/dataset/ghg-emissions-by-sector-211121.csv";
import getOwidDataCsv from "../../data/adapter/Owid/getOwidDataCsv";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import {Autocomplete, TextField} from "@mui/material";


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
                style: {
                    fontSize: '16px',
                },
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
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


const CO2EmissionsBySector = (props) => {
    const chartComponentRef = useRef(null);
    const [CO2EmissionsBySectorDatasets, setCO2EmissionsBySectorDatasets] = React.useState({
        data: {},
        rows: false,
        years: [],
        countries: []
    })
    const [year, setYear] = React.useState('2016')
    const [country, setCountry] = React.useState('World')

    React.useEffect(() => {
        getOwidDataCsv(
            ghgEmissionsBySectorData,
            CO2EmissionsBySectorDatasets.rows,
            setCO2EmissionsBySectorDatasets,
            year,
            country
        )
    }, [])

    React.useEffect(() => {
        getOwidDataCsv(
            ghgEmissionsBySectorData,
            CO2EmissionsBySectorDatasets.rows,
            setCO2EmissionsBySectorDatasets,
            year,
            country
        )
    }, [year, country])

    const handleYearChange = (value) => {
        if (value.target.innerText !== undefined) {
            setYear(value.target.innerText)
        }
    }

    const handleCountryChange = (value) => {
        if (value.target.innerText !== undefined) {
            setCountry(value.target.innerText)
        }
    }

    return (
        <>
            <Box alignSelf={'center'} fontSize={'1.1rem'}>
                <h2>GHG (CO2eq) Emissions by sector</h2>
            </Box>
            <Box alignSelf={"center"} marginTop={3} marginBottom={3} textAlign={"center"}>
                <FormControl sx={{ minWidth: 300, maxWidth: 400, marginBottom: 2 }}>
                    <Autocomplete
                        disablePortal
                        id="year-box"
                        options={CO2EmissionsBySectorDatasets.years}
                        value={year}
                        onChange={handleYearChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Year" />}
                    />
                </FormControl>
                <FormControl sx={{ minWidth: 300, maxWidth: 400 }}>
                    <Autocomplete
                        disablePortal
                        id="country-box"
                        options={CO2EmissionsBySectorDatasets.countries}
                        color={"primary"}
                        value={country}
                        onChange={handleCountryChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                </FormControl>
            </Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={{...options, ...{series: [{
                            type: 'pie',
                            data: CO2EmissionsBySectorDatasets.data
                        }]}}}
                ref={chartComponentRef}
                {...props}
            />
            <Box alignSelf={'center'} fontSize={'0.7rem'}>
                <a href="https://www.climatewatchdata.org/data-explorer/historical-emissions?historical-emissions-data-sources=cait&historical-emissions-gases=all-ghg&historical-emissions-regions=All%20Selected&historical-emissions-sectors=All%20Selected&page=1">Sources (CAIT)</a>
            </Box>
        </>
    )
}

export default CO2EmissionsBySector;