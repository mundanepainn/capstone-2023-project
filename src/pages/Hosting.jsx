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
    Box,
    Fab,
    IconButton
} from "@mui/material";
import Slider from "@mui/material/Slider";
import weDoLogo from '../assets/logo.svg';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';

const headerStyle = {
    margin: '60px auto 20px auto',
}

const Hosting = () => {
    const navigate = useNavigate();
    const base_url = import.meta.env.VITE_BACKEND;
    const [user, setUser] = useState([])
    const [allActivities, setAllActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [todayDate, setTodayDate] = useState([])
    const userID = localStorage.getItem('userID');
    /* let activities = [
        {id: "1234", name: 'Jumping', description: 'Jumping around a campfire', location: 'the woods', date: '02/01/2009', time: '12:00 AM', ageRestrict: true, minAge: 20, maxAge: 23, genderRestrict: true, genderReq: ['Female', 'Other']},
        {id: "3421", name: 'Hiking', description: 'Exploring scenic trails', location: 'the mountains', date: '15/03/2023', time: '10:00 AM', ageRestrict: false, minAge: 0, maxAge: 99, genderRestrict: false, genderReq: []},
        {id: "3214", name: 'Cooking Class', description: 'Learning to prepare delicious dishes', location: 'a cooking school', date: '20/07/2023', time: '2:00 PM', ageRestrict: true, minAge: 18, maxAge: 60, genderRestrict: false, genderReq: []},
    ]; */
    useEffect(() => {
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0'); //set Today's date
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const dateToday = `${month}/${day}/${year}`;
        setTodayDate(dateToday)
        async function findUser(id) {
            const res = await fetch(base_url + `/testAPI/users/${id}`, {
                method: "GET",
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
            const response = await fetch(base_url + "/activitiesAPI/", {
                method: "GET",
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
        const today = new Date()
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const dateToday = `${month}/${day}/${year}`;
        const filterActivities = () => {
            let aList = []
            for (let i = 0; i < allActivities.length; i++) {
                if (allActivities[i].attendeeID.length == 1 && allActivities[i].date < todayDate) { //this will check if the activity has passed
                    const jason = {
                        activityID: allActivities[i].id, hostID: allActivities[i].hostID, //and if all attendees have left (the activity and/or a review)
                        attendeeID: allActivities[i].attendeeID, activityName: allActivities[i].name
                    } //and delete the activity from the database
                    deleteActivity(jason)
                }
                for (let j = 0; j < user.hostingEvents.length; j++) {
                    if (allActivities[i].id == user.hostingEvents[j]) {
                        aList.push(allActivities[i])
                    }
                }
            }
            // console.log("Alist", aList)
            setActivities(aList.sort((a, b) => a.date.localeCompare(b.date)))
        }
        if (user.hostingEvents && allActivities.length > 0) {
            filterActivities()
        }



        async function deleteActivity(jason) {
            const res = await fetch(base_url + `/activitiesAPI/activities/deleteActivity/`, {
              method: "DELETE",
              body: JSON.stringify({
                activityID: jason.activityID,
                hostID: jason.hostID,
                attendeeIDList: jason.attendeeID,          //send json object (named jason)
                activityName: jason.activityName 
                        
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
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

    return (

        <>
            <TopNavBar />

            <Box sx={headerStyle}>
                <span className="font-link" style={{ fontSize: 50 }}>Hosting</span>
            </Box>

            {activities.map((activity, index) => (
                <>
                    <HostingCards key={index} activities={activity} func={() => deleteEvent(activity.id)} hostInfo={{ id: user.id, dob: user.dob, gender: user.gender }}
                        updateActivities={(activity) => setActivities(activities.filter(item => item.id != activity))} />

                </>

            ))}
            <Fab color="gray" aria-label="add" style={{ position: "fixed", right: 16, bottom: 100 }} >
                {/* Create */}
                <IconButton type="button" onClick={() => navigate("/hosting/displayCategories")} >
                    <AddIcon />
                </IconButton>
            </Fab>

            <WedoNavbar />
        </>

    );
}

export default Hosting;