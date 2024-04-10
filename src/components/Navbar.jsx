import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function WedoNavbar() {
    const navigate = useNavigate();

    const HandleNavigation = (navRoute) => {
        navigate(navRoute);
    };
    return (
        <Navbar className="navbar navbar-dark bg-dark wedonav">
            <Button className="wedonavtext" onClick={() => HandleNavigation("/first")}>First</Button>
            <Button className="wedonavtext" onClick={() => HandleNavigation("/second")}>Second</Button>
            <Button className="wedonavtext">Activities</Button>
            <Button className="wedonavtext">Profile</Button>
        </Navbar>
    );
}
export default WedoNavbar;