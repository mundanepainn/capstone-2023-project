import React, { useState} from "react";
import './SignUp-In.css';
import weDoLogo from '../assets/logo.svg';
import { useNavigate } from "react-router-dom";

const SignIn = (props)=>
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (  
    <>
        <img src={weDoLogo} className="logo react" alt="React logo" />

        <form>
            <label for="email">E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" />
            <label for="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
            
            <button onClick={() => navigate("/") /*To Home Page(If the user already chose interests)*/} type="submit">Sign In</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/signup") /*To Sign Up Page*/}>Don't have an account? Click here</button>
    </>
    );    
};

export default SignIn;