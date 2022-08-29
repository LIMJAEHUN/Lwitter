import React from "react";
import { Link } from "react-router-dom";
import '../css/Navigation.css'
import logoImage from '../image/twitter-logo.png';
import cardimg from '../image/LETFLIX.jpg';
import logo from '../image/LIMFLIX-roge2.svg';


    
const Navigation = ({userObj}) => {

    return (
      
       
      
     
     
        <div className="main-cardimg-wrap">
            <div className="main-cardimage">
            <img src={cardimg} />
            </div>
            <div className="head-wrap">
                <div className="head-img">
        <img src={logo} />
        </div>
             </div>
       
        <div className="card-text">
            <h1 id = "card-main-title"> NETFLIX 진행중 연습</h1>
            <h2 id = "card-main-subtitle"> 궁시렁 궁시렁 궁시렁 궁시렁 해지 하던가 말던가 하고싶은대로 하세요</h2>
        </div>
       
      </div>
        
  
    );
    
    // return (
    //     <header className="header">
    //         <nav className="nav">
    //         <div className="logo">
    //             <Link to = "/">
    //                 <img src={logoImage} style={{"width":"80%"}}/>
    //             </Link>
    //         </div>
    //         <div>
    //             <Link to = "/profile">{userObj.displayName}의 My Profile</Link>  
    //         </div>
    //         <li>
    //                 <Link to = "/test">테스트페이지</Link>
    //             </li>
    //         </nav>
    //     </header>

    // );
};

export default Navigation;


 // return (
    //     <header className="header">
    //         <nav className="nav">
    //         <div className="logo">
    //             <Link to = "/">
    //                 <img src={logoImage} style={{"width":"80%"}}/>
    //             </Link>
    //         </div>
    //         <div>
    //             <Link to = "/profile">{userObj.displayName}의 My Profile</Link>  
    //         </div>
    //         <li>
    //                 <Link to = "/test">테스트페이지</Link>
    //             </li>
    //         </nav>
    //     </header>

    // );