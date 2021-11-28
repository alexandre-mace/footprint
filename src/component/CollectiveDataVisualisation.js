import React from 'react';
import CO2EmissionsBySector from "./charts/CO2EmissionsBySector";
import Iframe from "react-iframe";
import Box from "@mui/material/Box";


const CollectiveDataVisualisation = () => {
    return (
        <>
            <CO2EmissionsBySector/>

            <Box alignSelf={'center'} fontSize={'1.1rem'} textAlign={"center"} marginTop={10}>
                <h2>Consumption-based CO2 emissions per capita</h2>
                <p>In the visualization we show how consumption-based emissions corrected for population size emissions per capita varies across the world.</p>
            </Box>
            <div className="d-flex justify-content-center iframe-wrapper">
                <Iframe url="https://ourworldindata.org/grapher/consumption-co2-per-capita?time=2019&country="
                        width="100%"
                        height="600px"
                        loading={"lazy"}
                        id="owid-iframe"
                        className="myClassname"
                        display="initial"
                        position="relative"
                        styles={{border: '0px none'}}
                />
            </div>
        </>
    )
}
export default CollectiveDataVisualisation;