import React from "react";
import { Typography, Box, Button, Snackbar } from "@mui/material";
import { LocalizationProvider, DateCalendar, TimePicker } from  '@mui/x-date-pickers';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";

const calendarStyle = {
    color : 'black'
    
}

const btnStyle = {
    marginBottom: "2vh",
    padding: "0 px",
    marginRight: "1vh",
    marginLeft: "1vh",
    marginTop: "3.5vh"
}

function DateCreate() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const {
        date,
        setDate,
        time,
        setTime
      } = React.useContext(MyContext);

    const handleClose = (event, reason) => {
      if (reason == 'clickaway') {
        return;
      }
      setOpen(false);
    }
    
    const next = () => {
        const dateTime = dayjs(date + " " + time, "DD/MM/YYYY h:mm A");
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
        <Typography>{dayjs(date, "DD/MM/YYYY").format("MMMM D, YYYY")}</Typography>
        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar style={{ margin: '3px'}} value={dayjs(date, "DD/MM/YYYY")} onChange={(newDate) => setDate(newDate.format("DD/MM/YYYY"))}/>
        <TimePicker value={dayjs(time, "h:mm A")} onChange={(newTime) => setTime(newTime.format("h:mm A"))} label="meeting time"               sx={{
                input: {
                  background: "white"
                }}}/>
        <Typography style = {{margin: '3px', marginTop: '2vh', fontSize: '26px'}}>{time}</Typography>
        </LocalizationProvider>
        </Box>
        <Button sx={btnStyle} onClick={() => navigate("/hosting/displayActivities") /* Previous Page*/}>Back</Button>
        <Button sx={btnStyle} onClick={next}>Next</Button>
        </Box>
        </>
    )
}
export default DateCreate;