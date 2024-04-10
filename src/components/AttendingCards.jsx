import React, { useState } from "react";
import { Card,CardContent,Typography,Button, ButtonGroup, Dialog, DialogTitle, DialogContent,DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const cardStyle = {
  textAlign: "center",
  margin: 5,
  width: "90%",
  justifyContent: "center",
  alignItems: "center",
  // padding: "20px",
  maxWidth: 800
};

function Cards({ activities, userID }) {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [open2,setOpen2] = useState(false);
  const [open3,setOpen3] = useState(false);

  const handleClose = ()=>{
    setOpen(false);
    setOpen2(false)
    setOpen3(false)
  };
  const handleOpen1 = ()=>{
      setOpen(true); 
  };
  const handleOpen2 = ()=>{
    setOpen(false)
    setOpen2(true); 
};
  const handleOpen3 = ()=>{
    setOpen(false)
    setOpen3(true); 
  };
  const handleLeave = () => {
    console.log("testtest", activities.id, userID, "test")
    const jason = {
      "activityID": activities.id,
      "userID": userID
    }
    setOpen2(false)
    leaveActivity(jason)
    location.reload()

  }
  const handleDelete = () => {
    setOpen3(false)
    deleteActivity()

  }

  async function leaveActivity(jason) {
    const res = await fetch(`http://localhost:9000/activitiesAPI/activities/leaveActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: jason.activityID,
        userID: jason.userID
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  async function deleteActivity() {
    const res = await fetch(`http://localhost:9000/activitiesAPI/activities/deleteActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: activities.id,
        hostID: "299",
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
            <CardContent sx={{marginTop: "2vh"}}>
              <img src={activities.photoURL} width="60%" height="60%" alt={activities.name} />
              <Typography variant="h5">{activities.name}</Typography>
              <Typography>Event by: {activities.hostID == "299" ? "You" : activities.hostName}</Typography>
              <Typography>Category: {activities.category}</Typography>
              <Typography>Location: {activities.location}</Typography>
              <Typography>Date: {dayjs(activities.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}</Typography>
              <Typography>Time: {activities.time}</Typography>
              {activities.ageRestrict ? (
                <Typography>
                  Ages: {activities.minAge}
                  {activities.maxAge === -1 ? <span>+</span> : <span>-{activities.maxAge}</span>}.
                </Typography>
              ) : (
                <Typography>No Age Requirement.</Typography>
              )}
              
              {activities.genderRestrict ? (
                <Typography>Gender Requirement/s: {activities.genderReq != "" ? activities.genderReq.join(", ") : "None"}.</Typography>
              ) : (
                <Typography>Any Gender</Typography>
                
              )}
              <Typography>Attendees: {activities.attendeeID.join(", ")}</Typography>
              {!activities.attendeeLimit ? <Typography>Number of Attendees: {activities.attendeeID.length}</Typography> : <Typography>Number of Attendees: {activities.attendeeID.length}/{activities.attendeeLimit}</Typography>}
            <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}} variant="contained" onClick={handleOpen1}>More</Button>
            <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}} variant="contained" onClick ={activities.hostID == "299" ? handleOpen3 : handleOpen2} >Leave</Button>
            </CardContent>
            {/* <ButtonGroup sx={{margin:3}}> */}
            
            {/* </ButtonGroup> */}

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
          <Button onClick={handleClose}>return</Button>
          <Button onClick={activities.hostID == "299" ? handleOpen3 : handleOpen2}>Leave</Button>
        </DialogActions>
            </Dialog>

            <Dialog
            open={open2}
            onClose={handleClose}
            scroll="paper"
            >
              <DialogTitle>Do you want to leave </DialogTitle>

            <DialogContent dividers={true} >
            {activities.name}?
            </DialogContent>
            <DialogActions>
          <Button onClick={handleClose}>return</Button>
          <Button onClick={handleLeave}>Leave</Button>
        </DialogActions>
            </Dialog>
            
            <Dialog
            open={open3}
            onClose={handleClose}
            scroll="paper"
            >
              <DialogTitle>This is your event </DialogTitle>

            <DialogContent dividers={true} >
            Delete {activities.name}?
            </DialogContent>
            <DialogActions>
          <Button onClick={handleClose}>return</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
            </Dialog>
          </Card>
      
  );
}

export default Cards;
