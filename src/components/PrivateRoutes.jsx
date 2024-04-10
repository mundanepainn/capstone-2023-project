
import { Outlet,Navigate } from "react-router-dom";
const PrivateRoutes = ()=>{
let auth = {'token':true};

return (

auth.token ? <Outlet/> : <Navigate to="/landing"/> //navigates to /landing route if authentication fails, otherwise navigates to routes defined in the app.jsx PrivateRoutes section.

);


};

export default PrivateRoutes;