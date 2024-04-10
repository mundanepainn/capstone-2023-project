
//  allows sharing these variables and their values across all pages
import React, { createContext, useContext, useState } from "react";

export const MyContext = createContext();

 const ContextManager = ({ children }) => {
  const options = ["Everyone", "Male", "Female", "Other"];
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([18, 100]);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [privateActivity, setPrivateActivity] = useState(false);

  const contextValue = {
    options,
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
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextManager;