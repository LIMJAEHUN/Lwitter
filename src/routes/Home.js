import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Lweet from "components/Lweet";


const Home = ({userObj}) => {
    
    const [ lweet, setLweet ] = useState("");
    const [ lweets, setLweets ] = useState([]);

    // const getLweets = async() => {
    //     const dbLweets = await getDocs(collection(db, "lweets"));
    //     dbLweets.forEach((document) => {
    //         const lweetObject = { ...document.data(), id: document.id };
    //     setLweets((prev) => [lweetObject, ...prev])
    // });
    // }
 


    useEffect(() => {
       // getLweets();
       //db.collection("lweet").onSnapshot((snapshot) =>
        onSnapshot(collection(db,"lweets"), (snapshot) =>
        {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setLweets(newArray);
        });
     
    }, []);

    console.log(lweets);



    const onSubmit = async (e) => {
        e.preventDefault();
        try {
        const docRef = await addDoc(collection(db, "lweets"), {
        text: lweet,
        createdAt: Date.now(),
        creatorID: userObj.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
        
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
        <>
        <form onSubmit={onSubmit}>
            <input
             value ={lweet}
             onChange = {onChange}
             type = "text"
             placeholder="What's on your mind?"
             maxLength={120} />
             <input type ="submit" value = "Lweet" />
             </form>
             <div>
                {lweets.map((lweet) => (
                    // <div key={lweet.id}>
                    //     <h4>{lweet.text}</h4>
                    // </div>
                    <Lweet key = { lweet.id} lweetObj={lweet} isOwner={lweet.creatorId === userObj.uid} />
                ))}
             </div>
             </>
    );
};
export default Home;