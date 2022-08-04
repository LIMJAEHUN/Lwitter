import React from 'react';
import {  useState, useEffect } from 'react';
import { authService,db } from 'fbase.js';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃
import { updateProfile } from "@firebase/auth"
import { collection, query, where,orderBy,getDocs  } from "firebase/firestore";


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

    const getMyLweets = async() => {
       const lweets = query(collection(db,"lweets"),where("creatorID", "==", userObj.uid),orderBy("createdAt", "desc"));
     //  console.log("Document data:", lweets.getDoc.data());
       // console.log(doc.id, " => ", doc.data());
      // console.log(lweets.docs.map((doc) => doc.data()));
        
      const querySnapshot = await getDocs(lweets);
      querySnapshot.forEach((doc) => {
        const MYLweetsObjects = { ...document.data(), id: document.id};
        setLweets((prev) => [MYLweetsObjects, ...prev])

      console.log(doc.id, "=>", doc.data());
      });
     
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
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder= "Display name" value = {newDisplayName} />
            <input type = "submit" value="update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out </button>
        <div>
            {lweets.map((lweet) => (
                <div key={lweet.id}>
                    <h4>{lweet.text}</h4>
                </div>
            ))}
        </div>
        
        
        </>
    );
};
export default Profile;