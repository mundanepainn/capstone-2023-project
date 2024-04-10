import React, { useState } from "react";
import { FormControlLabel,
  Card,CardContent,Typography,Button, ButtonGroup, Dialog, 
  DialogTitle, DialogContent,DialogActions, IconButton, FormControl, 
  TextField, Box, Switch, Slider, InputLabel, Select, MenuItem,
  Autocomplete, Accordion, AccordionSummary, AccordionDetails, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, TimePicker } from  '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import Maps from "./googleMaps";


const cardStyle = {
  textAlign: "center",
  margin: 5,
  width: "90%",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800
};

const iconButtonStyle = {
    float: 'right'
}

function HostingCards({activities, func, hostInfo}) {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [open2,setOpen2] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editAge, setEditAge] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [deleteDisplay, setAlert] = useState(false);
  const [limit, setLimit] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState();
  const [currentName, setCurrentName] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [editCurrentDate, setEditCurrentDate] = useState();
  const [editCurrentTime, setEditCurrentTime] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [currentAgeText, setCurrentAgeText] = useState();
  const [currentGender, setCurrentGender] = useState();
  const [currentPrivateRes, setCurrentPrivateRes] = useState();
  const [currentDescription, setCurrentDescription] = useState();
  const [currentAgeRes, setCurrentAgeRes] = useState();
  const [currentAgeRange, setCurrentAgeRange] = useState();
  const updateArray = [0, 0, 0, 0, 0, 0, 0]
  //keeps track of changes ["name", "date&time", "location", "ageRestrict&age", "genderReq", "private", "description"]

  const genderOptions = [
    { label: 'Everyone'},
    { label: 'Male'},
    { label: 'Female'}
  ];
  const commonLocations = [
    "Computer Science Building, Auckland University",
    "Engineering Building, Auckland University",
    "Biology Building, Auckland University",
    "Food Court, Auckland University"
]
const locationStyle = {
  color : 'black',
  borderStyle : 'solid',
  borderColor : '#4e84ee',
  borderRadius: '10px',
}

