import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "fbase.js";
import { collection, onSnapshot } from "firebase/firestore";
import Lweet from "components/Lweet.js";
import LweetFactory from 'components/LweetFactory.js';
import AppRouter from 'components/Router';

const Home = ({userObj}) => {
    
   
    const [ lweets, setLweets ] = useState([]);


    // const getLweets = async() => {
    //     const dbLweets = await getDocs(collection(db, "lweets"));
    //     dbLweets.forEach((document) => {
    //         const lweetObject = { ...document.data(), id: document.id };
    //     setLweets((prev) => [lweetObject, ...prev])
    // });
    // }
 


    useEffect(() => {
        onSnapshot(collection(db,"lweets"), (snapshot) =>
        {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setLweets(newArray);
        });
     
    }, []);

 
    return (
        <>
            <LweetFactory userObj={userObj} />
             <div>
                {lweets.map((lweet) => (

                    <Lweet 
                    key = { lweet.id} 
                    lweetObj={lweet} 
                    isOwner={lweet.creatorID === userObj.uid} 
                    />
                    
                ))}
                
             </div>
             </>
    );
};
export default Home;