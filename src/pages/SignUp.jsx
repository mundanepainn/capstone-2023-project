import React, { useState} from "react";
import weDoLogo from '../assets/logo.svg';
import { useNavigate } from "react-router-dom";

const SignUp = ()=>
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');

    return (  
    <>
        <img src={weDoLogo} className="logo react" alt="React logo" />

        <form>
            <label for="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail" id="email" name="email" />
            <label for="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
            <label for="fname">First Name</label>
            <input value={fname} onChange={(e) => setFName(e.target.value)} type="text" placeholder="First Name" id="FName" name="First Name" />
            <label for="lname">Last Name</label>
            <input value={lname} onChange={(e) => setLName(e.target.value)} type="text" placeholder="Last Name" id="LName" name="Last Name" />
            
            <button onClick={() => navigate("/") /*To Interests Page*/} type="submit">Sign Up</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/signin") /*To Sign in page*/}>Already have account? Click here</button>
    </>
    );    
};

export default SignUp;