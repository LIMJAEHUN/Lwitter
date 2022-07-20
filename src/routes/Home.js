import React from 'react';
import { useState } from 'react';
import { dbService } from "fbase";
import { collection, addDoc } from "firebase/firestore/lite";
//import { collection } from "firebase/firestore";


   


const Home = () => {
    const [ lweet, setLweet ] = useState("");

    const onSubmit = async (event) => {
        
        event.preventDefault();
        await addDoc(collection(dbService, "lweets"), {
            text: lweet,
            //createdAt: Date.now(), 
        });
        setLweet("");
        
    };
    
 
    // await addDoc(collection(dbService, "nweets"), {
    //     text: nweet,
    //     createdAt: Date.now(),
    //   });



    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setLweet(value);
    };
    return (
        <form onSubmit={onSubmit}>
            <input
             value ={lweet}
             onChange = {onChange}
             type = "text"
             placeholder="What's on your mind?"
             maxLength={120} />
             <input type ="submit" value = "Lweet" />
             </form>
    );
};
export default Home;