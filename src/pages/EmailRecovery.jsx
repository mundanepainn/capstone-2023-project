import React, { useState } from "react";
import weDoLogo from '../assets/newlogo.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography, Box } from "@mui/material";

const formsize = {
  margin: '0px auto 0px auto',
}

const signupbtn = {
  fontSize: 12.5,
  borderRadius: '5px',
  "&:hover": {
    backgroundColor: '#4e84ee',
    color: 'white'
  }
}

const landingTypo = {
  color: 'black',
  // margin: '10px', 
  fontSize: 15
}

const EmailRecovery = () => {
  const base_url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // calls backend endpoint
    axios.post(base_url + "/cognito/forgotPassword", { "username": email }).then((response) => {
      alert("Please check your email for a verification code");
      //passes email to the element rendered at the "/changePass" route
      navigate("/changePass", { state: email });

    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    })


  };
  return (<>

    <img src={weDoLogo} className="logo react" alt="React logo" />

    <Grid container justifyContent="center">
      <Box style={{ maxWidth: '300px' }}>
        <Typography variant="h5" align="center" style={{ margin: '20px' }}>Recover password</Typography>
        <form style={formsize} onSubmit={handleSubmit} >
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            required
            sx={{
              input: {
                background: "white"
              }
            }}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button style={{ margin: "15px 0px 10px 0px" }} variant="contained" color="primary" type="submit" >
            Send email
          </Button>
        </form>


      </Box>
    </Grid>



  </>);


};


export default EmailRecovery;