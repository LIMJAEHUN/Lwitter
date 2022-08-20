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
           

        } catch (error) {
             if (error.message ==='Firebase: Password should be at least 6 characters (auth/weak-password).'){
                setError('비밀번호는 6자리 이상 입력해야 합니다');
             }
             if (error.message ==='Firebase: Error (auth/user-not-found).'){
                setError('일치하는 사용자를 찾지 못했습니다');
             }
           else {setError(error.message);}
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return(
        <>
        <form onSubmit = {onSubmit}>      
            <input name = "email" type = "email" className="text-field" placeholder='Email' value = {email} onChange={onChange} required /><p></p>
            <input name = "password" type = "password" className="text-field" placeholder='Password' value ={password} onChange={onChange} required/><p></p>
            <button className="login-button" onClick = {toggleAccount} value = {true}><span>Create Account</span></button><p></p>
            <button className="login-button" onClick = {toggleAccount} value = {false}><span>Sign in</span></button><p></p>
            {error}
        </form>
        </>
    );
};
export default AuthForm;