// import { useState } from "react";
import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
//import App from "components/App";

import Home from "../routes/Home";
import Auth from "../routes/Auth";

const AppRouter = ({isLoggedIn}) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (  
                    <Route exact path="/"  element={<Home />}>
                        <Home />
                    </Route>
                    ) : (
                        <Route expact = "/" element={<Auth />}>
                            <Auth />
                        </Route>
                    )
                }
            </Switch>

        </Router>
    );
};

export default AppRouter;