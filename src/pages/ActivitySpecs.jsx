import React, { useState } from "react";
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

const CustomFormControlLabel = styled(FormControlLabel)({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 50,
  // Add more custom styles here
});

const CustomSelect = styled(Select)({
  maxWidth: 300,
  minWidth: 200,
  "& .MuiSelect-menu": {
    maxHeight: "200px",
  },
});

const ActivitySpecs = () => {
  const navigate = useNavigate();
  const {
    options,
    gender,
    setGender,
    age,
    setAge,
    activityName,
    setActivityName,
    activityDescription,
    setActivityDescription,
    privateActivity,
    setPrivateActivity,
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
    if (!activityName || gender.length === 0 || !activityDescription) {
      alert("Please fill out all required fields");
      return;
    }

    // Handle form submission here
    console.log(privateActivity);
    navigate('/hosting/confirmation');
  };

  return (
    <FormControl id="specs-form" fullWidth style={{ gap: 40 }}>
      <TextField
        id="activity-name"
        required
        label="Activity Name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <CustomFormControlLabel
        id="age-range"
        label="Age Range"
        control={
          <Slider
            min={18}
            max={100}
            value={age}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        }
      />
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
                return <em>Placeholder</em>;
              }
              return selected.join(", ");
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
      />
      <CustomFormControlLabel
        id="private-choice"
        label="Private Activity"
        control={
          <Switch
            required
            checked={privateActivity}
            onChange={() => setPrivateActivity(!privateActivity)}
          />
        }
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      />
      <TextField
      id="activity-description"
        required
        multiline
        rows={6}
        label="Activity Description"
        value={activityDescription}
        onChange={(e) => setActivityDescription(e.target.value)}
      />
      <Button id="submit-button" variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </FormControl>
  );
};

export default ActivitySpecs;
