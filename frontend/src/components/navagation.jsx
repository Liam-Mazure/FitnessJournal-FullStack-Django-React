import React from "react";
import { Link } from "react-router-dom";
import "../styles/navigation.css";

function NavBar(){
    return(
        <nav id="nav-container">
            <ul id="nav-links">
                <li className="link">
                    <Link to = "/">Home</Link>
                </li>
                <li className="link">
                    <Link to = "/journal">Journal</Link>
                </li>
                <li className="link">
                    <Link to = "/profile">Profile</Link>
                </li>
            </ul>
            <Link to = "/logout" className="link">Logout</Link>
        </nav>
    )
}

export default NavBar