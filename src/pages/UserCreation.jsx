/* This is a redundant page and is essentially removed from the website */

import { Paper, TextField, Typography, Button, Grid, Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";

document.body.style = 'background:#f5f5f5;';
const containerStyle = {
  backgroundColor: '#f5f5f5'
}

const UserCreation = () => {
    const navigate = useNavigate();
    //const [handle, setHandle] = useState("");
    //const [name, setName] = useState("");
    const {
      userName, setUserName,
      handle, setHandle,
    } = React.useContext(MyContext);

const validateNext = () => {

    if (userName == "") {
        alert("Please enter your name.");
    } else {
      navigate('/signup/gender')
    }
  }

  return (
    <>
    <Box sx={containerStyle}>
        <Typography style={{margin: "30px 0px 10px 0px"}}>What is your name?</Typography>
        <TextField style={{margin: "0px 30px 0px 30px"}}
              label="Name"
              variant="outlined"
              sx={{
                input: {
                  background: "white"
                }}}
              value={userName}
              onChange={(event) => setUserName(event.target.value)}/>

        <div>
        <Button style={{margin:"20px 0px 20px 0px"}}onClick={() => navigate("/signup")}>Back</Button>
        <Button style={{margin:"20px 0px 20px 0px"}}onClick={() => validateNext()}>Next</Button>
        </div>
    </Box>
    </>
  )
}

export default UserCreation