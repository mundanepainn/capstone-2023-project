import React from 'react'
import { Typography, Box, Autocomplete, TextField, FormControl, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";
import Maps from "../components/googleMaps";
import Button from '@mui/material-next/Button';

const locationStyle = {
    color : 'black',
  
}

const btnStyle = {
  marginTop: "2vh",
  marginBottom: "2vh",
  width: "40%"
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
      const string = document.getElementById("google-map").value;
      console.log(string);
      setLocation(string);
    }

    const next = () => {
        const string = document.getElementById("google-map").value;
        if (string.length === 0) {
          setOpen(true);
          return;
        }
        navigate('/hosting/activitySpecs');
      };
    //Verification of Location field. Location must be a non-empty address in New Zealand
    const validateNext = () => {
      const string = document.getElementById("google-map").value
      const address = string.split(", ");
      const len = address.length;
      if (string.length === 0 || address[len - 1] !== "New Zealand") {
        setOpen(true); //Display alert snackbar
        return;
      };
      setLocation(string);
      navigate('/hosting/activitySpecs');
    };

    return (
        <>
        {/*Alert snackbar*/}
        <Snackbar style={{bottom:'4%'}} open={open} autoHideDuration={6000} onClose={handleClose} message="Please specify a location in New Zealand"
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} />
        <Box sx={locationStyle}>
        <Typography style={{ margin: '30px', marginTop: "4vh"}}>Where is the event happening?</Typography>

        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  marginBottom: '20px'}}>
            <Maps/>
        </Box>
        {/*Page Navigation*/}
        <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee",  width: "40%"}} onClick={() => {navigate("/hosting/date")}/* Previous Page*/}>Back</Button>
        <Button sx={{ fontFamily: "Arial", padding: "10px", backgroundColor: "#4e84ee", width: "40%"}} variant = "filled" onClick={() => {validateNext()}}>Next</Button>
        </Box>
        </>
    )
}

export default LocationCreate;