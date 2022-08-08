import React, { useState } from "react";
import { authService } from 'fbase.js'; //firebaseInstance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import "../css/AuthForm.css";

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
            <input name = "email" type = "email" className="text-field" placeholder='Email' value = {email} onChange={onChange} required /><p></p>
            <input name = "password" type = "password" className="text-field" placeholder='Password' value ={password} onChange={onChange} required/><p></p>
            <input type = "submit" value = {newAccount ? "Create Account" : "Sign in"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign in" : "Create Account"}
        </span>
        </>
    );
};
export default AuthForm;