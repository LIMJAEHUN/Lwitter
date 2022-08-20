import React from "react";
import { Link } from "react-router-dom";
import '../css/Layout.css'
import logoImage from '../image/twitter-logo.png';

const Navigation = ({userObj}) => {
    return (
        <header className="header">
            <nav className="nav">
            <div className="logo">
                <Link to = "/">
                    <img src={logoImage} style={{"width":"80%"}}/>
                </Link>
            </div>
            <div>
                <Link to = "/profile">{userObj.displayName}의 My Profile</Link>  
            </div>
            <li>
                    <Link to = "/test">테스트페이지</Link>
                </li>
            </nav>
        </header>

    );
};

export default Navigation;