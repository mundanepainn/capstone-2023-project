import React, { useState } from "react";
import weDoLogo from '../assets/newlogo.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography, Box } from "@mui/material"; // Import Material-UI components
import { MyContext } from "./ContextManager";
const formsize = {
    margin: '0px auto 0px auto',
  }

const signupbtn = {
    fontSize: 12.5,
    borderRadius: '5px',
    "&:hover":{
        backgroundColor: '#4e84ee',
        color: 'white'
    }
}

const landingTypo = {
    color: 'black',
    // margin: '10px', 
    fontSize: 15
}

const SignUp = () => {
  const base_url = import.meta.env.VITE_BACKEND;

  const {
    userName, setUserName,
    email, setEmail,
    userID, setUserID
  } = React.useContext(MyContext);
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');



  const handleSignUp = (e) => {
    setUserName(fname + "," + lname)
    e.preventDefault(); // Prevent the default form submission
   

        axios.post(base_url + "/cognito/signUp",{
        "username":email,
        "password": pass
        

        }).then((response) => {
            console.log(response);
            navigate("/signup/gender"); // Navigate to the User Creation Page
      
          }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
              alert(error.response.data.message);
            } else {
              alert(error.response.data);
            }
          });
   
    
  };

  return (
    <>
      <img src={weDoLogo} className="logo react" alt="React logo" />

      <Grid container justifyContent="center">
        <Box style={{ maxWidth: '300px'}}>
          <Typography variant="h5" align="center" style={{margin:'20px'}}>Sign Up</Typography>
          <form style={formsize} onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              sx={{
                input: {
                  background: "white"
                }}}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={pass}
              sx={{
                input: {
                  background: "white"
                }}}
              onChange={(e) => setPass(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={fname}
              sx={{
                input: {
                  background: "white"
                }}}
              onChange={(e) => setFName(e.target.value.trim())}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lname}
              sx={{
                input: {
                  background: "white"
                }}}
              onChange={(e) => setLName(e.target.value.trim())}
              margin="normal"
            />
            <Button style={{width:'100%', margin: "15px 0px 10px 0px"}} variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
          <Button
            className="link-btn"
            onClick={() => navigate("/landing")}
            fullWidth
          ></Button>
        <div>
        <Typography sx={landingTypo}>
          Already have an account? {' '}
          <a onClick={() => navigate('/landing')}>
            <Button sx={signupbtn}>Log in</Button>
          </a>
        </Typography>
        </div>
        </Box>
      </Grid>
    </>
  );
};

export default SignUp;
