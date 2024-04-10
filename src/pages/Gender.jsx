import { Paper, TextField, Typography, Button, Grid, Box, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import { MyContext } from "./ContextManager";

const containerStyle = {
    backgroundColor: '#f5f5f5'
  }


const Gender = () => {
    const navigate = useNavigate();
    //const [gender, setGender] = React.useState("");
    //const [birthday, setBirthday] = useState(dayjs().format("DD/MM/YYYY"))
    //Context Manager variables for DOB and Gender
    const {
        birthday, setBirthday,
        userGender, setUserGender,
    } = React.useContext(MyContext);
    const today = dayjs();
    let birthdate = dayjs(birthday, "MM/DD/YYYY");
    let age = today.diff(birthdate, 'y');
    //Gender input function
    const handleChange = (event) => {
        setUserGender(event.target.value);
        console.log(userGender);
    };
    //Verifies Date of Birth. User must be above 18 with specified gender
    const validateNext = () => {

        if (today.isBefore(birthdate)) {
            alert("Please specify an appropriate date of birth");
            return;
        } else if (age < 18) {
            alert("Only people of ages 18 and above are allowed to create an account");
            return;
        } else if (userGender == "") {
            alert("Please select a gender");
        } else {
            navigate('/signup/uploadPic')
        }
    }

  return (
    <>
    <Box sx={containerStyle}>
        {/*Date of Birth input*/}
        <div style = {{margin: "0px 10px 0px 10px"}} >
        <Typography style = {{margin: "35px 30px 10px 30px"}}>What is your Date of Birth?</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <Typography>{dayjs(birthday, "DD/MM/YYYY").format("MMMM DD, YYYY")}</Typography> */}
        <DatePicker fullWidth 
                label="DOB" 
                sx={{input: {
                    background: "white"
                }}} 
                onChange={(newDate) => setBirthday(dayjs(newDate).format("MM/DD/YYYY"))}/>
        </LocalizationProvider>
        <Box></Box>
        </div>
        {/*Gender input*/}
        <div>
        <Typography style = {{margin: "30px 30px 10px 30px"}}>What is your gender?</Typography>
        <Box sx={{ minWidth: 200, margin:"0px 30px 0px 30px"}}>
            <FormControl style = {{backgroundColor: "white"}}fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select 
                    value={userGender}
                    label="Gender"
                    onChange={handleChange}
                >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            </FormControl>
        </Box>
        </div>
        {/*Page Navigation*/}
        <Button style={{margin:"20px 0px 20px 0px"}}onClick={() => navigate("/signup")}>Back</Button>
        <Button style={{margin:"20px 0px 20px 0px"}}onClick={() => validateNext()}>Next</Button>
    </Box>
    </>
  )
}

export default Gender;