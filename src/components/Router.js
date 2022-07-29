// import { useState } from "react";
import React from 'react';
import { HashRouter as Router,  Route, Switch } from "react-router-dom";
//import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"; 리다이엑트를 이용한 로그아웃

import Navigation from './Navigation';
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? ( 
                    <> 
                    <Route exact path="/"  element={<Home />}>
                        <Home userObj={userObj}/>
                    </Route>
                    <Route exact path = "/profile">
                        <Profile userObj = {userObj}/>
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