// import { useState } from "react";
import React from 'react';
import { HashRouter as Router,  Route, Switch } from "react-router-dom";
//import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"; 리다이엑트를 이용한 로그아웃

import Navigation from './Navigation.js';
import Home from "routes/Home.js";
import Auth from "routes/Auth.js";
import Profile from "routes/Profile.js";
import Test from "routes/Test.js";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
   
    return (
        <Router>
            {isLoggedIn && <Navigation userObj ={userObj} />}
            
            <Switch>
                {isLoggedIn ? ( 
                    <> 
                    <Route exact path="/"  element={<Home />}>
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path = "/profile">
                        <Profile refreshUser={refreshUser} userObj = {userObj}/>
                    </Route>
                    <Route exact path = "/test"  element={<Test />}>
                        <Test refreshUser={refreshUser} userObj = {userObj}/>
                    </Route>
                    </>
                    ) : (
                        <Route expact = "/" element={<Auth />}>
                            <Auth />
                        </Route>
                    )
                }
                {/* //<Redirect from = "*" to = "/" />  리다이엑트를 이용한 로그아웃*/}
            </Switch>
            
        </Router>
    );
};

export default AppRouter;