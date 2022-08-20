import React from 'react';
import {  useState, useEffect } from 'react';
import { authService, db } from 'fbase.js';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃
import { updateProfile } from "@firebase/auth";
import { collection, query, orderBy,getDocs, where } from "firebase/firestore";
import Lweet from "components/Lweet.js";


const Profile = ({refreshUser , userObj }) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [ lweets, setLweets ] = useState([]);
    
     
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
      // const getLweets = async() => {
    //     const dbLweets = await getDocs(collection(db, "lweets"));
    //     dbLweets.forEach((document) => {
    //         const lweetObject = { ...document.data(), id: document.id };
    //     setLweets((prev) => [lweetObject, ...prev])
    // });
    // }
    const getMyLweets = async() => {
       const lweets = query(collection(db,"lweets"),where("creatorID", "==", userObj.uid),orderBy("createdAt", "desc"));
        
      const querySnapshot = await getDocs(lweets);
      querySnapshot.forEach((doc) => {
      const lweetObject = { ...doc.data(), id: doc.id };
      setLweets((prev) => [lweetObject, ...prev])
    
        
    });
      //console.log(doc.id, "=>", doc.data());
    };

    useEffect(() => {
        getMyLweets();
    }, []);
    


    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName)
        {
            await updateProfile(userObj,{ displayName: newDisplayName });
            refreshUser();
        }
        
    };
    return (
        <div className="body">
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder= "Display name" value = {newDisplayName} />
            <input type = "submit" value="update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out </button>
       
        {lweets.map((lweetObject) => (
            <Lweet
             key = { lweetObject.id}
            lweetObj={lweetObject}
            isOwner={lweetObject.creatorID === userObj.uid} 
            />
            
        ))}
        
        </div>
    );
};
export default Profile;