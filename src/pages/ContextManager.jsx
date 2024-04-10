
//  allows sharing these variables and their values across all pages
import dayjs from "dayjs";
import React, { createContext, useContext, useState } from "react";
import weDoLogo from '../assets/newlogo.svg';
import DefaultPic from '../assets/DefaultProfilePic.svg';
import io from 'socket.io-client'

export const MyContext = createContext();

 const ContextManager = ({ children }) => {
  //Event Creation variables
  const options = ["Everyone", "Male", "Female", "Other"];
  const [name, setName] = useState("Jumping around a campfire")
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([18, 100]);
  const [activityName, setActivityName] = useState("");
  const [activityCategory, setActivityCategory] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [privateActivity, setPrivateActivity] = useState(false);
  const [date, setDate] = useState(dayjs().format("MM/DD/YYYY"))
  const [location, setLocation] = useState("")
  const [time, setTime] = useState(dayjs().format("h:mm A"))
  const [photoURL, setPhotoURL] = useState("https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2.jpg")
  const [userID, setUserID] = useState("")
  const [attendees, setAttendees] = useState([])
  const [review, setReview] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [file, setFile] = useState(weDoLogo);
  const [attendeeLimit, setAttendeeLimit] = useState(false)
  const [cost, setCost] = useState("free")
  
  // Profile Creation
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState("");
  const [handle, setHandle] = useState("");
  const [birthday, setBirthday] = useState(dayjs().format("MM/DD/YYYY"))
  const [userGender, setUserGender] = useState("");
  const [userPic, setProfilePic] = useState(DefaultPic);
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("")
  const [newMessage,setNewMessage] = useState("");
  // Chat Page variables
  const [socket, setSocket] = useState('')
  const [messageDisplay, setMessageDisplay] = useState([]);

  const contextValue = {
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
    setActivityCategory,  
    activityDescription,
    setActivityDescription,
    privateActivity,
    setPrivateActivity,
    attendeeLimit,
    setAttendeeLimit,
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
    searchTerm,
    setSearchTerm,
    file,
    setFile,
    cost,
    setCost,
    userName, setUserName,
    email, setEmail,
    handle, setHandle,
    birthday, setBirthday,
    userGender, setUserGender,
    userPic, setProfilePic,
    interests, setInterests,
    bio, setBio,
    newMessage, 
    setNewMessage,
    messageDisplay, setMessageDisplay,
    socket, setSocket 

  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextManager;