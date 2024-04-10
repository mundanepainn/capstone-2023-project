import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import styled from "styled-components";
import { MyContext } from "./ContextManager";
import { useNavigate } from "react-router-dom";
import {
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  Switch,
  TextField,
  Typography,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import weDoLogo from '../assets/newlogo.svg';

const Hosting = ()=>{
    return(

        <>
            <TopNavBar/>
                <p> </p>
            <WedoNavbar />
        </>
          
    );
}

export default Hosting;