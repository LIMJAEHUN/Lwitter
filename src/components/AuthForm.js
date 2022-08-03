import React, { useState } from "react";
import { authService } from 'fbase.js'; //firebaseInstance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const AuthForm = () => {
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
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

    return(
        <>
    
    <form onSubmit = {onSubmit}>
        <input name = "email" type = "email" placeholder='Email' value = {email} onChange={onChange} required />
        <input name = "password" type = "password" placeholder='Password' value ={password} onChange={onChange} required />
        <input type = "submit" value = {newAccount ? "Create Account" : "Log in"}/>
        {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
    </span>
    </>
    );


   
};
export default AuthForm;