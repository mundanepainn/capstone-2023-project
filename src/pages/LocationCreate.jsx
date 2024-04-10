import React from 'react'
import { Typography, Box, Button, Autocomplete, TextField, FormControl, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";
import Maps from "../components/googleMaps";

const locationStyle = {
    color : 'black',
  
}

const btnStyle = {
  marginBottom: "2vh",
  // padding: "0px",
}




const LocationCreate = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
      if (reason == 'clickaway') {
        return;
      }
      setOpen(false);
    }

    const {
        location,
        setLocation
      } = React.useContext(MyContext);

    const passLocation = () => {
      const string = document.getElementById("google-map-demo").value;
      console.log(string);
      setLocation(string);
    }

    const next = () => {
        if (location.length === 0) {
          setOpen(true);
          return;
        }
        navigate('/hosting/activitySpecs');
      };
    return (
        <>
        <Snackbar style={{bottom:'4%'}} open={open} autoHideDuration={6000} onClose={handleClose} message="Please specify a location (If the event is online, type 'online' in the box)"
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} />
        <Box sx={locationStyle}>
        <Typography style={{ margin: '30px', marginTop: "4vh"}}>Where is the event happening?</Typography>
        {/* <Autocomplete style={{ margin: '20px' }}
        freeSolo
        value={location}
        onInputChange={(event, newLocation) => setLocation(newLocation)}
        options={commonLocations.map((option) => option)}
        renderInput={(params) => <TextField required {...params} label="Location"/>}
        /> */}
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  marginBottom: '20px'}}>
            <Maps id="map_input" />
        </Box>
        <Button sx={btnStyle} onClick={() => {navigate("/hosting/date")}/* Previous Page*/}>Back</Button>
        <Button sx={btnStyle} onClick={() => {passLocation(); next()}}>Next</Button>
        </Box>
        </>
    )
}

const commonLocations = [
    "Computer Science Building, Auckland University",
    "Engineering Building, Auckland University",
    "Biology Building, Auckland University",
    "Food Court, Auckland University"
]

export default LocationCreate;