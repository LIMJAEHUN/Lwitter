import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({userObj}) => {
    return (
        <nav>
            <ul> 
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/profile">{userObj.displayName}의 My Profile</Link>
                </li>
                <li>
                    <Link to = "/test">테스트페이지</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;