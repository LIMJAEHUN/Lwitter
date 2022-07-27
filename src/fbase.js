//import firebase from "firebase/compat/app";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';	// 모듈 추가
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



//export const dbService = firebase.firestore(); 대신



const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };


  //const app = initializeApp(firebaseConfig);
  // export const authService = firebase.auth();

  //const App = initializeApp(firebaseConfig);
  //export const authService = getAuth();
  

  const app = initializeApp(firebaseConfig); //eslint-disable-line no-unused-vars
  export const authService = getAuth(app);
  export const storage = getStorage(app);
  export const db = getFirestore(app);
  //export const firebaseInstance = getAuth();
  // export default firebase.initializeApp(firebaseConfig);
  
 //export const authService = firebase.auth();