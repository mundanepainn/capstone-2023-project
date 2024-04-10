/*
TODOs: 
      - display only activities that apply to user
        - in explore (age or gender restrictions)
        - in hosting or attending events page, only events if user is in the activity's lists
      *once user system is created, test:
        - user sign up/ profile creation
        - user creates activity
        - user explores activities (only activities that apply to user, e.g. age/gender will show)
        - user joins/ leaves activities
        - user modifies an activity they are hosting
        - 

*/

import React from 'react';
import NewUserForm from "../forms/NewUserForm";
import JoinActivityForm from "../forms/JoinActivityForm";
import UpdateActivityForm from '../forms/UpdateActivityForm';
import UpdateUserForm from "../forms/UpdateUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import SortItemsForm from "../forms/SortItemsForm";
import SearchActivityForm from "../forms/SearchActivityForm";
import { useEffect, useState } from "react";
import weDoLogo from "../assets/newlogo.svg";
import RangeSearchSliderForm from "../forms/RangeSearchSliderForm"
import RangeSearchButton from "../forms/RangeSearchButton";
import { MyContext } from "./ContextManager";
import NewActivityForm from '../forms/NewActivityForm';
import LeaveActivityForm from '../forms/LeaveActivityForm';
import DeleteActivityForm from '../forms/DeleteActivityForm';


