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
  maxWidth: 800
};

function Cards({ activities, userID }) {
  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [openAttend, setOpenAttend] = useState(false);

  const handleClose = ()=>{
    setOpen(false);
    setOpenAttend(false);
  };
  const handleOpen = ()=>{
    setOpen(true);
  };

  const handleAttend = () => {
    if (activities.attendeeLimit == activities.attendeeID.length) {
      alert("This activity has reached the maximum number of participants")
      return
    }
    if (activities.privateActivity) {
      alert("A request has been sent to the host")
      return
    }
    const jason = {
      "activityID": activities.id,
      "userID": userID
    }
    setOpen(false)
    setOpenAttend(true);
    joinActivity(jason)
    location.reload()



  }

  async function joinActivity(jason) {
    const res = await fetch(`http://localhost:9000/activitiesAPI/activities/addAttendee`, {
      method: "PUT",
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
  return (
  
          <Card sx={cardStyle} >
            <CardContent sx={{marginTop: "2vh"}}>
              <img src={activities.photoURL} width="60%" height="60%" alt={activities.name} />
              <Typography variant="h5">{activities.name}</Typography>
              <Typography>Event by: {activities.hostName}</Typography>
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
            <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}} variant="contained" onClick={handleOpen}>More</Button>
            <Button style={{margin:"40px 5px 10px 5px", width: "30%", maxWidth: 150}} variant="contained" onClick ={handleAttend} >Attend</Button>
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
          <Button onClick={handleClose}>return</Button>
          <Button onClick={handleAttend}>Attend</Button>
        </DialogActions>
            </Dialog>

              {/* dialog for attend */}
            <Dialog
            open={openAttend}
            onClose={handleClose}
            scroll="paper"
            >
              <DialogTitle sx={{justifyContent: "center", alignItems: "center"}}>You're In!</DialogTitle>
            <DialogActions>
          <Button onClick={handleClose}>return</Button>
        </DialogActions>
            </Dialog>
          </Card>
      
  );
}

export default Cards;
