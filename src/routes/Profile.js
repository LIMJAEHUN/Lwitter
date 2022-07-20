import React from 'react';
import { authService } from 'fbase';
import { useHistory } from "react-router-dom"; //useHistory를 이용한 로그아웃

const Profile = () => {
    const history = useHistory();
    
    const onLogOutClick = () =>{ 
        authService.signOut();
        history.push("/");
    };
    return (
        <>
        <button onClick={onLogOutClick}>Log Out </button>
        </>
    );
};
export default Profile;