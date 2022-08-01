import React from 'react';
import { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import { authService } from "fbase";
import {

  updateCurrentUser,

} from "firebase/auth";

function App() {
  const [ init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj ] =useState(null);
  useEffect (() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  } ,[]);
  //setInterval(() => console.log(authService.currentUser), 2000);
  //console.log(authService.currentUser);

  const refreshUser = async() =>{
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);

  };

  return (
    <>
      { init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {isLoggedIn } userObj={userObj}/> : "initializing..."}
      {/* //<footer>&copy; {new Date().getFullYear()} Lwitter </footer> */}
    </>
  );
  
  
}

export default App;
