import React, { useState} from "react";
import './SignUp-In.css';
import weDoLogo from '../assets/newlogo.svg';
import { useNavigate } from "react-router-dom";
import { MyContext } from "./ContextManager";

const SignIn = (props)=>
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const {
        userID, setUserID
      } = React.useContext(MyContext);

    

    return (  
    <>
        <img src={weDoLogo} className="logo react" alt="React logo" />

        <form>
            <label htmlFor="email">E-mail</label>
            <input value={email} onChange={(e) => (setEmail(e.target.value))} type="email" placeholder="email" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password"/>
            
            <button className="signin-btn" onClick={() => (setUserID(e.target.value), localStorage.setItem('userID', username)) /*To Home Page(If the user already chose interests)*/} type="submit">Sign In</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/signup") /*To Sign Up Page*/}>Don't have an account? Click here</button>
    </>
    );    
};

export default SignIn;