const ActivitiesTest = () => {
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
    setPhotoURL

  } = React.useContext(MyContext);
  const [test, setTest] = useState({ apiResponse: "" });
  const [search, setSearch] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [activities, setActivities] = useState([])
  const [userID, setUserID] = useState("admin2")
  

  async function addActivity(jason) {
    const base_url = import.meta.env.VITE_BACKEND;

    const idString = crypto.randomUUID();
    console.log(jason)
    await fetch(base_url+"/activitiesAPI/activities", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: idString,
        name: jason.name,
        description: jason.description,
        location: jason.location,
        date: jason.date,
        time: jason.time,
        ageRestrict: jason.ageRestrict,
        minAge: jason.minAge,
        maxAge: jason.maxAge,
        genderRestrict: jason.genderRestrict,
        genderReq: jason.genderReq,
        privateActivity: jason.privateActivity,
        photoURL: jason.photoURL,
        hostID: jason.userID,
        attendeeID: jason.userID
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((jason) => console.log(jason));
  }

  async function findActivity(id) {
    const res = await fetch(base_url + `/activitiesAPI/activities/${id}`, {
      methods: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const responseJason = await res.json();
    return responseJason["Item"];
      // .then((response) => response.json())
      // .then((response) => {console.log(response["Item"].attendeeID)})
      /* const data = await res.json();
      console.log(data["Items"][0])  */
  }

  async function joinActivity(jason) {
    const res = await fetch(base_url + `/activitiesAPI/activities/addAttendee`, {
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

  async function leaveActivity(jason) {
    const res = await fetch(base_url + `/activitiesAPI/activities/leaveActivity/`, {
      method: "DELETE",
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

  async function updateActivity(jason) {
    const res = await fetch(base_url + `/activitiesAPI/activities/updateActivity`, {
      method: "PUT",
      body: JSON.stringify({
        id: jason.activityID,
        attribute: jason.attribute,
        change: jason.change
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  /*async function deleteUser(id) {
    const res = await fetch(base_url + `/activitiesAPI/deleteActivities/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  } */


  async function deleteActivity(jason) {
    const jasonList = await findActivity(jason.activityID)    // find activity instance using activity id
    const attendeeIDList = jasonList.attendeeID               // get a list of attendees' IDs from the activity instance
    const res = await fetch(base_url + `/activitiesAPI/activities/deleteActivity/`, {
      method: "DELETE",
      body: JSON.stringify({
        activityID: jason.activityID,
        hostID: jason.hostID,
        attendeeIDList: attendeeIDList          //send json object (named jason) 
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // .then((response) => response.json());
  }
  

  function activitiesList() {
    useEffect(function effectFunction() {
      async function fetchActivities() {
        const response = await fetch(base_url + "/activitiesAPI/", {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jason = await response.json();
        console.log(jason);
        setActivities(jason);
      }
      fetchActivities();
    }, []);
    console.log(activities);
  }
  activitiesList();

  const getItems = () => {
    let htmlString = "";
    const theItems = (item) => {
      htmlString += `<li class="activityItem">
      <h5>ID: ${item.id}</h5>
      <p>Name: ${item.name}</p>
      <img src="${item.photoURL}" height="150px" width="150px" alt="Photo">
      <p>Description: ${item.description}</p>
      <p>Location: ${item.location}</p>
      <p>Date: ${item.date}</p>
      <p>Time: ${item.time}</p>
      <p>AgeRestriction: ${item.ageRestrict}</p>
      <p>Minimum Age: ${item.minAge}</p>
      <p>Maximum Age: ${item.maxAge}</p>
      <p>Gender Restriction: ${item.genderRestrict}</p>
      <p>Gender Requirement: ${item.genderReq == "" ? "" : item.genderReq.join(", ")}</p> 
      <p>Attendees: ${item.attendeeID.join(", ")}</p>
      </li>`;
    };
    if (activities.length > 0) {
      activities.forEach(theItems);
      const list = document.getElementById("activitiesList");
      list.innerHTML = htmlString;
    }
  };

  getItems();

  const sortItems = (sortValue) => {
    var sortedActivities = activities.sort((a, b) => a[sortValue].localeCompare(b[sortValue]));
    

    let htmlString = "";
    const theItems = (item) => {
      htmlString += `<li class="activityItem">
      <h5>ID: ${item.id}</h5>
      <p>Name: ${item.name}</p>
      <img src="${item.photoURL}" height="150px" width="150px" alt="Photo">
      <p>Description: ${item.description}</p>
      <p>Location: ${item.location}</p>
      <p>Date: ${item.date}</p>
      <p>Time: ${item.time}</p>
      <p>AgeRestriction: ${item.ageRestrict}</p>
      <p>Minimum Age: ${item.minAge}</p>
      <p>Maximum Age: ${item.maxAge}</p>
      <p>Gender Restriction: ${item.genderRestrict}</p>
      <p>Gender Requirement: ${item.genderReq == "" ? "" : item.genderReq.join(", ")}</p> 
      <p>Attendees: ${item.attendeeID.join(", ")}</p>
      </li>`;
    };
    console.log(sortedActivities);
    if (activities.length > 0) {
      sortedActivities.forEach(theItems);
      const list = document.getElementById("activitiesList");
      list.innerHTML = htmlString;
    }
  };

  const searchActivities = (searchValue) => {
    let filter, ul, i, aString, htmlString;
    const regex = new RegExp(searchValue, 'i');
    filter = searchValue.toLowerCase();
    ul = activities;
    htmlString = "";
    if (ul != null) {

      for (i = 0; i < ul.length; i++) {
        aString = JSON.stringify(ul[i].name) + JSON.stringify(ul[i].description);
        console.log(aString.split().filter(item => item.match(regex)))
        if (aString.toLowerCase().indexOf(filter) > -1) {
          if (ul[i].name != undefined) {
          htmlString += `<li class="activityItem">
          <h5>ID: ${ul[i].id}</h5>
          <p>Name: ${ul[i].name}</p>
          <img src="${ul[i].photoURL}" height="150px" width="150px" alt="Photo">
          <p>Description: ${ul[i].description}</p>
          <p>Location: ${ul[i].location}</p>
          <p>Date: ${ul[i].date}</p>
          <p>Time: ${ul[i].time}</p>
          <p>AgeRestriction: ${ul[i].ageRestrict}</p>
          <p>Minimum Age: ${ul[i].minAge}</p>
          <p>Maximum Age: ${ul[i].maxAge}</p>
          <p>Gender Restriction: ${ul[i].genderRestrict}</p>
          <p>Gender Requirement: ${ul[i].genderReq == "" ? "" : ul[i].genderReq.join(", ")}</p> 
          <p>Attendees: ${ul[i].attendeeID.join(", ")}</p>
          </li>`;
          }
        }
        console.log(i, htmlString)
      }
      if (htmlString != "") {
        const list = document.getElementById("activitiesList");
        list.innerHTML = htmlString;
      } else {
        const list = document.getElementById("activitiesList");
        list.innerHTML = "Search not found";
      }
    }
  };

/*   const rangeSearchUsers = () => {
    let ul, i, htmlString, searchValues, value1, value2, text1, text2, num1, num2, arr;
    console.log(typeof document.getElementById("range-slider"))
    const text = document.getElementById("range-slider").innerHTML
    value1 = text.indexOf("value=")
    value2 = text.lastIndexOf("value=")
    text1 = text.substring(value1+7, value1+10)
    text2 = text.substring(value2+7, value2+10)
    if (text1.charAt(text1.length-1) == "\"") {
      text1 = text1.substring(0, text1.length-1)
    }
    if (text2.charAt(text2.length-1) == "\"") {
      text2 = text2.substring(0, text2.length-1)
    }
    num1 = parseInt(text1)
    num2 = parseInt(text2)
    arr = [num1, num2]
    console.log(arr)
    ul = users;
    console.log(users)
    htmlString = "";
    if (ul != null) {
      for (i = 0; i < ul.length; i++) {
        if (ul[i].age >= arr[0] && ul[i].age <= arr[1]) {
          if (ul[i].name != undefined) {
          htmlString += `<li class="userItem">
          <h5>ID: ${ul[i].id}</h5>
          <p>Name: ${ul[i].name}</p>
          <p>Age: ${ul[i].age}</p>
          </li>`;
          }
        }
        console.log(i, htmlString)
      }
      if (htmlString != "") {
        const list = document.getElementById("itemsList");
        list.innerHTML = htmlString;
      } else {
        const list = document.getElementById("itemsList");
        list.innerHTML = "Search not found";
      }
    }
  } */

  return (
    <>
      <img src={weDoLogo} className="logo react" alt="React logo" />
      {/* <p id="apiResponse">{test.apiResponse}</p> */}
      <SearchActivityForm onSubmit={searchActivities} />
      <SortItemsForm onSubmit={sortItems} />
      {/* <RangeSearchSliderForm /> */}
      {/* <RangeSearchButton onClick={rangeSearchUsers}/> */}
      <ul id="activitiesList"></ul>
      <NewActivityForm onSubmit={addActivity} />
      <JoinActivityForm onSubmit={joinActivity} />
      <UpdateActivityForm onSubmit={updateActivity} />
      <LeaveActivityForm onSubmit={leaveActivity} />
      <DeleteActivityForm onSubmit={deleteActivity} />
      <p>{search}</p>
    </>
  );
};

export default ActivitiesTest;
