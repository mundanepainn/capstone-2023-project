import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authentication/Authenticate";
import WedoNavbar from "../components/WedoNavbar";
import { Button, TextField, List, ListItem, Typography, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import weDoLogo from '../assets/newlogo.svg';
import { MyContext } from "./ContextManager";


const logindiv = {
  backgroundColor: '#f5f5f5',
  padding: '10px',
}
const landingbutton = {
  width: "100%",
  margin: "auto",
  "&:hover": {
    backgroundColor: '#4e84ee',
    color: 'white'
  }

}

const landingTypo = {
  color: 'black',
  margin: '10px',
  fontSize: 15
}

const signupbtn = {
  fontSize: 12.5,
  borderRadius: '5px',
  "&:hover": {
    backgroundColor: '#4e84ee',
    color: 'white'
  }
}




function Landing() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    userID, setUserID
  } = React.useContext(MyContext);

  const { authenticate } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    //  event.preventDefault(); // Prevent the default form submission behavior
    localStorage.setItem('userID', username);
    authenticate(username, password, "/profile");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <img src={weDoLogo} className="logo react" alt="React logo" />
          <List sx={logindiv}>
            <ListItem style={{ margin: "5px 0px 5px 0px" }}>
              {/*Email field*/}
              <TextField
                id="username"
                label="Email"
                variant="outlined"
                value={username}
                sx={{
                  width: "100%",
                  input: {
                    background: "white"
                  }
                }}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </ListItem>
            <ListItem style={{ margin: "5px 0px 5px 0px" }}>
              {/*Password field*/}
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                sx={{
                  width: "100%",
                  input: {
                    background: "white"
                  }
                }}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </ListItem>
            <ListItem>
              <Button variant="contained" sx={landingbutton} onClick={handleSubmit}>
                Log In
              </Button>
            </ListItem>
          </List>
        </form>
        <div>
          <Typography sx={landingTypo}>
            {/*Signup navigation for users without account*/}
            Don't have an account?{' '}
            <a onClick={() => navigate('/signup')}>
              <Button sx={signupbtn}>Sign Up</Button>
            </a>
          </Typography>

          <Typography sx={landingTypo}>
            {/*Navigation to password recovery*/}
            Forgot your password?{' '}
            <a onClick={() => navigate('/recover')}>
              <Button sx={signupbtn}>Get new password</Button>
            </a>
          </Typography>
        </div>
      </div>

    </>
  );
}
export default Landing;