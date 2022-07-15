//import firebase from "firebase/compat/app";
// import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';	// 모듈 추가
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };


  //const app = initializeApp(firebaseConfig);
  // export const authService = firebase.auth();

  //const App = initializeApp(firebaseConfig);
  //export const authService = getAuth();
  

  
  firebase.initializeApp(firebaseConfig);
  
  export const authService = firebase.auth();