const CustomFormControlLabel = styled(FormControlLabel)({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 30,
  // margin: '8px',
  // Add more custom styles here
});

  const handleClose = ()=>{
    setOpen(false);
    setOpen2(false);
    setEditOpen(false);
    setEditAge(false);
    setEditTime(false);
  };

  const handleOpen = ()=>{
    setOpen(true);
    setOpen2(false);
  };
  const handleOpen2 = ()=>{
    setOpen(false)
    setOpen2(true); 
  };
  const handleDelete = () => {
    setOpen(false)
    setOpen2(false)
    deleteActivity()
    location.reload()
  };

  const handleEdit2 = () => {
    setEditOpen(true);
    setOpen2(false);
    setEditOpen(false);
    setEditAge(false);
    setEditTime(false);
  }
  const handleEdit = () => {
    setEditOpen(true);
    handleResest();
  };

  const showAgeEdit = () => {
    setEditAge(true);
    setEditOpen(false);
  };
  const showTimeEdit = () => {
    setEditTime(true);
    setEditOpen(false);
  };
  const showLocationEdit = () => {
    setEditLocation(true);
    setEditOpen(false);
  };

  const handleEditBack = () => {
    /* if (value == "date") {              //revert back to original date & time
      setCurrentDate(activities.date)
      setCurrentTime(activities.time)
    }
    if (value == "location") {
      setCurrentLocation(activities.location)
    }
    if (value == "age") {
      setCurrentAgeRes(activities.ageRestrict)
      setCurrentAgeRange(activities.age)
    } */
    setEditOpen(true);
    setEditAge(false);
    setEditTime(false);
    console.log(editTime)
    setEditLocation(false);
    console.log("test", currentName, currentTime, currentDate, currentLocation, currentGender, currentAgeRange[0], currentAgeRange[1])
  };

  const handleResest = () => {
    setCurrentPhoto()
    setCurrentName(activities.name);
    setCurrentDate(activities.date);
    setEditCurrentDate(activities.date);
    setCurrentTime(activities.time);
    setEditCurrentTime(activities.time)
    setCurrentLocation(activities.location);
    setCurrentAgeRes(activities.ageRestrict);
    {activities.ageRestrict ? (
      setCurrentAgeText(activities.minAge + '-' + activities.maxAge)
      ):(
      setCurrentAgeText('No Age Requirement')
    )};
    setCurrentGender(activities.genderReq);
    setCurrentPrivateRes(activities.privateActivity);
    setCurrentDescription(activities.description);
    setCurrentAgeRange([activities.minAge, activities.maxAge]);
    setLimit(activities.attendeeLimit == false ? false : true)
    setAttendeeLimit(activities.attendeeLimit)
  };

  const saveChange = (value) => {
    const today = new Date()
      const dob = new Date(hostInfo.dob)
      const calculatedAge = Math.floor((today - dob) / (365 * 24 * 60 * 60 * 1000)) 
      // (calculatedAge < currentAgeRange[0] || calculatedAge > currentAgeRange[1]) 
    if (value == "age") { 
      console.log(currentAgeRange)
    // Pass through data Here *************************
    // activities.setAge(currentAgeRange);
    // activities.setAgeRes(currentAgeRes);
    {currentAgeRes ? ( calculatedAge >= currentAgeRange[0] && calculatedAge <= currentAgeRange[1] ?
      (currentAgeRange[0] == currentAgeRange[1] ? (
        setCurrentAgeText(currentAgeRange[0])
      ) : (
        setCurrentAgeText(currentAgeRange[0] + '-' + currentAgeRange[1])
      ))
     : (alert("Please select an age range that includes your age")), setCurrentAgeRange([activities.minAge, activities.maxAge])) :(
      setCurrentAgeText('No Age Requirement'))};
    setEditAge(false)
    setEditOpen(true)
    }
    if (value == "date") {
      console.log(currentDate)
      setCurrentDate(editCurrentDate)
      setCurrentTime(editCurrentTime)
      setEditTime(false)
      setEditOpen(true)
    }
  }

  const handleGender = (event) => {
    if (event.target.value == "Everyone" || event.target.value == hostInfo.gender) {
      setCurrentGender([event.target.value]);
    }
    else {
      alert("Please select a gender category which applies to you")
    }
    
  };

  const handleSlider = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCurrentAgeRange([Math.min(newValue[0], currentAgeRange[1]), currentAgeRange[1]]);
    } else {
      setCurrentAgeRange([currentAgeRange[0], Math.max(newValue[1], currentAgeRange[0])]);
    }
  };

  const testPopUp = () => {
    setEditOpen(false);
    setOpen(true);
  }

  const handleInput = () => {
    handleClose();
  }
  
  //delete button functions:
  const deleteAlert = () =>{
    setAlert(true);
  };
  const deleteCancel = () =>{
    setAlert(false);
  };
  const deleteEvent = () =>{
    func();
    deleteCancel();
  };

  async function updateActivity() {
    if (attendeeLimit < activities.attendeeID.length) {
      alert("You already have more people than that")
      return
    }
    setEditOpen(false)
    const res = await fetch(`http://localhost:9000/activitiesAPI/activities/updateActivity`, {
      method: "PUT",
      body: JSON.stringify({
            id: activities.id,
            name: currentName,
            description: currentDescription,
            category: activities.category,
            location: currentLocation,
            date: currentDate,
            time: currentTime,
            ageRestrict: currentAgeRes,
            minAge: currentAgeRange[0],
            maxAge: currentAgeRange[1],
            genderRestrict: true,
            genderReq: currentGender,
            privateActivity: currentPrivateRes,
            photoURL: activities.photoURL,
            hostID: activities.hostID,
            attendeeID: activities.attendeeID,
            hostName: activities.hostName,
            attendeeLimit: activities.attendeeLimit == "" ? activities.attendeeLimit = false : attendeeLimit
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    location.reload()
  }

  async function deleteActivity() {
    const res = await fetch(`http://localhost:9000/activitiesAPI/activities/deleteActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: activities.id,
        hostID: hostInfo.id,
        attendeeIDList: activities.attendeeID          //send json object (named jason) 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // .then((response) => response.json());
  }

  return (
  
          <Card sx={cardStyle} >
            {/* <IconButton sx={iconButtonStyle} onClick={handleOpen2}>
                <CloseIcon/>
            </IconButton> */}
            <CardContent sx={{marginTop: "2vh"}}>
              <img src={activities.photoURL} width="60%" height="60%" alt={activities.name} />
              <Typography variant="h5">{activities.name}</Typography>
              {/* <Typography>Event by: {"you"}</Typography>  */}
              <Typography>Category: {activities.category}</Typography>
              <Typography>Location: {activities.location}</Typography>
              <Typography>Date: {dayjs(activities.date, 'DD/MM/YYYY').format('MMMM D, YYYY')}</Typography>
              <Typography>Time: {activities.time}</Typography>
              {activities.ageRestrict ? (
                <Typography>
                  Ages: {activities.minAge}
                  {activities.maxAge === -1 ? <span>+</span> : <span>-{activities.maxAge}</span>}
                </Typography>
              ) : (
                <Typography>No Age Requirement</Typography>
              )}
              {activities.genderRestrict ? (
                <Typography>Gender Requirement/s: {activities.genderReq.join(", ")}</Typography>
              ) : (
                <Typography>Any Gender</Typography>
              )}
              <Typography>Attendees: {activities.attendeeID.join(", ")}</Typography>
              {!activities.attendeeLimit ? <Typography>Number of Attendees: {activities.attendeeID.length}</Typography> : <Typography>Number of Attendees: {activities.attendeeID.length}/{activities.attendeeLimit}</Typography>}
              <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}}variant="contained" onClick={handleOpen}>More</Button>
              <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}}variant="contained" onClick={handleEdit}>Edit</Button>
            </CardContent>
          

            <Dialog
              open={open}
              onClose={handleClose}
              scroll="paper"
              >
              <DialogTitle>More info</DialogTitle>

              <DialogContent dividers={true} >
              {activities.description}

              
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOpen2}>Delete</Button>
              </DialogActions>
            </Dialog>
          
          {/* delete button */}
        
            <Dialog
              open={open2}
              onClose={handleClose}
              scroll="paper"
              >
              <DialogTitle>Are you sure you want to delete </DialogTitle>

              <DialogContent dividers={true} >
              {activities.name}?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </DialogActions>
            </Dialog>
          

            {/* Main Edit Event Pop Up */}
            <Dialog
              open={editOpen}
              onClose={handleClose}
              scroll="paper"
              >
              <DialogTitle>Edit Event</DialogTitle>
              <DialogContent dividers={true} >
                <FormControl>
                  <TextField
                      required
                      id="change-activity-name"
                      label="Activity Name"
                      value={currentName}
                      onChange={(e) => setCurrentName(e.target.value)}
                  />
                  <Box sx={{borderRadius:"10px", border: "solid 1px black", marginTop: "20px", padding: "5px"}}>
                  Date: {currentDate} <br></br>
                  Time: {currentTime}
                  <IconButton type="button" onClick={showTimeEdit}>
                    <EditIcon />
                  </IconButton>
                  </Box>

                  <Box sx={{borderRadius:"10px", border: "solid 1px black", marginTop: "3px", alignItems: "center", padding: "5px"}}>
                      Location: {currentLocation}
                    <IconButton type="button" onClick={showLocationEdit}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                  

                  <Box sx={{borderRadius:"10px", border: "solid 1px black", marginTop: "3px", alignItems: "center", padding: "5px"}}>
                    Age restrict: {currentAgeText}
                    <IconButton type="button" onClick={showAgeEdit}>
                      <EditIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{borderRadius:"10px", border: "solid 1px black", marginTop: "3px", alignItems: "center", padding: "5px"}}>
                    Gender Requirement: 
                    <FormControl fullWidth sx={{marginTop:"15px", marginBottom:"15px"}}>
                      <InputLabel id="change-gender">Gender</InputLabel>
                      <Select
                        labelId="change-gender"
                        value={currentGender}
                        label="Gender"
                        onChange={handleGender}
                      >
                        <MenuItem value={"Everyone"}>Everyone</MenuItem>
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{borderRadius:"10px", border: "solid 1px black", marginTop: "3px", alignItems: "center", padding: "5px"}}>
                    Private Activity:
                    <Switch
                      checked={currentPrivateRes}
                      onChange={() => setCurrentPrivateRes(!currentPrivateRes)}
                    />
                  </Box>
                  <Accordion sx={{border:'none',boxShadow:'none'}} expanded={limit}>
                <AccordionSummary>
                <CustomFormControlLabel style={{marginLeft: '0px'}}
                  id="attendee-limit"
                  label="Max no. of people"
                  control={
                <Switch
                      
                      checked={limit}
                      onChange={() => {setLimit(!limit)}}
                    />}/>
                </AccordionSummary>

                <AccordionDetails>
                <TextField
                        sx={{marginTop:"0px"}}
                        id="attendee-limit"
                        required
                        label="Maximum number of people"
                        value={limit == true ? attendeeLimit : false}
                        onChange={(e) => setAttendeeLimit(e.target.value)}
                      />
                </AccordionDetails>
                </Accordion>
                  <TextField
                      multiline
                      required
                      rows={6}
                      id="change-description"
                      label="Description"
                      value={currentDescription}
                      onChange={(e) => setCurrentDescription(e.target.value)}
                  />
                </FormControl>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={updateActivity}>Save</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={editLocation}
              onClose={handleEditBack}
              scroll="paper"
              > 
              <DialogTitle>Edit Location</DialogTitle>
              <DialogContent dividers={true} >
              <Typography>{currentLocation}</Typography>
              <Box sx={locationStyle}>
                <Typography style={{ margin: '30px', marginTop: "4vh"}}>Where is the event happening?</Typography>
                {/* <Autocomplete style={{ margin: '20px' }}
                freeSolo
                value={currentLocation}
                onInputChange={(event, newLocation) => setCurrentLocation(newLocation)}
                options={commonLocations.map((option) => option)}
                renderInput={(params) => <TextField required {...params} label="Location"/>}
                /> */}
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  marginBottom: '20px'}}>
                <Maps />
                </Box>
              </Box>
                
                <DialogActions>
                  <Button onClick={handleEditBack}>Back</Button>
                  <Button onClick={() => {saveChange("age")}}>Save</Button>
                </DialogActions>
              </DialogContent>

            </Dialog>
            <Dialog
              open={editAge}
              onClose={handleEditBack}
              scroll="paper"
              maxWidth="xs"
              fullWidth="xs"> 
              <DialogTitle>Edit Age restriction</DialogTitle>
              <DialogContent dividers={true} >
                <Box sx={{padding:"15px",border: "solid 1px black", marginTop: "3px", alignItems: "center", borderRadius: "5px"}}>
                  Age Restrict:
                  <Switch
                      checked={currentAgeRes}
                      onChange={() => setCurrentAgeRes(!currentAgeRes)}
                    />
                </Box>

                <Box sx={{padding:"20px", border: "solid 1px black", marginTop: "3px", alignItems: "center", borderRadius: "5px"}}>
                  Age Range:
                  <Slider
                    min={18}
                    max={100}
                    value={currentAgeRange}
                    onChange={handleSlider}
                    valueLabelDisplay="auto"
                    disableSwap
                    disabled={!currentAgeRes}
                  />
                </Box>

                <DialogActions>
                  <Button onClick={handleEditBack}>back</Button>
                  <Button onClick={() => {saveChange("age")}}>Save</Button>
                </DialogActions>
              </DialogContent>

            </Dialog>
            <Dialog
              open={editTime}
              onClose={handleEditBack}
              scroll="paper"
              > 
              <DialogTitle>Edit Date and Time</DialogTitle>
              <DialogContent dividers={true} >
              <Typography>{dayjs(currentDate, "DD/MM/YYYY").format("MMMM D, YYYY")}</Typography>

              <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar style={{ margin: '3px'}} value={dayjs(editCurrentDate, "DD/MM/YYYY")} onChange={(newDate) => setEditCurrentDate(newDate.format("DD/MM/YYYY"))}/>
              <TimePicker value={dayjs(editCurrentTime, "h:mm A")} onChange={(newTime) => setEditCurrentTime(newTime.format("h:mm A"))} label="meeting time" />
              <Typography style = {{margin: '3px', marginTop: '2vh', fontSize: '26px'}}>{editCurrentTime}</Typography>
              </LocalizationProvider>
              </Box>
                
                <DialogActions>
                  <Button onClick={() => {setEditTime(false); setEditOpen(true); setEditCurrentDate(currentDate); setEditCurrentTime(currentTime)}}>Back</Button>
                  <Button onClick={() => {saveChange("date")}}>Save</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
            
            
        </Card>
  );
}

export default HostingCards;