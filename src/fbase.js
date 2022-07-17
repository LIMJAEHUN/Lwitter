//import firebase from "firebase/compat/app";
// import "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';	// 모듈 추가
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBnupPa3o4DG6ls9op5rOb-riIPpkYKKM4",
  authDomain: "jwitter2.firebaseapp.com",
  projectId: "jwitter2",
  storageBucket: "jwitter2.appspot.com",
  messagingSenderId: "183781658715",
  appId: "1:183781658715:web:92a81ece996f1a9100ef7e"
};


  //const app = initializeApp(firebaseConfig);
  // export const authService = firebase.auth();

  //const App = initializeApp(firebaseConfig);
  //export const authService = getAuth();
  

  
  export default firebase.initializeApp(firebaseConfig);
  
  export const authService = firebase.auth();