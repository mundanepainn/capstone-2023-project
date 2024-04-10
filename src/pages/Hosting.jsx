/*
While we wait for the user creation process to be implemented, we will assume that the user is a male age 20, named Dane, and has interest in bread.
*/

import React, { useState, useEffect } from 'react';
import HostingCards from '../components/HostingCards';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
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
  Box
} from "@mui/material";
import Slider from "@mui/material/Slider";
import weDoLogo from '../assets/logo.svg';
import dayjs from 'dayjs';

const headerStyle = {
    margin: '40px auto 0px auto',
}

const Hosting = ()=>{
    const [user, setUser] = useState([])
    const [allActivities, setAllActivities] = useState([])
    const [activities, setActivities] = useState([])
    const userID = localStorage.getItem('userID');
    /* let activities = [
        {id: "1234", name: 'Jumping', description: 'Jumping around a campfire', location: 'the woods', date: '02/01/2009', time: '12:00 AM', ageRestrict: true, minAge: 20, maxAge: 23, genderRestrict: true, genderReq: ['Female', 'Other']},
        {id: "3421", name: 'Hiking', description: 'Exploring scenic trails', location: 'the mountains', date: '15/03/2023', time: '10:00 AM', ageRestrict: false, minAge: 0, maxAge: 99, genderRestrict: false, genderReq: []},
        {id: "3214", name: 'Cooking Class', description: 'Learning to prepare delicious dishes', location: 'a cooking school', date: '20/07/2023', time: '2:00 PM', ageRestrict: true, minAge: 18, maxAge: 60, genderRestrict: false, genderReq: []},
    ]; */
    useEffect(() => {
        async function findUser(id) {
            const res = await fetch(`https://us-central1-wedo-1a85a.cloudfunctions.net/api/testapi/users/${id}`, {
              methods: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
                const userData = await res.json();
                setUser(userData["Item"])
          }
          findUser(userID)   //this is the user's ID
    }, [])



    useEffect(() => {
        async function fetchActivities() {
        const response = await fetch("https://us-central1-wedo-1a85a.cloudfunctions.net/api/activitiesapi/", {
            methods: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const jason = await response.json();
        setAllActivities(jason)
        }
        fetchActivities();
    }, []);

    useEffect(() => {
        const filterActivities = () => {
            console.log("print", user.hostingEvents)
            let aList = []
            for (let i=0; i<allActivities.length; i++) {
                for (let j=0; j<user.hostingEvents.length; j++) {
                    if (allActivities[i].id == user.hostingEvents[j]) {
                        aList.push(allActivities[i])
                    }
                }
            }
            // console.log("Alist", aList)
            setActivities(aList)
        }
        if (user.hostingEvents && allActivities.length > 0) {
            console.log("user", user, "activities", allActivities )
            filterActivities()
        }
        
    }, [user, allActivities])


    const deleteEvent = (id) => {
        setEvents((current) => 
            current.filter((activity) =>
                activity.id != id
            )
        )
        //console.log(hostingEvents);
    }

    return(

        <>
            <TopNavBar/>

            <Box sx={headerStyle}>
            <span className="font-link" style= {{fontSize: 50}}>Hosting</span>
            </Box>

            {activities.map((activity,index)=>(
            <>
            <HostingCards key={index} activities={activity} func={() => deleteEvent(activity.id)} hostInfo={{id: user.id, dob: user.dob, gender: user.gender}}/>

            </>
            
            ))}

            <WedoNavbar />
        </>
          
    );
}

export default Hosting;