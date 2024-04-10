import React, { useState } from "react";
import {
  FormControlLabel,
  Card, CardContent, Typography, ButtonGroup, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton, FormControl,
  TextField, Box, Switch, Slider, InputLabel, Select, MenuItem,
  Autocomplete, Accordion, AccordionSummary, AccordionDetails, Grid,
  Divider, List, ListItem, ListItemButton, ListItemText, ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, TimePicker } from '@mui/x-date-pickers';
import EditIcon from '@mui/icons-material/Edit';
import styled from "styled-components";
import Maps from "./googleMaps";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import Button from '@mui/material-next/Button';


const cardStyle = {
  textAlign: "center",
  margin: 1,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  borderRadius: "10px"
};

const HostingCards = ({ activities, func, hostInfo, updateActivities }) => {
  const base_url = import.meta.env.VITE_BACKEND;

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editAge, setEditAge] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [deleteDisplay, setAlert] = useState(false);
  const [limit, setLimit] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState(false);
  const [attendeeInfo, setAttendeeInfo] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCount, setPendingCount] = useState([]);
  const [openAttendees, setOpenAttendees] = useState(false);
  const [attendeeGenders, setAttendeeGenders] = useState([])
  const [attendeeAges, setAttendeeAges] = useState([])

  //currents
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
  const [currnetRepeating, setCurrentRepeating] = useState();
  const [currentDescription, setCurrentDescription] = useState();
  const [currentAgeRes, setCurrentAgeRes] = useState();
  const [currentAgeRange, setCurrentAgeRange] = useState();
  const updateArray = [0, 0, 0, 0, 0, 0, 0]
  //keeps track of changes ["name", "date&time", "location", "ageRestrict&age", "genderReq", "private", "description"]


  const locationStyle = {
    color: 'black',
    borderStyle: 'solid',
    borderColor: '#4e84ee',
    borderRadius: '10px',
  }

  const CustomFormControlLabel = styled(FormControlLabel)({
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 30,
    // Add more custom styles here
  });

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
    setEditOpen(false);
    setEditAge(false);
    setEditTime(false);
    setOpenAttendees(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen(false)
    setOpen2(true);
  };

  const handleAttendees = (attendees, requestors) => {
    showAttendees(attendees);
    showRequestors(requestors);
    setOpenAttendees(true);
  };

  const handleDelete = (activityID) => {
    setOpen(false)
    setOpen2(false)
    deleteActivity()
    updateActivities(activityID)
  };

  const handleEdit = () => {
    setEditOpen(true);
    handleResest();
    async function getAttendeeDetails(id) {
      const res = await fetch(base_url + `/testAPI/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return await res.json();
    }
    try {
      const fetchPromises = activities.attendeeID.map((attendee) => {
        return getAttendeeDetails(attendee);
      })
      const today = new Date()
      const age = [100, 0]
      let genders = new Set();
      Promise.all(fetchPromises).then((results) => {
        results.forEach(attendee => {
          const dob = new Date(attendee.Item.dob)
          const calculatedAge = Math.floor((today - dob) / (365 * 24 * 60 * 60 * 1000))
          if (calculatedAge < age[0]) {
            age[0] = calculatedAge
          }
          if (calculatedAge > age[1]) {
            age[1] = calculatedAge
          }
          genders.add(attendee.Item.gender)
          setAttendeeAges(age)
        })
        setAttendeeGenders(Array.from(genders))
      }).catch((error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
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

  // function to kick user out
  async function kickUser(jason) {
    const res = await fetch(base_url + `/activitiesAPI/activities/leaveActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: jason.activityID,
        userID: jason.userID,
        activityName: jason.activityName
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const newList = attendeeInfo.filter((attendee) => !attendee.includes(jason.userID))
    setAttendeeInfo(newList)
    setAttendeeCount(attendeeCount - 1)
    activities.attendeeID = activities.attendeeID.filter((attendee) => attendee != jason.userID)
  };

  // function to accept or decline user to join private activities
  async function acceptOrDeclineUser(jason) {
    console.log("JASON", jason)
    const res = await fetch(base_url + `/activitiesAPI/activities/addAttendee`, {
      method: "PUT",
      body: JSON.stringify({
        activityID: jason.activityID,
        userID: jason.userID,
        activityName: jason.activityName,
        joinRequest: jason.joinRequest
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    const newList = pendingUsers.filter((user) => !user.includes(jason.userID)) //remove user from pending list
    setPendingUsers(newList.filter((user) => user != ""))
    activities.pendingUsers = newList
    if (jason.joinRequest == "accept") {
      setPendingCount(pendingCount - 1)
      setAttendeeCount(attendeeCount + 1)
      setAttendeeInfo([...attendeeInfo, jason.IDNamePic])
      activities.attendeeID = [...activities.attendeeID, jason.userID]
    }
    if (jason.joinRequest == "decline") {
      setPendingCount(pendingCount - 1)
    }
  };

  const handleEditBack = () => {
    setEditOpen(true);
    setEditAge(false);
    setEditTime(false);
    console.log(editTime)
    setEditLocation(false);
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
    {
      activities.ageRestrict ? (
        setCurrentAgeText(activities.minAge + '-' + activities.maxAge)
      ) : (
        setCurrentAgeText('No Age Requirement')
      )
    };
    setCurrentGender(activities.genderReq);
    setCurrentPrivateRes(activities.privateActivity);
    // Link repeating activity Here
    // setCurrentRepeating(activities.repeatingActivity); 
    setCurrentRepeating(false); //Delete this afterwards
    setCurrentDescription(activities.description);
    setCurrentAgeRange([activities.minAge, activities.maxAge]);
    setLimit(activities.attendeeLimit == false ? false : true)
    setAttendeeLimit(activities.attendeeLimit)
  };

  // function to save changes
  const saveChange = (value) => {
    const today = new Date()
    const dob = new Date(hostInfo.dob)
    const calculatedAge = Math.floor((today - dob) / (365 * 24 * 60 * 60 * 1000))
 
    if (value == "age") {
      console.log(currentAgeRange)

      {
        currentAgeRes ? (calculatedAge >= currentAgeRange[0] && calculatedAge <= currentAgeRange[1] ?
          (currentAgeRange[0] == currentAgeRange[1] ? (
            setCurrentAgeText(currentAgeRange[0])
          ) : (
            setCurrentAgeText(currentAgeRange[0] + '-' + currentAgeRange[1])
          ))
          : (alert("Please select an age range that includes your age"))) : (
          setCurrentAgeText('No Age Requirement'))
      };
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

  //edit gender
  const handleGender = (event) => {
    if (event.target.value == "Everyone" || event.target.value == hostInfo.gender) {
      setCurrentGender([event.target.value]);
    }
    else {
      alert("Please select a gender category which applies to you")
    }

  };

  //edit age
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

  //delete button functions:
  const deleteAlert = () => {
    setAlert(true);
  };
  const deleteCancel = () => {
    setAlert(false);
  };
  const deleteEvent = () => {
    func();
    deleteCancel();
  };

  async function findSenderPicAndName(id) {
    const res = await fetch(base_url + `/testAPI/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const senderData = await res.json();
    return { id: senderData["Item"]["id"], pic: senderData["Item"]["profilePhoto"], name: senderData["Item"]["name"] };
  }

  // function to show attendees
  async function showAttendees(attendees) {
    try {
      const fetchPromises = attendees.map((user) => {
        return findSenderPicAndName(user);
      })
      const attendeeInfoList = []
      Promise.all(fetchPromises).then((results) => {
        attendees.forEach((sender, index) => {
          attendeeInfoList.push(results[index]["id"] + "!@#$" +
            results[index]["name"].split(",").join(" ") + "$%^&" + results[index]["pic"])
        });
        setAttendeeInfo(attendeeInfoList)
        setAttendeeCount(attendeeInfoList.length)
      })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // function to show requests
  async function showRequestors(requestor) {
    try {
      const fetchPromises = requestor.map((user) => {
        return findSenderPicAndName(user);
      })
      const pendingInfoList = []
      Promise.all(fetchPromises).then((results) => {
        requestor.forEach((sender, index) => {
          pendingInfoList.push(results[index]["id"] + "!@#$" +
            results[index]["name"].split(",").join(" ") + "$%^&" + results[index]["pic"])
        });
        setPendingUsers(pendingInfoList)
        setPendingCount(pendingInfoList.length)
      })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  // function to update activity
  async function updateActivity() {
    if (attendeeLimit && attendeeLimit < activities.attendeeID.length) {
      alert("You already have more people than that")
      return
    }
    if (currentAgeRange[0] > attendeeAges[0]) {
      alert(`The youngest attendee is ${attendeeAges[0]}`)
      return
    }
    if (currentAgeRange[1] < attendeeAges[1]) {
      alert(`The oldest attendee is ${attendeeAges[1]}`)
      return
    }
    if (currentGender != "Everyone" &&
      (attendeeGenders.filter(gender => gender != "Everyone" || gender != currentGender)).length > 0) {
      alert(`You have attendees in this activity who are not ${currentGender}`)
      return
    }


    setEditOpen(false)
    const res = await fetch(base_url + `/activitiesAPI/activities/updateActivity`, {
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
        attendeeLimit: activities.attendeeLimit == "" ? activities.attendeeLimit = false : attendeeLimit,
        pendingUsers: activities.pendingUsers.length == 0 ? "" : activities.pendingUsers
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    location.reload()
  }

  // function to delete activity
  async function deleteActivity() {
    const res = await fetch(base_url + `/activitiesAPI/activities/deleteActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: activities.id,
        hostID: hostInfo.id,
        attendeeIDList: activities.attendeeID,          //send json object (named jason)
        activityName: activities.name
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return (

    <Card sx={cardStyle} >

      <CardContent sx={{ marginTop: "1vh" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <IconButton sx={{ marginRight: '20px' }} onClick={handleOpen2}>
            <ClearIcon />
          </IconButton>
        </Box>
        <img src={activities.photoURL} style={{ width: "250px", height: "250px", objectFit: 'cover', marginTop: "20px", borderRadius: '5%' }} alt={activities.name} />
        <Typography variant="h5" style={{ margin: "8.96px", fontFamily: 'Trebuchet MS' }}>{activities.name}
          <IconButton type="button" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Typography>
        <Typography>{dayjs(activities.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}, {activities.time}</Typography>
        <Typography>{activities.location}</Typography>
        <Typography>Category: {activities.category}</Typography>
        <Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => handleOpen()}>More</Button>
        <Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => handleAttendees(activities.attendeeID, activities.pendingUsers.filter((user) => user != ""))}>Attendees</Button>
      </CardContent>

      {/* dialog when "More" button is clicked */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >

        <DialogTitle>Ages Requirement:</DialogTitle>
        <DialogContent dividers={true} >
          {activities.ageRestrict ? (
            <Typography>
              {activities.minAge}
              {activities.maxAge === -1 ? <span>+</span> : <span>-{activities.maxAge}</span>}
            </Typography>
          ) : (
            <Typography>No Age Requirement</Typography>
          )}
        </DialogContent>

        <DialogTitle>Gender Requirement/s: </DialogTitle>
        <DialogContent dividers={true} >
          {activities.genderRestrict ? (
            <Typography>{activities.genderReq.join(", ")}</Typography>
          ) : (
            <Typography>Any Gender</Typography>
          )}
        </DialogContent>

        <DialogTitle>Description</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>{activities.description}</Typography>
        </DialogContent>

        <DialogActions>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
        </DialogActions>
      </Dialog>


      {/* delete button */}
      <Dialog
        open={open2}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Are you sure you want to delete "{activities.name}"?</DialogTitle>

        <Divider />
        <DialogActions dividers={true}>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { handleDelete(activities.id) }}>DELETE</Button>
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
            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "20px", padding: "5px" }}>
              Date: {currentDate} <br></br>
              Time: {currentTime}
              <IconButton type="button" onClick={showTimeEdit}>
                <EditIcon />
              </IconButton>
            </Box>

            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "3px", alignItems: "center", padding: "5px" }}>
              Location: {currentLocation}
              <IconButton type="button" onClick={showLocationEdit}>
                <EditIcon />
              </IconButton>
            </Box>


            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "3px", alignItems: "center", padding: "5px" }}>
              Age restrict: {currentAgeText}
              <IconButton type="button" onClick={showAgeEdit}>
                <EditIcon />
              </IconButton>
            </Box>

            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "3px", alignItems: "center", padding: "5px" }}>
              Gender Requirement:
              <FormControl fullWidth sx={{ marginTop: "15px", marginBottom: "15px" }}>
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

            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "3px", alignItems: "center", padding: "5px" }}>
              Private Activity:
              <Switch
                checked={currentPrivateRes}
                onChange={() => setCurrentPrivateRes(!currentPrivateRes)}
              />
            </Box>
            <Box sx={{ borderRadius: "10px", border: "solid 1px gainsboro", marginTop: "3px", alignItems: "center", padding: "5px" }}>
              Repeating Activity:
              <Switch
                checked={currnetRepeating}
                onChange={() => setCurrentRepeating(!currnetRepeating)}
              />
            </Box>
            <Accordion sx={{ border: 'none', boxShadow: 'none' }} expanded={limit}>
              <AccordionSummary>
                <CustomFormControlLabel style={{ marginLeft: '0px' }}
                  id="attendee-limit"
                  label="Max no. of people"
                  control={
                    <Switch

                      checked={limit}
                      onChange={() => { setLimit(!limit) }}
                    />} />
              </AccordionSummary>

              <AccordionDetails>
                <TextField
                  sx={{ marginTop: "0px" }}
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
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={updateActivity}>SAVE</Button>
        </DialogActions>
      </Dialog>

      {/* dialog to edit location */}
      <Dialog
        open={editLocation}
        onClose={handleEditBack}
        scroll="paper"
      >
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>{currentLocation}</Typography>
          <Box sx={locationStyle}>
            <Typography style={{ margin: '30px', marginTop: "4vh" }}>Where is the event happening?</Typography>
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Maps />
            </Box>
          </Box>

          <DialogActions>
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleEditBack}>BACK</Button>
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { saveChange("age") }}>SAVE</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

      {/* dialog to edit age */}
      <Dialog
        open={editAge}
        onClose={handleEditBack}
        scroll="paper"
        maxWidth="xs"
        fullWidth="xs">
        <DialogTitle>Edit Age restriction</DialogTitle>
        <DialogContent dividers={true} >
          <Box sx={{ padding: "15px", border: "solid 1px black", marginTop: "3px", alignItems: "center", borderRadius: "5px" }}>
            Age Restrict:
            <Switch
              checked={currentAgeRes}
              onChange={() => setCurrentAgeRes(!currentAgeRes)}
            />
          </Box>

          <Box sx={{ padding: "20px", border: "solid 1px black", marginTop: "3px", alignItems: "center", borderRadius: "5px" }}>
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
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleEditBack}>BACK</Button>
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { saveChange("age") }}>SAVE</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

      {/* dialog to edit time */}
      <Dialog
        open={editTime}
        onClose={handleEditBack}
        scroll="paper"
      >
        <DialogTitle>Edit Date and Time</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>{dayjs(currentDate, "MM/DD/YYYY").format("MMMM D, YYYY")}</Typography>

          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar style={{ margin: '3px' }} value={dayjs(editCurrentDate, "MM/DD/YYYY")} onChange={(newDate) => setEditCurrentDate(newDate.format("MM/DD/YYYY"))} />
              <TimePicker value={dayjs(editCurrentTime, "h:mm A")} onChange={(newTime) => setEditCurrentTime(newTime.format("h:mm A"))} label="meeting time" />
              <Typography style={{ margin: '3px', marginTop: '2vh', fontSize: '26px' }}>{editCurrentTime}</Typography>
            </LocalizationProvider>
          </Box>

          <DialogActions>
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { setEditTime(false); setEditOpen(true); setEditCurrentDate(currentDate); setEditCurrentTime(currentTime) }}>BACK</Button>
            <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { saveChange("date") }}>SAVE</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* dialog to see attendees of activity (and requests) */}
      <Dialog
        open={openAttendees}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Current Attendees: {!activities.attendeeLimit ? attendeeCount : attendeeCount + "/" + activities.attendeeLimit} </DialogTitle>

        <DialogContent dividers={true} >
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {attendeeInfo.map((value) => {
              const labelId = `attendees-${value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}`;
              return (
                <ListItem
                  key={value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}
                  onClick={() => { navigate(`/userProfile/${value.substring(0, value.indexOf("!@#$"))}`) }}
                  secondaryAction={activities.hostName.split(",").join(" ") ==
                    value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&")) ? null :
                    <IconButton aria-label="comment" onClick={() => kickUser(
                      {
                        activityID: activities.id,
                        userID: value.substring(0, value.indexOf("!@#$")),
                        activityName: activities.name
                      }) /*Probably replace this with ID */}>
                      <PersonRemoveAlt1Icon />
                    </IconButton>
                  }
                  disablePadding>

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar><img src={value.substring(value.indexOf("$%^&") + 4)} width="100%" height="100%" /></Avatar>
                    </ListItemAvatar>

                    <ListItemText id={labelId} primary={activities.hostName.split(",").join(" ")
                      == value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))
                      ? "You" : value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>


        <DialogTitle>Requests: ({pendingCount})</DialogTitle> {/*LEGEND=id:0,!@#$ name:!@#$+4,$%^& pic:$%^&+4*/}
        <DialogContent dividers={true} >
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {pendingUsers.map((value) => {
              const labelId = `attendees-${value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}`;
              return (
                <ListItem
                  key={value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}
                  secondaryAction={
                    <div>
                      <IconButton aria-label="comment" onClick={() => acceptOrDeclineUser({
                        activityID: activities.id,
                        userID: value.substring(0, value.indexOf("!@#$")),
                        activityName: activities.name,
                        joinRequest: "accept",
                        IDNamePic: value
                      })}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton aria-label="comment" onClick={() => acceptOrDeclineUser({
                        activityID: activities.id,
                        userID: value.substring(0, value.indexOf("!@#$")),
                        activityName: activities.name,
                        joinRequest: "decline"
                      })}>
                        <ClearIcon />
                      </IconButton>
                    </div>

                  }
                  disablePadding>

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar><img src={value.substring(value.indexOf("$%^&") + 4)} width="100%" height="100%" /></Avatar>
                    </ListItemAvatar>

                    <ListItemText id={labelId} primary={value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>



        <DialogActions>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={() => { handleClose() }}>RETURN</Button>
        </DialogActions>
      </Dialog>


    </Card>
  );
}

export default HostingCards;