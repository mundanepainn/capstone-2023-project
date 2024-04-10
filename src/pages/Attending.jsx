/*
While we wait for the user creation process to be implemented, we will assume that the user is a male age 20, named Dane, and has interest in bread.
*/

import React, {useState, useEffect} from 'react'
import AttendingCards from '../components/AttendingCards';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import { Typography, Box } from '@mui/material';
import { MyContext } from "./ContextManager";

const headerStyle = {
    margin: '40px auto 40px auto',
}

const Attending = () => {
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
                    // console.log(userData)
                    setUser(userData["Item"])
                    // console.log(user)
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
            // console.log(jason)
            setAllActivities(jason)
            // console.log(allActivities)
            }
            fetchActivities();
        }, []);

        useEffect(() => {
            const filterActivities = () => {
                let aList = []
                for (let i=0; i<allActivities.length; i++) {
                    for (let j=0; j<user.attendingEvents.length; j++) {
                        if (allActivities[i].id == user.attendingEvents[j] && !(user.hostingEvents.includes(allActivities[i].id))) {
                            aList.push(allActivities[i])
                        }
                    }
                }
                // console.log("Alist", aList)
                setActivities(aList)
                console.log("aList", aList)
            }
            if (user.attendingEvents && allActivities.length > 0) {
                console.log("user", user, "activities", allActivities )
                filterActivities()
            }
            
        }, [user, allActivities])
    



    return (
        <>

        <TopNavBar/>
        <Box sx={headerStyle}>
        <span className="font-link" style= {{fontSize: 50}}>Attending</span>
        </Box>
        {activities.map((activity,index)=>(

        <AttendingCards key={index} activities={activity} userID={userID}/>

        ))}
        <br></br>
        <WedoNavbar/>

        </>
    )
}

export default Attending;