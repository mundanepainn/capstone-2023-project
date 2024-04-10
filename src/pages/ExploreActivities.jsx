/*
While we wait for the user creation process to be implemented, we will assume that the user is a male age 20, named Dane, and has interest in bread.
*/
import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import { MyContext } from "./ContextManager";




  const ExploreActivities = ()=>{
    const [user, setUser] = useState([])
    const [allActivities, setAllActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [filtered, setFiltered] = useState([]);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
      async function findUser(id) {
        console.log("Finding user")
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
        console.log("Fetching activities")
      const response = await fetch("https://us-central1-wedo-1a85a.cloudfunctions.net/api/activitiesapi/", {
          methods: "GET",
          headers: {
          "Content-Type": "application/json",
          },
      });
      const jason = await response.json();
      // console.log(jason)
      setAllActivities(jason)
      // console.log("allactivities", jason)
      }
      fetchActivities();
  }, [user]);

  useEffect(() => {
    console.log("User", user)
      const filterActivities = () => {
          let aList = []
          const today = new Date()
          const dob = new Date(user.dob)
          const num = 365 * 24 * 60 * 60 * 1000
          const calculatedAge = Math.floor((today - dob) / num)
          try {
            
            for (let i=0; i<allActivities.length; i++) {
              // console.log("User is:", user["attendingEvents"], "and", allActivities[i].id)
              // console.log("activities", allActivities[i].minAge, allActivities[i].maxAge, allActivities[i].genderReq)
              // console.log("user", calculatedAge, user.gender)
              if( !(user["attendingEvents"].includes(allActivities[i].id)) ) {
                if (allActivities[i].minAge <= calculatedAge && allActivities[i].maxAge >= calculatedAge) {
                  if (allActivities[i].genderRestrict == true) {
                      allActivities[i].genderReq.forEach((item) => {if (item == "Everyone" || item == user.gender) {
                        aList.push(allActivities[i]) }}) 
                  } else {
                      aList.push(allActivities[i])
                  } 
              }
              }
                
          }
          } catch (error) {
            console.log(error)
            location.reload()
          }
          
          // console.log("Alist", aList)
          setActivities(aList)
          setFiltered(aList)
      }
      if (user && allActivities.length > 0) {
          // console.log("user", user, "activities", allActivities )
          filterActivities()
      }
      
  }, [user, allActivities])


    const searchActivities = (data) => {
      let filter, ul, i, aString, aList;
      aList = []
      filter = data.toLowerCase();
      ul = filtered;
      console.log(ul)
      if (ul != null) {
  
        for (i = 0; i < ul.length; i++) {
          aString = JSON.stringify(ul[i].name) + JSON.stringify(ul[i].description);
          if (aString.toLowerCase().indexOf(filter) > -1) {
            if (ul[i].name != undefined) {
              aList.push(ul[i])
            }
          }
        }
        if (aList.length > 0) {
          setActivities(aList)
        } else {
          console.log("search not found")
          setActivities([])
    
        }
      }
    };
  

    const sortActivities = (jason) => {
      let filteredActivities = filtered
      if (jason.sortValue) {
        filteredActivities = filtered.filter(activity => 
        activity.minAge >= jason.age[0] && activity.maxAge <= jason.age[1]
      ).sort((a, b) => a[jason.sortValue].localeCompare(b[jason.sortValue]));
      }
      
      if (jason.categories.length > 0) {
        filteredActivities = filteredActivities.filter(activity => jason.categories.includes(activity.category))
      }
      setActivities(filteredActivities);
    
    }
    
    /* let activities = [
        {name: 'Jumping', description: 'Jumping around a campfire', location: 'the woods', date: '01/02/2009', time: '12:00 AM', ageRestrict: true, minAge: 20, maxAge: 23, genderRestrict: true, genderReq: ['Female', 'Other']},
        {name: 'Hiking', description: 'Exploring scenic trails', location: 'the mountains', date: '03/15/2023', time: '10:00 AM', ageRestrict: false, minAge: 0, maxAge: 99, genderRestrict: false, genderReq: []},
        {name: 'Cooking Class', description: 'Learning to prepare delicious dishes', location: 'a cooking school', date: '07/20/2023', time: '2:00 PM', ageRestrict: true, minAge: 18, maxAge: 60, genderRestrict: false, genderReq: []},
        {name: 'Biking', description: 'Cycling through the city streets', location: 'downtown', date: '05/10/2023', time: '3:00 PM', ageRestrict: false, minAge: 0, maxAge: 99, genderRestrict: true, genderReq: ['Male', 'Female']},
        {name: 'Concert', description: 'Enjoy live music performances', location: 'the stadium', date: '08/30/2023', time: '7:00 PM', ageRestrict: true, minAge: 21, maxAge: 65, genderRestrict: true, genderReq: ['Male']},
        {name: 'Yoga Session', description: 'Relax and stretch your body', location: 'the park', date: '11/05/2023', time: '9:00 AM', ageRestrict: true, minAge: 18, maxAge: 99, genderRestrict: false, genderReq: []}
      ];  
 */



return(<>

<TopNavBar func={(data) => searchActivities(data)} func2={(jason) => sortActivities(jason)} />

{activities.length > 0 ? activities.map((activity,index)=>(


<Cards key={index} activities={activity} userID={user.id}/>

)


) : <p>Search not found</p>}

<WedoNavbar/>

</>);

};


export default ExploreActivities;