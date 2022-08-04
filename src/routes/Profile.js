import React from 'react';
import {  useState } from 'react';
import { authService } from 'fbase.js';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃
import { updateProfile } from "@firebase/auth"


const Profile = ({refreshUser , userObj }) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  

    
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

zz



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