
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import AttendingCards from '../components/AttendingCards';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import { Typography, Box, Fab, IconButton } from '@mui/material';
import { MyContext } from "./ContextManager";
import AddIcon from '@mui/icons-material/Add';

const headerStyle = {
    margin: '60px auto 20px auto',
}

const Attending = () => {
    const base_url = import.meta.env.VITE_BACKEND;

    const [user, setUser] = useState([])
    const [allActivities, setAllActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [pendingActivities, setPendingActivities] = useState([])
    const [today, setToday] = useState([])
    const userID = localStorage.getItem('userID');


    useEffect(() => {
        const today = new Date()
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
        const filterActivities = () => {
            let aList = []      //for activities user is attending
            let aList2 = [] //for activities user is waiting for request
            for (let i = 0; i < allActivities.length; i++) {
                for (let j = 0; j < user.attendingEvents.length; j++) {
                    if (allActivities[i].id == user.attendingEvents[j] && !(user.hostingEvents.includes(allActivities[i].id))) {
                        aList.push(allActivities[i])
                    }
                }
                for (let k = 0; k < user.requestedActivities.length; k++) {
                    if (allActivities[i].id == user.requestedActivities[k]) {
                        aList2.push(allActivities[i])
                    }
                }
            }
            console.log("Alist", aList)
            console.log("Alist2", aList2)
            setActivities(aList.sort((a, b) => a.date.localeCompare(b.date)))
            setPendingActivities(aList2)
            console.log("aList", aList)
        }
        if (user.attendingEvents && allActivities.length > 0) {
            console.log("user", user, "activities", allActivities)
            filterActivities()
        }

    }, [user, allActivities])




    return (
        <>

            <TopNavBar />
            <Box sx={headerStyle}>
                <span className="font-link" style={{ fontSize: 50 }}>Attending</span>
            </Box>
            {/*Display attended activities*/}
            {activities.map((activity, index) => (

                <AttendingCards key={index} activities={activity} userID={userID} pendingRequest={false}
                    updateActivities={(activity) => setActivities(activities.filter(item => item.id != activity))} />
            ))}
            {/*Display activities waiting for host approval*/}
            {pendingActivities.map((activity, index) => (

                <AttendingCards key={index} activities={activity} userID={userID} pendingRequest={true} />
            ))}
            <br></br>
            <Fab color="gray" aria-label="add" style={{ position: "fixed", right: 16, bottom: 100 }} >
                {/* Create */}
                <IconButton type="button" onClick={() => navigate("/hosting/displayCategories")} >
                    <AddIcon />
                </IconButton>
            </Fab>
            <WedoNavbar />

        </>
    )
}

export default Attending;