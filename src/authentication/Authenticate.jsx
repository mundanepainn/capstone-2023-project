import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const Authenticate = ({ children }) => {
    const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionData, setSessionData] = useState({}); // Change to an object

  const authenticate = async (email, password, route ) => {
    try {
      const response = await axios.post("https://us-central1-wedo-1a85a.cloudfunctions.net/api/cognito/signIn", {
        username: email,
        password: password,
      });

      // Assuming a successful response indicates authentication
      await setIsAuthenticated(true);

      // Update sessionData with response data
      await setSessionData(response.data.AuthenticationResult);
      localStorage.setItem('session', response.data.AuthenticationResult)
      localStorage.setItem('token', response.data.AuthenticationResult.AccessToken)
      //add timeout
      localStorage.setItem('isAuthenticated', true)
      navigate(route);
      console.log(response);

    } catch (error) {
        alert(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("isAuthenticated inside useEffect:", isAuthenticated);
    console.log("sessionData inside useEffect:", sessionData);

  }, [isAuthenticated, sessionData]); // Include sessionData in the dependencies array

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, sessionData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, Authenticate };
