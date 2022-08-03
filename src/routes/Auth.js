import React from 'react';
import { authService } from 'fbase.js'; //firebaseInstance
import AuthForm from "components/AuthForm";

import {signInWithPopup,GoogleAuthProvider, GithubAuthProvider,} from "firebase/auth"; //v9버전에서는 사용이 변경됨
//import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";



const Auth = () => {
    const onSocialClick = async(event) => {
        const{
            target: { name },
        } = event;
        let provider;
        if (name === "google"){
            provider = new GoogleAuthProvider();
            //provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github"){
            //provider = new firebaseInstance.auth.GithubAuthProvider();
            provider = new GithubAuthProvider();
        }
        //const data = await authService.signInWithPopup(provider); v8버전
        const data = await signInWithPopup(authService, provider); //eslint-disable-line no-unused-vars
        
       
    }
    return (
        <div>
         <AuthForm />
            <div>
                <button onClick = {onSocialClick} name = "google"> with Google</button>
                <button onClick = {onSocialClick} name = "github"> with Github</button>
            </div>
        </div>
    );
};

export default Auth; 