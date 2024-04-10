import React from "react";
import { Typography, Box, Button} from "@mui/material";
import { LocalizationProvider, DateCalendar } from  '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";

const calendarStyle = {
    color : 'black',
    borderStyle : 'solid',
    borderColor : 'black',
    borderRadius: '10px'
}

function DateCreate() {
    const navigate = useNavigate();
    return (
        <>
        <Box sx={calendarStyle}>
        <Typography>When is the event happening?</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar/>
        </LocalizationProvider>

        <Button onClick={() => navigate("/") /* Previous Page*/}>Back</Button>
        <Button onClick={() => navigate("/hosting/location") /* Next Page*/}>Next</Button>
        </Box>
        </>
    )
}
export default DateCreate;