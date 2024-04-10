
import { useContext, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { AuthContext } from "./Authenticate";


const PrivateRoutes = ()=>{
// const {isAuthenticated} = useContext(AuthContext);
// console.log("Is authenticated?",isAuthenticated);
const isAuthenticated = localStorage.getItem('isAuthenticated');

return (

    isAuthenticated ? <Outlet/> : <Navigate to="/landing"/> //navigates to /landing route if authentication fails, otherwise navigates to routes defined in the app.jsx PrivateRoutes section.

);


};

export default PrivateRoutes;