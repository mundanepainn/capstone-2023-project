import React, { useState } from "react";
import weDoLogo from '../assets/newlogo.svg';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";

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
  fontSize: 15
}

const ChangePassword = () => {
  const base_url = import.meta.env.VITE_BACKEND;
  const [pass, setPass] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [recoveryNumber, setRecoveryNumber] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmedPass != pass) {
      alert("passwords don't match");
      return;
    }
    axios.post(base_url + "/cognito/confirmForgotPassword", { 'username': email, 'verificationCode': recoveryNumber, 'newPassword': pass }).then((response) => {

      alert("Password recovery successful !");
      navigate('/explore');

    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error(error);
      }
    });


  }
  return (<>



    <img src={weDoLogo} className="logo react" alt="React logo" />

    <Grid container justifyContent="center">
      <Box style={{ maxWidth: '300px' }}>
        <Typography variant="h5" align="center" style={{ margin: '20px' }}>Recover password</Typography>
        <form style={formsize} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Recovery number"
            variant="outlined"
            required
            sx={{
              input: {
                background: "white"
              }
            }}
            onChange={(e) => setRecoveryNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            required
            sx={{
              input: {
                background: "white"
              }
            }}
            onChange={(e) => setPass(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            onChange={(e) => setConfirmedPass(e.target.value)}
            required
            sx={{
              input: {
                background: "white"
              }
            }}

            margin="normal"
          />

          <Button style={{ margin: "15px 0px 10px 0px" }} variant="contained" color="primary" type="submit" >
            Confirm Password
          </Button>
        </form>


      </Box>
    </Grid>







  </>);

};

export default ChangePassword;