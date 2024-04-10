import React, { createContext, useContext, useState } from 'react';
import { MyContext } from "./ContextManager";
import { Typography,Button , Paper} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const ConfirmActivity = ()=>{
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BACKEND;

  const [genderRestriction, setGenderRestriction] = useState(false);
  const [ageRestriction, setAgeRestriction] = useState(false);
    const {
        options,
        name,
        setName,
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
        date,
        setDate,
        location,
        setLocation,
        time,
        setTime,
        photoURL,
        setPhotoURL,
        attendees,
        setAttendees,
        review,
        setReview,
        userID,
        setUserID,
        userName,
        attendeeLimit
      } = React.useContext(MyContext);

      async function addActivity() {
        const idString = crypto.randomUUID();
        let genderRestrict = false
        let ageRestrict = false
        if (gender.includes("Everyone")) {
          genderRestrict = false
        } else {
          genderRestrict = true
        }
        if (age[0] === 18 && age[1] === 100) {
          ageRestrict = false
        } else {
          ageRestrict = true
        }
        await fetch(base_url + "/activitiesAPI/activities", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            id: idString,
            name: activityName,
            description: activityDescription,
            category: activityCategory,
            location: location,
            date: date,
            time: time,
            ageRestrict: ageRestrict,
            minAge: age[0],
            maxAge: age[1],
            genderRestrict: genderRestrict,
            genderReq: gender,
            privateActivity: privateActivity,
            photoURL: photoURL,
            hostID: localStorage.getItem('userID'),
            attendeeID: localStorage.getItem('userID'),
            hostName: localStorage.getItem('name'),
            attendeeLimit: parseInt(attendeeLimit),
            pendingUsers: "",
            cost: "free"
            }),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      }

      const btnStyle = {
        marginBottom: "2vh",
        margin: "5px"
      }

    return(<>
    {/* Just a simple card to display information, uses context variables*/}
   <div id='paper-content'>

   <Paper  elevation={3} sx={{ padding: '40px',margin:4}}>
        <Typography variant="h6" sx={{fontFamily: 'Trebuchet MS', marginBottom:3, borderBottom:'solid',borderBottomWidth:'100%' }}><strong>{activityName}</strong></Typography>
        <Typography variant="body1" sx={{margin:2}}>Category: {activityCategory}</Typography>
        <Typography variant="body1" sx={{margin:2}}>Date: {dayjs(date, 'MM/DD/YYYY').format('MMMM DD, YYYY')}</Typography>
        <Typography variant="body1" sx={{margin:2}}>Time: {time}</Typography>
        <Typography variant="body1" sx={{margin:2}}>Location: {location}</Typography>
        <Typography variant="body1 " sx={{margin:2}}>Gender: {gender.join(",")}</Typography>
        <Typography variant="body1" sx={{margin:2}}>Age range: {age[0]} - {age[1]}</Typography>
        <Typography variant="body1" sx={{margin:2}}>
          Private Activity: {privateActivity.toString()}
        </Typography>
        <Typography variant="body1" sx={{margin:2}} >Activity Description: {activityDescription}</Typography>
        
    </Paper>
    </div>
    <div>
    <Button sx={btnStyle} variant="outlined" startIcon={<EditIcon />} onClick={() => navigate("/hosting/displayCategories")}>Edit</Button>

    <Button variant="contained" sx={btnStyle} onClick={() => {addActivity(); navigate('/');}}>Confirm Activity</Button>
    </div>
    
    </>);
};
export default ConfirmActivity;