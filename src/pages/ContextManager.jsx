
//  allows sharing these variables and their values across all pages
import dayjs from "dayjs";
import React, { createContext, useContext, useState } from "react";
import weDoLogo from '../assets/logo.svg';
import DefaultPic from '../assets/DefaultProfilePic.svg';


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
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"))
  const [location, setLocation] = useState("")
  const [time, setTime] = useState(dayjs().format("h:mm A"))
  const [photoURL, setPhotoURL] = useState("https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Bread-Recipe-5-2.jpg")
  const [userID, setUserID] = useState("")
  const [attendees, setAttendees] = useState([])
  const [review, setReview] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [file, setFile] = useState(weDoLogo);
  const [attendeeLimit, setAttendeeLimit] = useState(false)
  // Profile Creation
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState("");
  const [handle, setHandle] = useState("");
  const [birthday, setBirthday] = useState(dayjs().format("DD/MM/YYYY"))
  const [userGender, setUserGender] = useState("");
  const [userPic, setProfilePic] = useState(DefaultPic);
  const [interests, setInterests] = useState([])
  

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
    userName, setUserName,
    email, setEmail,
    handle, setHandle,
    birthday, setBirthday,
    userGender, setUserGender,
    userPic, setProfilePic,
    interests, setInterests
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextManager;