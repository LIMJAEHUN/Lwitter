import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "fbase.js";
import { collection, onSnapshot } from "firebase/firestore";
import Lweet from "components/Lweet.js";
import LweetFactory from 'components/LweetFactory.js';
// import AppRouter from 'components/Router.js';
import Like from "components/Like.js";



const Home = ({userObj}) => {
    
   
    const [ lweets, setLweets ] = useState([]);
  



    useEffect(() => {
        onSnapshot(collection(db,"lweets"), (snapshot) =>
        {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            console.log('%s newArray' ,newArray);
            setLweets(newArray);
        }); //lweets
      
     
    }, []);
    console.log("%s오류", lweets);
    return (
        <>
        
    <LweetFactory userObj={userObj} />
             <div>
                {lweets.map((lweet, id) => (
                    <>
                    <Lweet 
                    //key = {id} 
                    lweetObj={lweet}
                    isOwner={lweet.creatorID === userObj.uid} 
                    />   
                    
                    
                    <Like 
                    
                    lweetObj={lweet}
                    userObj={userObj}
                    likecount={lweet.likeCount}
                    /> 
                
                    </>
                ))}
                
             </div>

             </>
    );
};
export default Home;