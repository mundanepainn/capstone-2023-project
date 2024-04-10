import React from "react";
import { Typography, Box, Snackbar } from "@mui/material";
import { LocalizationProvider, DateCalendar, TimePicker } from  '@mui/x-date-pickers';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";
import Button from '@mui/material-next/Button';

const calendarStyle = {
    color : 'black'
    
}

const btnStyle = {
    marginBottom: "2vh",
    padding: "0 px",
    marginRight: "1vh",
    marginLeft: "1vh",
    marginTop: "3.5vh",
    width: "40%"
}

function DateCreate() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    //Context Manager variables
    const {
        date,
        setDate,
        time,
        setTime
      } = React.useContext(MyContext);
    //function for closing the alert snackbar
    const handleClose = (event, reason) => {
      if (reason == 'clickaway') {
        return;
      }
      setOpen(false);
    }
    //Verifies date & time: If valid then next page. If not then display alert snackbar
    const next = () => {
        const dateTime = dayjs(date + " " + time, "MM/DD/YYYY h:mm A");
        if (dateTime.isBefore(dayjs())) {
          setOpen(true);
          return;
        }
        navigate('/hosting/location');
      };
    return (
        <>
        <Snackbar style={{bottom:'4%'}} open={open} autoHideDuration={6000} onClose={handleClose} message="Please specify a realistic date and time"
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} />
        <Box sx={calendarStyle}>
        
        <Typography style={{ margin: '10px', marginTop: '5vh'}} >When is this event happening?</Typography>
        <Typography>{dayjs(date, "MM/DD/YYYY").format("MMMM D, YYYY")}</Typography>
        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar style={{ margin: '3px'}} value={dayjs(date, "MM/DD/YYYY")} onChange={(newDate) => setDate(newDate.format("MM/DD/YYYY"))}/>
        <TimePicker value={dayjs(time, "h:mm A")} onChange={(newTime) => setTime(newTime.format("h:mm A"))} label="meeting time"               sx={{
                input: {
                  background: "white"
                }}}/>
        <Typography style = {{margin: '3px', marginTop: '2vh', fontSize: '26px'}}>{time}</Typography>
        </LocalizationProvider>
        </Box>
        <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee",  width: "40%", marginTop: "3vh"}} onClick={() => navigate("/hosting/displayCategories") /* Previous Page*/}>Back</Button>
        <Button sx={{ fontFamily: "Arial", padding: "10px", backgroundColor: "#4e84ee", width: "40%", marginTop: "3vh"}} variant = "filled" onClick={next}>Next</Button>
        </Box>
        </>
    )
}
export default DateCreate;