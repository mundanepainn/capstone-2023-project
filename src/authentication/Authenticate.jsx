import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const Authenticate = ({ children }) => {
  const base_url = import.meta.env.VITE_BACKEND;

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionData, setSessionData] = useState({}); // Change to an object

  const authenticate = async (email, password, route) => {
    await axios
      .post(base_url + "/cognito/signIn", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.data.AuthenticationResult) {
          setIsAuthenticated(true);
          setSessionData(response.data.AuthenticationResult);
          localStorage.setItem('session', JSON.stringify(response.data.AuthenticationResult));
          localStorage.setItem('token', response.data.AuthenticationResult.AccessToken);
          localStorage.setItem('isAuthenticated', true);
          navigate(route);
          //console.log(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.error(error);
        }
      });
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
