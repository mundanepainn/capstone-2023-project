import React, { useState, useEffect } from "react";
import {
  Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating, List, ListItem, ListItemButton, ListItemText, ListItemAvatar,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from '@mui/material-next/Button';

const cardStyle = {
  textAlign: "center",
  margin: '15px 0px 15px 0px',
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  borderRadius: "10px"
};

const AttendingCards = ({ activities, userID, pendingRequest, updateActivities }) => {
  const base_url = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [attendeeNames, setAttendeeNames] = useState([])
  const [todayDate, setTodayDate] = useState([])
  const [reviewContent, setReviewContent] = useState([])
  const [reviewStars, setReviewStars] = useState(2.5)
  const [attendeeInfo, setAttendeeInfo] = useState([]);
  const [attendeeCount, setAttendeeCount] = useState([]);


  useEffect(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0'); //set Today's date
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const dateToday = `${month}/${day}/${year}`;
    setTodayDate(dateToday)

  }, [])

  const handleClose = () => {
    setOpen(false);
    setOpen2(false)
    setOpen3(false)
  };
  const handleOpen = (attendees) => {
    showAttendees(attendees)
    setOpen(true);
  };
  const handleOpen2 = () => {
    setOpen(false)
    setOpen2(true);
  };
  const handleOpen3 = () => {
    setOpen(false)
    setOpen3(true);
    handleLeave()
  };
  const handleLeave = () => {
    const jason = {
      "activityID": activities.id,
      "userID": userID,
      "activityName": activities.name
    }
    setOpen2(false)
    leaveActivity(jason)
    location.reload()
    
  }
  const handlePost = (jason) => {
    setOpen3(false)
    postReview(jason)
    updateActivities(jason.activityID)
  }

  async function findSenderPicAndName(id) {   //get the picture and name of an attendee
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
        attendees.forEach((sender, index) => {      //for each attendee, push a string of id, name and picture concatenated
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


  // function to leave activity
  async function leaveActivity(jason) {
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
  }

  async function postReview(jason) {      //posting a review
    const reviewerPicAndName = await findSenderPicAndName(userID)
    const idString = crypto.randomUUID();
    await fetch(base_url + `/reviewsAPI/reviews`, {
      method: "POST",
      body: JSON.stringify({
        id: idString,
        reviewee: jason.reviewee,
        reviewer: reviewerPicAndName.name.split(",").join(" "),
        reviewContent: jason.reviewContent,
        rating: jason.stars,
        reviewerPic: reviewerPicAndName.pic,       //send json object (named jason),
        reviewDate: todayDate
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

  }
  return (

    <Card sx={cardStyle} >
      {/* cards to show activities */}
      <CardContent sx={{ marginTop: "2vh" }}>
        {pendingRequest ? (<Typography style={{ marginBottom: '10px' }} variant="h6">Pending</Typography>) : null}
        {new Date(activities.date) < new Date(todayDate) ? <Typography>This event has finished. Leave a review</Typography> : null}
        <img src={activities.photoURL} marginTop="50px" style={{ width: "250px", height: "250px", objectFit: 'cover', objectPosition: 'center', borderRadius: '5%' }} alt={activities.name} />
        <Typography variant="h5" style={{ margin: "8.96px", fontFamily: 'Trebuchet MS' }}>{activities.name}</Typography>

        <Typography>{dayjs(activities.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}, {activities.time}</Typography>
        <Typography>{activities.location}</Typography>
        <Typography>Category: {activities.category}</Typography>
        <Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={() => (handleOpen(activities.attendeeID))}>More</Button>
        {pendingRequest ? null :
          (<Button style={{ margin: "40px 5px 10px 5px", width: "40%", maxWidth: 150, backgroundColor: "#4e84ee", fontFamily: "Arial" }} variant="filled" onClick={new Date(activities.date) < new Date(todayDate) ? handleOpen3 : handleOpen2} >{new Date(activities.date) < new Date(todayDate) ? "Review" : "Leave"}</Button>)
        }
      </CardContent>


      {/* dialog pop up when "more" button is clicked */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>More info</DialogTitle>

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
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>RETURN</Button>
          {/* handleOpen3 is for leaving a review. The review is optional but clicking this will cause user to leave, 
          but opens a review box*/}
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={new Date(activities.date) < new Date(todayDate) ? handleOpen3 : handleOpen2}>{new Date(activities.date) < new Date(todayDate) ? "REVIEW" : "LEAVE"}</Button>
        </DialogActions>
      </Dialog>


      {/* dialog popup when "leave" button is clicked */}
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
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
          <Button sx={{ fontFamily: "Arial", padding: "10px", color: "#4e84ee" }} onClick={handleLeave}>LEAVE</Button>
        </DialogActions>
      </Dialog>


      {/* dialog to leave a review */}
      <Dialog
        open={open3}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>Leave a review for {activities.name.split(",").join(" ")}</DialogTitle>

        <DialogContent dividers={true} >
          <Rating id="review-stars" defaultValue={reviewStars} value={reviewStars} onChange={(e) => setReviewStars(e.target.value)} />

          <TextField style={{ backgroundColor: "white", width: "100%", height: "200px" }}
            id="review-content"
            required
            multiline
            rows={6}
            label="Review Content"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontFamily: "Arial", padding: "10px 12px 10px 12px", color: "#4e84ee" }} onClick={handleClose}>CANCEL</Button>
          <Button sx={{ fontFamily: "Arial", padding: "10px 12px 10px 12px", color: "#4e84ee" }} onClick={() => { handlePost({ activityID: activities.id, reviewee: activities.hostID, reviewContent: reviewContent, stars: reviewStars }) }}>POST</Button>
        </DialogActions>
      </Dialog>
    </Card>

  );
}

export default AttendingCards;