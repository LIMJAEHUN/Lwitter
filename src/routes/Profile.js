import React from 'react';
import { useEffect } from 'react';
import { authService, db } from 'fbase';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃
import { orderBy, query, where, collection ,doc, getDocs}from "firebase/firestore";
//import { async } from '@firebase/util';
//import { collection } from '@firebase/firestore';

const Profile = ({userObj}) => {

    const history = useHistory();

    
    const onLogOutClick = () =>{ 
        authService.signOut();
        history.push("/");
    };

    const getMyLweets = async() => {
       const lweets = query(collection(db,"lweets"),where("creatorID", "==", userObj.uid),orderBy("createdAt", "desc"));
     //  console.log("Document data:", lweets.getDoc.data());
       // console.log(doc.id, " => ", doc.data());
      // console.log(lweets.docs.map((doc) => doc.data()));
        
      const querySnapshot = await getDocs(lweets);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      });
     
    };

    useEffect(() => {
        getMyLweets();
    }, []);
    return (
        <>
        <button onClick={onLogOutClick}>Log Out </button>
        
        
        </>
    );
};
export default Profile;