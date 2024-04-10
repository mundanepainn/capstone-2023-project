import React, { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
  Box
} from "@mui/material";
import Slider from "@mui/material/Slider";
import Button from '@mui/material-next/Button';

const CustomFormControlLabel = styled(FormControlLabel)({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 30,
  // margin: '8px',
  // Add more custom styles here
});

const CustomSelect = styled(Select)({
  maxWidth: 300,
  minWidth: 200,
  "& .MuiSelect-menu": {
    maxHeight: "200px",
  },
});

const imageStyle = {
  maxWidth: '300px',
  width: "300px",
  height: 'auto',
  border: 'solid 1px darkgrey',
  borderRadius: '10px',
  backgroundColor: "white",
  // padding: "20px"
}

const ActivitySpecs = () => {
  const base_url = import.meta.env.VITE_BACKEND;
  const [limit, setLimit] = useState(false);
  const[ageRestrict,setAgeRestrict] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState([])
  //const [file, setFile] = useState(weDoLogo);
	function changePic(e) {
		console.log(e.target.files);
		setFile(URL.createObjectURL(e.target.files[0]));
	}
  const {
    options,
    gender,
    setGender,
    age,
    setAge,
    activityName,
    setActivityName,
    activityCategory,
    activityDescription,
    setActivityDescription,
    privateActivity,
    setPrivateActivity,
    file,
    setFile,
    attendeeLimit,
    setAttendeeLimit,
    cost,
    setCost
  } = React.useContext(MyContext);

  const handleGender = (event) => {
    const {
      target: { value },
    } = event;  
    setGender(typeof value === "string" ? value.split(",") : value); //handles the genders allowed in activity
  };

  const handleChange = (event, newRange) => {
    setAge(newRange);
  };

  const handleSubmit = () => {
    // Validate the form fields
    const today = new Date()
    const dob = new Date(user.dob)
    const calculatedAge = Math.floor((today - dob) / (365 * 24 * 60 * 60 * 1000)) 
    if (ageRestrict && (age[0] > calculatedAge || age[1] < calculatedAge)) {
      alert("You must be within the age range");
      return;
    }
    if (!(gender.includes(user.gender)) && !(gender.includes("Everyone"))) {
      alert("You must be included in the gender requirement");
      return;
    }
    if (!activityName || gender.length === 0 || !activityDescription) {
      alert("Please fill out all required fields");
      return;
    }
    if (parseInt(cost) < 0 && cost.toLowerCase() != "free" ) {
      alert('Please enter a nonnegative cost or enter "free"');
      return
    }

    // Handle form submission here
    console.log(privateActivity);
    navigate('/hosting/confirmation');
  };

  const btnStyle = {
    marginBottom: "2vh",
    marginTop: "2vh"
  }
  const uploadBtnStyle = {
    border: 'solid 1px darkgrey',
    marginTop: "1vh",
    backgroundColor: "white",
    color: "black"
  }

  useEffect(() => {
    async function findUser(id) {
        const res = await fetch(base_url + `/testAPI/users/${id}`, {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const response = await res.json()
        setUser(response["Item"])
        console.log(response["Item"])
        let aList = []
        for (let i=0; i<response["Item"].interests.length; i++) {
            aList.push({key:i, label:response["Item"].interests[i]})
        }
      }

      findUser("299")
}, [])

  return (
    <>
    {/*Activity Photo*/}
    <Box component='img' sx={imageStyle} src={file}/>
    <Button sx={uploadBtnStyle} component='label'> Upload Image <input type="file" hidden onChange={changePic} /></Button>

    {/*Activity Name*/}
    <FormControl id="specs-form" fullWidth style={{ gap: 40, height: '100%', overflow: 'hidden' }}>
      <TextField
        sx={{marginTop:5, input: {
          background: "white"
        }
        }}
        id="activity-name"
        required
        label="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />

      <Accordion sx={{border:'none',boxShadow:'none', backgroundColor: "#f5f5f5", 
            '&:before': {
                display: 'none',
            }
         }} expanded={ageRestrict}>
      <AccordionSummary sx={{padding: 0}}>

      {/*Age Restriction*/}
      <CustomFormControlLabel style={{marginLeft: '8px', backgroundColor: "#f5f5f5"}}
        id="age-restrict"
        label="Age restriction"
        control={
      <Switch
            
            checked={ageRestrict}
            onChange={() => setAgeRestrict(!ageRestrict)}
          />}/>
      </AccordionSummary>
      <AccordionDetails>
      <CustomFormControlLabel style={{width:'100%'}}
        id="age-range"
        label="Age Range"
        control={
          <Slider
            disableSwap
            min={18}
            max={100}
            value={age}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        }
      />

      </AccordionDetails>
      </Accordion>

     {/*Gender Restriction*/}
      <CustomFormControlLabel
        id="gender-restriction"
        label="Gender restrictions"
        control={
          <CustomSelect 
            required
            multiple
            style = {{backgroundColor: "white"}}
            displayEmpty
            input={<OutlinedInput />}
            value={gender}
            onChange={handleGender}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Choose... </em>;
              }
              return selected.join(",");
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/*mapping function to add all options to dropdown, add to options varible in ContextManager to add options in drop down*/}
            {options.map((option) => ( 
              <MenuItem  key={option} id={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </CustomSelect>
        }
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: '8px',
        }}
      />

      {/*Activity Privacy*/}
      <CustomFormControlLabel
        id="private-choice"
        label="Private Activity"
        control={
          <Switch
            
            checked={privateActivity}
            onChange={() => setPrivateActivity(!privateActivity)}
          />
        }
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: '8px'
        }}
      />

      {/*Activity Repeat*/}
      <CustomFormControlLabel
        id="repeating-Activity"
        label="Repeating Activity"
        control={
          <Switch

            //Link repeating here
            checked={privateActivity}
            onChange={() => setPrivateActivity(!privateActivity)}
          />
        }
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: '8px'
        }}
      />

      {/*Attendees Limit*/}
      <Accordion sx={{border:'none',boxShadow:'none', margin: '0 0', backgroundColor: "#f5f5f5", 
            '&:before': {display: 'none', margin: '0 0'}}} 
            expanded={limit}>
        <AccordionSummary sx={{padding: 0, margin: '0 0'}}>
          <CustomFormControlLabel style={{marginLeft: '8px'}}
            id="attendee-limit"
            label="Max no. of people"
            control={
          <Switch
                checked={limit}
                onChange={() => {setLimit(!limit); setAttendeeLimit("")}}
                sx={{display: 'flex', float:'right'}}
              />}/>
        </AccordionSummary>

        <AccordionDetails sx={{padding: 0, marginLeft: '8px', marginRight: '16px'}}>
          <TextField
                  sx={{input: {
                    background: "white"
                  }, width: '100%'}}
                  id="attendee-limit"
                  required
                  label="Maximum number of people"
                  value={attendeeLimit}
                  onChange={(e) => setAttendeeLimit(e.target.value)}
                />
        </AccordionDetails>
      </Accordion>

    {/*Cost and Description*/}
      <Box sx={{textAlign: 'left', marginLeft: '8px', marginRight: '16px'}}>
      Cost:
      <br/>
          
      <TextField 
        sx={{input: {
          background: "white"
        }, width: '100%',
          marginTop: '2%'
        }}
        id="cost"
        required
        // label="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      /> 
      </Box>
            
      <Box sx={{marginLeft: '8px', marginRight: '16px', textAlign: "left"}}>
      Description:
      <br/>

      <TextField style={{backgroundColor: "white", width: '100%', marginTop: '1%'}}
        id="activity-description"
        required
        multiline
        rows={6}
        // label="Activity Description"
        value={activityDescription}
        onChange={(e) => setActivityDescription(e.target.value)}
      />

      </Box>


    {/*Navigation*/}
    <div style={{display:"flex", justifyContent: "center"}}>
      <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee",  width: "40%", marginTop: "3vh"}} onClick={() => navigate("/") /* Previous Page*/}>Back</Button>
      <Button sx={{ fontFamily: "Arial", padding: "10px", backgroundColor: "#4e84ee", width: "40%", marginTop: "3vh"}} variant = "filled" onClick={handleSubmit}>Next</Button>
    </div>
    </FormControl>
    </>
  );
};

export default ActivitySpecs;
