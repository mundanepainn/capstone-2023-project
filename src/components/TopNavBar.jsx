import React, { useState } from "react";
import {
  Badge, ToggleButton, ToggleButtonGroup, FormControlLabel,
  FormControl, FormLabel, Slider, AppBar, Toolbar, TextField, Avatar, InputBase,
  IconButton, Paper, Divider, Button, ButtonGroup,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Accordion, AccordionSummary, AccordionDetails,
  Switch, Box, Chip, RadioGroup, Radio
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from '@mui/icons-material/Tune';
import styled from "styled-components";
import weDoLogo from '../assets/newlogo.svg';
import { MyContext } from "../pages/ContextManager";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const TopNavBar = (props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("")
  const [age, setAge] = useState([18, 100])
  const [ageRestrict, setAgeRestrict] = useState(false);
  const [sortValue, setSortValue] = React.useState('web');
  const [categories, setCategories] = useState([]);

  const CustomFormControlLabel = styled(FormControlLabel)({
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 30
    // Add more custom styles here
  });

  const options = ["Sports", "Outdoor", "Socialising", "Learning", "Travel", "Entertainment", "Gaming", "Movies", "Technology", "Art", "Competitive",
    "Nature", "Mind & Body Wellness", "History & Culture", "Language", "Science", "Food", "Self Improvement",
    "Adventure"]

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enterPress = (event) => {
    if (event.key === "Enter") {
      props.func(text);
    }
  }

  const handleChange = (event, newRange) => {
    setAge(newRange);
  };

  const handleChange2 = (event, newSortValue) => {
    setSortValue(newSortValue);
  };

  // filter by category function
  const addInterest = (interest) => {
    if (categories.includes(interest) == false) {
      setCategories((current) => [...current, interest])
    }
    else {
      deleteInterest(interest)
    }
  }

  // delete filter by category
  const deleteInterest = (interest) => {
    setCategories((current) =>
      current.filter((option) =>
        option != interest
      )
    )
  }

  // clear all function in sort and filter popup
  const handleClearAll = () => {
    location.reload()
  }

  const selectedChipStyle = {
    backgroundColor: '#9977ea',
    margin: "3px"
  }

  const chipStyle = {
    backgroundColor: '#eaeaff',
    margin: "3px"
  }

  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ justifyContent: "space-between", top: 0, left: 0, right: 0, backgroundColor: 'white', "& > *": { margin: '0 0' }, height: "13vh", width: "auto" }} >  {/*/ last argument adds margins to all elements*/}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100%' }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img onClick={() => navigate("/")} src={weDoLogo} className="logo react" alt="React logo" style={{ cursor: "pointer", width: "12%", height: "12%", alignItems: 'center', float: "left", marginLeft: "0.5vh" }} />
          <div style={{ display: 'flex', float: 'right', alignItems: 'center' }}>

            {/* display search and sort&filter by function */}
            <Paper
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginRight: '5%' }}
            >
              <InputBase
                onKeyDown={enterPress}
                onChange={(e) => { setText(e.target.value) }}
                sx={{ padding: 0.8, alignItems: 'center' }}
                placeholder="Search Activities">
              </InputBase>

              <IconButton type="button" sx={{ p: '10px' }} onClick={() => { props.func(text); }}>
                <SearchIcon />
              </IconButton>

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <IconButton type="button" onClick={handleOpen}>
                <TuneIcon />
              </IconButton>
            </Paper>

            {/* sort and filter by popup */}
            <Dialog
              open={open}
              onClose={handleClose}
              scroll="paper"
            >
              <Box sx={{ display: 'flex', alignItems: "center", marginRight: "10px" }}>
                <DialogTitle  >Sort & Filter </DialogTitle>
                <Box sx={{ flex: "1", textAlign: "right", }}>
                  <IconButton onClick={handleClose} >
                    <CloseIcon />
                  </IconButton>
                </Box>

              </Box>

              <DialogContent dividers={true} >
                {/* Sort By Name, Date, Location*/}
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort By:</FormLabel>
                    <RadioGroup
                      value={sortValue}
                      exclusive="true"
                      onChange={handleChange2}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      style={{ marginBottom: "2vh" }}
                    >
                      <FormControlLabel value="name" control={<Radio />} label="Name" />
                      <FormControlLabel value="date" control={<Radio />} label="Date" />
                      <FormControlLabel value="location" control={<Radio />} label="Location" />

                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Filter by Category */}
                <FormLabel id="demo-row-radio-buttons-group-label">Filter By:</FormLabel>
                <Box style={{ marginTop: "1vh", marginBottom: "1vh" }}>
                  {options.map((option) => (
                    <>
                      {categories.includes(option) ? <Chip sx={selectedChipStyle} label={option} onClick={() => addInterest(option)} /> : <Chip sx={chipStyle} label={option} onClick={() => addInterest(option)} />}
                    </>
                  ))}
                </Box>

                {/* filter by age */}
                <Accordion sx={{
                  border: 'none', boxShadow: 'none', '&:before': {
                    display: 'none',
                  }
                }} expanded={ageRestrict}>
                  <AccordionSummary>
                    <CustomFormControlLabel style={{ marginLeft: '8px' }}
                      id="age-restrict"
                      label="Age restriction"
                      control={
                        <Switch

                          checked={ageRestrict}
                          onChange={() => setAgeRestrict(!ageRestrict)}
                        />} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <CustomFormControlLabel style={{ width: '100%' }}
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

              </DialogContent>
              <DialogActions sx={{ display: 'flex' }}>
                <Box sx={{ flex: '1', textAlign: "left" }}>
                  <Button sx={{ marginLeft: "1vh" }} onClick={handleClearAll}>Clear All</Button>
                </Box>
                <Button sx={{ marginRight: "1vh" }} onClick={() => { setOpen(false); props.func2({ sortValue: sortValue, age: age, categories: categories }); }}>Apply</Button>

              </DialogActions>
            </Dialog>
          </div>

        </div>
      </div>


      {/* </Toolbar> */}
    </AppBar>
  );
};

export default TopNavBar;