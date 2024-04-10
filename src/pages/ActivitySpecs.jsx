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
  Button,
  Box
} from "@mui/material";
import Slider from "@mui/material/Slider";

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
  width: 'auto',
  height: 'auto',
  border: 'solid 1px black',
  borderRadius: '10px'
}

const ActivitySpecs = () => {
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
    setAttendeeLimit
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

    // Handle form submission here
    console.log(privateActivity);
    navigate('/hosting/confirmation');
  };

  const btnStyle = {
    marginBottom: "2vh",
    marginTop: "2vh"
  }
  const uploadBtnStyle = {
    border: 'solid 1px blue',
    marginTop: "2vh"
  }

  useEffect(() => {
    async function findUser(id) {
        const res = await fetch(`https://us-central1-wedo-1a85a.cloudfunctions.net/api/testapi/users/${id}`, {
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
    <Box component='img' sx={imageStyle} src={file}/>
    <Button sx={uploadBtnStyle} component='label'> Upload Image <input type="file" hidden onChange={changePic} /></Button>

    <FormControl id="specs-form" fullWidth style={{ gap: 40, height: '100%', overflow: 'hidden' }}>
      <TextField
        sx={{marginTop:5}}
        id="activity-name"
        required
        label="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />

      <Accordion sx={{border:'none',boxShadow:'none'}} expanded={ageRestrict}>
      <AccordionSummary>
      <CustomFormControlLabel style={{marginLeft: '8px'}}
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
     
      <CustomFormControlLabel
        id="gender-restriction"
        label="Gender restrictions"
        control={
          <CustomSelect 
            required
            multiple
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
          marginLeft: '8px'
        }}
      />
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
      <Accordion sx={{border:'none',boxShadow:'none'}} expanded={limit}>
      <AccordionSummary>
      <CustomFormControlLabel style={{marginLeft: '8px'}}
        id="attendee-limit"
        label="Max no. of people"
        control={
      <Switch
            
            checked={limit}
            onChange={() => {setLimit(!limit); setAttendeeLimit("")}}
          />}/>
      </AccordionSummary>

      <AccordionDetails>
      <TextField
              sx={{marginTop:5}}
              id="attendee-limit"
              required
              label="Maximum number of people"
              value={attendeeLimit}
              onChange={(e) => setAttendeeLimit(e.target.value)}
            />
      </AccordionDetails>
      </Accordion>
      
      <TextField
      id="activity-description"
        required
        multiline
        rows={6}
        label="Activity Description"
        value={activityDescription}
        onChange={(e) => setActivityDescription(e.target.value)}
      />
      
      {/* <Button style={{width: '50%', margin: 'auto'}} id="submit-button" variant="contained" color="primary" onClick={handleSubmit}> */}
        {/* Submit */}
      {/* </Button> */}
    </FormControl>
    <div style={{display:"flex"}}>
      <Button sx={btnStyle} onClick={() => navigate("/") /* Previous Page*/}>Back</Button>
      <Button sx={btnStyle} onClick={handleSubmit}>Next</Button>
    </div>
    </>
  );
};

export default ActivitySpecs;
