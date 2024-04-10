import React from "react";
import WedoNavbar from "../components/WedoNavbar";
import {Button, TextField, List, ListItem, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const logindiv = {
    backgroundColor: 'white',
    borderColor: '#4e84ee',
    borderRadius: '10px',
    borderStyle: 'solid',
    padding: '20px 10px',
}
const landingbutton = {
    borderColor: '#4e84ee',
    borderRadius: '5px',
    borderStyle: 'solid',
    backgroundColor: 'white',
    color: '#4e84ee',
    float: 'right',
    "&:hover":{
        backgroundColor: '#4e84ee',
        color: 'white'
    }

}

const landingTypo = {
    color: 'black'
}

function Landing() {
    const navigate = useNavigate();
    return (
        <>
        <div>
        <List sx={logindiv}>
            <ListItem>
                <TextField id="username" label="username" variant="outlined"></TextField>
            </ListItem>
            <ListItem>
                <TextField id="password" label="password" type="password" variant="outlined"></TextField>
            </ListItem>
            <ListItem>
                <Button sx={landingbutton}>Log In</Button>
            </ListItem>
        </List>
        <div>
        <Typography sx={landingTypo}>Don't have an account? <a onClick={() => navigate("/signup")}>Sign Up</a></Typography>
        </div>
        </div>
        <WedoNavbar />

        </>
    );
}
export default Landing;