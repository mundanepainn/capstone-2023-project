import React, { useState } from "react";
import {
  Card, CardContent, Typography, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, ListItemText, ListItemAvatar,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from '@mui/material-next/Button';

const cardStyle = {
  textAlign: "center",
  margin: "15px 0px 15px 0px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  borderRadius: "10px"
};

function Cards({ activities, userID }) {
  const base_url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openAttend, setOpenAttend] = useState(false);
  const [attendeeNames, setAttendeeNames] = useState([])
  const [attendeeInfo, setAttendeeInfo] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setOpenAttend(false);
  };

  const handleAttended  = () => {
    location.reload()
  }


  const handleOpen = (attendees) => {
    showAttendees(attendees)
    setOpen(true);
  };

  const handleAttend = () => {
    if (activities.attendeeLimit == activities.attendeeID.length) {
      alert("This activity has reached the maximum number of participants")
      return
    }
    const jason = {
      "activityID": activities.id,
      "userID": userID,
      "activityName": activities.name
    }
    if (activities.privateActivity) {
      console.log("true")
      alert("A request has been sent to the host")
      jason["joinRequest"] = "request"
    } else {

      setOpen(false)
      setOpenAttend(true);

    }
    joinActivity(jason)
  }


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

  // function to show activity attendees
  async function showAttendees(attendees) {
    console.log("test", attendees)
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

  // function to join activity 
  async function joinActivity(jason) {
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
  }
  return (

    <Card sx={cardStyle} >

      {/* cards to show activities */}
      <CardContent sx={{ marginTop: "2vh" }}>
        <img src={activities.photoURL} style={{ objectFit: 'cover', objectPosition: 'center', width: "250px", height: "250px", borderRadius: "5%" }} alt={activities.name} />
        <Typography variant="h5" style={{ margin: "8.96px", fontFamily: 'Trebuchet MS' }}>{activities.name}</Typography>
        <Typography>{dayjs(activities.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}, {activities.time}</Typography>
        <Typography>{activities.location}</Typography>
        <Typography>Category: {activities.category}</Typography>

        <Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => (handleOpen(activities.attendeeID))}>More</Button>
        <Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={handleAttend} >Attend</Button>
      </CardContent>



      {/* dialog pop when "More" button is clicked */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Details</DialogTitle>

        <DialogTitle>Attendees:</DialogTitle>
        <DialogContent dividers={true} >
          <Typography>{attendeeNames.join(", ")}</Typography>

          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {attendeeInfo.map((value) => {
              const labelId = `attendees-${value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}`;
              return (
                <ListItem
                  key={value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))}
                  onClick={() => { navigate(`/userProfile/${value.substring(0, value.indexOf("!@#$"))}`) }}
                  disablePadding>

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar><img src={value.substring(value.indexOf("$%^&") + 4)} width="100%" height="100%" /></Avatar>
                    </ListItemAvatar>

                    <ListItemText id={labelId} primary={userID
                      == value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))
                      ? "You" : value.substring(value.indexOf("!@#$") + 4, value.indexOf("$%^&"))} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>

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
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleAttend}>ATTEND</Button>
        </DialogActions>
      </Dialog>

      {/* dialog pop up when attend button is clicked and page refreshes after */}
      <Dialog
        open={openAttend}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle sx={{ justifyContent: "center", alignItems: "center" }}>You're In!</DialogTitle>
        <DialogActions>
          <Button sx={{ fontFamily: "Arial", color: "#4e84ee" }} onClick={handleAttended}>OK!</Button>
        </DialogActions>
      </Dialog>
    </Card>

  );
}

export default Cards;