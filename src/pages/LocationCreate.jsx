import React from 'react'
import { Typography, Box, Button, CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./GoogleMaps.css";

const locationStyle = {
    color : 'black',
    borderStyle : 'solid',
    borderColor : 'black',
    borderRadius: '10px'
}
const center = {lat: -36.850488767915884, lng: 174.7593026276074};
function Map() {
    return  (
        <GoogleMap zoom={10} center={center} mapContainerClassName='map-container'>
            <Marker position={center} />
        </GoogleMap>
    )
}

const LocationCreate = () => {
    const navigate = useNavigate();
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyACOryV90tCBlq9gYDU54_vvR_fXKbgpLI"});
    let map = <Map/>
    if (isLoaded) {
        return (
            <>
                <Box sx={locationStyle}>
                <Typography>Where is the event happening?</Typography>
                {/* The map goes here */}
                <Map/>
                <Button onClick={() => navigate("/hosting/date") /* Previous Page*/}>Back</Button>
                <Button onClick={() => navigate("/") /* Next Page*/}>Next</Button>
                </Box>
            </>
        )
    }
    else {
        return (
            <CircularProgress />
        )
    }
}

export default LocationCreate;