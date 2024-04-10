import { Padding } from '@mui/icons-material';
import { Typography, Paper, Chip, Button, Box} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from "./ContextManager";

const containerStyle = {
    // border: 'solid #4e84ee',
    // borderRadius: '10px',
    maxWidth: "300px",
    backgroundColor:"#f5f5f5"
}
const selectedChipStyle = {
    backgroundColor: '#9977ea'
}
const chipStyle = {
    backgroundColor: 'white',
    margin: "5px"
}

const Interests = () => {
    const options = ["Sports", "Outdoor", "Social", "Gaming", "Movies", "Technology", "Art & Creativity", "Competitive",
                    "Nature", "Mind & Body Wellness", "History & Culture", "Language", "Science", "Food", "Self Improvement",
                    "Adventure" 
    /* The following are a list of specific interests "Exercise", "Coffee", "Learning", "Programming", "Reading", "Painting", "Knitting", "Woodworking",
    "Te Reo Maori", "Archery", "Meditation", "Paintball", "Airsoft", "Basketball", "Football",
    "Playing music", "Poetry", "Cooking", "Baking", "Gardening", "Hiking", "Photography", "Board games",
    "Volunteering", "Martial Arts", "Astronomy", "Pottery", "Ceramics", "Sculpting", "Rock Climbing", "Fishing",
    "Scuba Diving", "Snorkeling", "Improv", "Horseback Riding", "Surfing", "Swimming", "Ice Skating", "Skateboarding",
    "Story Telling", "Marathon Training", "Triathlon", "Trivia Nights", "Badminton", "Karaoke", "Bonsai", "Wine Tasting", 
    "Beer Crafting"  */
    ]
    //const [interests, setInterests] = useState([])
    const {
        userName, setUserName,
        email, setEmail,
        handle, setHandle,
        birthday, setBirthday,
        userGender, setUserGender,
        userPic, setProfilePic,
        interests, setInterests
    } = React.useContext(MyContext);
    const navigate = useNavigate();

    const handleAddUser = () => {
        addUser(interests)
    }

    async function addUser(userInterests) {

    const idString = crypto.randomUUID();
    await fetch("https://us-central1-wedo-1a85a.cloudfunctions.net/api/testapi/users", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: email,
        name: userName,
        email: email,
        dob: birthday,
        gender: userGender,
        interests: userInterests,
        profilePhoto: userPic,
        attendingEvents: "",
        hostingEvents: ""
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    navigate('/explore')
  }


    const addInterest = (interest) => {
        if (interests.includes(interest) == false) {
        setInterests((current) => [...current, interest])
        }
        else {
            deleteInterest(interest)
        }
    }
    const deleteInterest = (interest) => {
        setInterests((current) => 
            current.filter((option) =>
                option != interest
            )
        )
    }
    return (
        <>
        <Box sx={containerStyle}>
        <Typography style = {{margin: "30px 0px 0px 0px"}}variant='h5'>What are your interests?</Typography>
        <Typography>Your current interests:</Typography>
        <Box>
        {interests.map((hob) => (
            <>
            <Chip sx={chipStyle} label={hob} onDelete={() => deleteInterest(hob)}/>
            </>
        ))}
        </Box>
        
        <Typography>Available interests:</Typography>
        <Box>
        {options.map((option) => (
            <>
            {interests.includes(option)? <Chip sx={selectedChipStyle} label={option} onClick={() => addInterest(option)}/> : <Chip sx={chipStyle} label={option} onClick={() => addInterest(option)}/>}
            </>
        ))}
        </Box>
        <Box>
            <Button style={{margin:"20px 0px 20px 0px"}}onClick={() => navigate('/signup/uploadPic')}>Back</Button>
            <Button style={{margin:"20px 0px 20px 0px"}}onClick={handleAddUser}>Next</Button>
        </Box>
        </Box>
        </>
    )
}

export default Interests