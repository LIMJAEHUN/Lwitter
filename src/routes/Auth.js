import React from 'react';
import { authService } from 'fbase'; //firebaseInstance
import { useState } from 'react';
import {signInWithPopup,GoogleAuthProvider, GithubAuthProvider,} from "firebase/auth"; //v9버전에서는 사용이 변경됨
//import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const Auth = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ newAccount, setNewAccount ] = useState(true);
    const [ error, setError ] = useState(""); 
    
    const onChange = (event) => {
        //console.log(event.target.name);
        const{
            target: { name, value },
        } = event;
        if(name === "email" ){
            setEmail(value);
        }else if (name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                //create newAccount
            data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                //log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);

        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);

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
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input name = "email" type = "email" placeholder='Email' value = {email} onChange={onChange} required />
                <input name = "password" type = "password" placeholder='Password' value ={password} onChange={onChange} required />
                <input type = "submit" value = {newAccount ? "Create Account" : "Log in"}/>
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            <div>
                <button onClick = {onSocialClick} name = "google"> with Google</button>
                <button onClick = {onSocialClick} name = "github"> with Github</button>
            </div>
        </div>
    );
};

export default Auth; 