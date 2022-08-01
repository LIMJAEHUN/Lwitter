import React from 'react';
import { useEffect, useState } from 'react';
import { authService } from 'fbase';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃
//import { orderBy, query, where, collection ,doc, getDocs}from "firebase/firestore";
import { updateProfile } from "@firebase/auth"

//import { async } from '@firebase/util';
//import { collection } from '@firebase/firestore';

const Profile = ({refreshUser , userObj }) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
   // const [userObj, setUserObj] = useState(null);

    
    const onLogOutClick = () =>{ 
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const{
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    // const getMyLweets = async() => {
    //    const lweets = query(collection(db,"lweets"),where("creatorID", "==", userObj.uid),orderBy("createdAt", "desc"));
    //  //  console.log("Document data:", lweets.getDoc.data());
    //    // console.log(doc.id, " => ", doc.data());
    //   // console.log(lweets.docs.map((doc) => doc.data()));
        
    //   const querySnapshot = await getDocs(lweets);
    //   querySnapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    //   });
     
    // };

    // useEffect(() => {
    //     getMyLweets();
    // }, []);



    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName)
        {
            await updateProfile(userObj,{ displayName: newDisplayName });
            refreshUser();
        }
        
    };
    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder= "Display name" value = {newDisplayName} />
            <input type = "submit" value="update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out </button>
        
        
        </>
    );
};
export default Profile;