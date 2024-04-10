/*
While we wait for the user creation process to be implemented, we will assume that the user is a male age 20, named Dane, and has interest in bread.
*/
import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import AdCards from '../components/AdCards'
import TopNavBar from '../components/TopNavBar';
import WedoNavbar from '../components/WedoNavbar';
import { MyContext } from "./ContextManager";
import { Fab, Box, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";




const ExploreActivities = () => {
  const base_url = import.meta.env.VITE_BACKEND;

  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const [allActivities, setAllActivities] = useState([])
  const [activities, setActivities] = useState([])
  const [filtered, setFiltered] = useState([]);
  const [adList, setAdList] = useState([{ adSite: "https://www.tiptopbakery.co.nz/our-breads/", adImg: "https://assets.woolworths.com.au/images/2010/275598.jpg?impolicy=wowcdxwbjbx&w=900&h=900", adName: "BREAD", adLocation: "638 Great South Road, Papatoetoe, Auckland 2025" }, { adSite: "https://mcdonalds.co.nz/", adImg: "https://northwestshoppingcentre.co.nz/wp-content/uploads/2018/06/McDonalds-Logo.png", adName: "MACCAS", adLocation: "268 Queen Street, Auckland 1010" }])
  const userID = localStorage.getItem('userID');
  const [userLocation, setUserLocation] = useState([]);
  const [callDistanceApi, setCallDistanceApi] = useState();
  const distanceMap = new Map();
  const apiKey = '1d1a57ecc3574518ab4f677ddd0d481f';
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();


  useEffect(() => {
    const callApi = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      var requestOptions = {
        method: 'GET',
      };
      activities.forEach((e) => {
        const splittedAddress = String(e.location).split(' ');
        var formatString = '';
        splittedAddress.forEach(e => {
          formatString += `%20${e.replace(/[^a-zA-Z0-9]+/g, '')}`;
        })

        formatString = formatString.substring(3);
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${formatString}&apiKey=${apiKey}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            const lati = result.features[0].properties.lat;
            const long = result.features[0].properties.lon;

            const apiString = `${lat},${lon}|${lati},${long}`;
            fetch(`https://api.geoapify.com/v1/routing?waypoints=${apiString}&mode=drive&apiKey=${apiKey}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(`From current location to ${e.name} is:`, result.features[0].properties.distance, "Meters");
              })
              .catch(error => console.log(e.name, error));
          })
          .catch(error => console.log(e.name, formatString, error));
      })
    }

    callApi();
  }, [callDistanceApi])



  useEffect(() => {
    async function findUser(id) {
      console.log("Finding user")
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
      console.log("Fetching activities")
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
  }, [user]);

  useEffect(() => {
    console.log("User", user)
    const filterActivities = () => {
      let aList = []
      const today = new Date()
      const dob = new Date(user.dob)
      const num = 365 * 24 * 60 * 60 * 1000
      const calculatedAge = Math.floor((today - dob) / num)
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const year = today.getFullYear();
      const dateToday = `${month}/${day}/${year}`;

      try {

        for (let i = 0; i < allActivities.length; i++) {
          if (!(user["attendingEvents"].includes(allActivities[i].id))
            && !(user["requestedActivities"].includes(allActivities[i].id))
            && allActivities[i].date >= dateToday
          ) {
            if (allActivities[i].minAge <= calculatedAge && allActivities[i].maxAge >= calculatedAge) {
              if (allActivities[i].genderRestrict == true) {
                allActivities[i].genderReq.forEach((item) => {
                  if (item == "Everyone" || item == user.gender) {
                    aList.push(allActivities[i])
                  }
                })
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

      if (activities.length > 0) {
        setCallDistanceApi(1)
      }

      setActivities(aList)
      setFiltered(aList)
    }
    if (user && allActivities.length > 0) {
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
      try {
        filteredActivities = filtered.filter(activity =>
          activity.minAge >= jason.age[0] && activity.maxAge <= jason.age[1]
        ).sort((a, b) => a[jason.sortValue].localeCompare(b[jason.sortValue]));
      } catch (error) {
        console.log(error)
      }

    }

    if (jason.categories.length > 0) {
      console.log("Test1", filteredActivities)
      filteredActivities = filteredActivities.filter(activity => jason.categories.includes(activity.category))
      console.log("Test2", filteredActivities)
    }
    setActivities(filteredActivities);

  }





  return (<>

    <TopNavBar func={(data) => searchActivities(data)} func2={(jason) => sortActivities(jason)} />
    <Box sx={{ marginTop: "4vh" }}>
      {activities.length > 0 ? (
        activities.map((activity, index) => {
          if (index % 5 === 0) {
            return (
              <React.Fragment key={index}>
                {adList.length > 0 ? (<AdCards ad={adList[index % 2]} />) : null}
                <Cards activities={activity} userID={user.id} />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <Cards activities={activity} userID={user.id} />
              </React.Fragment>
            );
          }
        })
      ) : <p>Search not found</p>}


      {/* Create Activity Fab button for activity creation*/}
      <Fab color="gray" aria-label="add" style={{ position: "fixed", right: 16, bottom: 100 }} >
        {/* Create */}
        <IconButton type="button" onClick={() => navigate("/hosting/displayCategories")} >
          <AddIcon />
        </IconButton>
      </Fab>
    </Box>
    <WedoNavbar />

  </>);

};


export default ExploreActivities;