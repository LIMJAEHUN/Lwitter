import React from 'react';
import { useEffect, useState } from 'react';
import { db } from "fbase.js";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import Lweet from "components/Lweet.js";
import LweetFactory from 'components/LweetFactory.js';
// import AppRouter from 'components/Router.js';
// import Like from "components/Like.js";



const Home = ({userObj}) => {
    
   
    const [ lweets, setLweets ] = useState([]);
    //const [ likes, setLikes ] = useState([]);
   


    // const Likes = async() => {
    //     const dbLweets = await getDocs(collection(db, "likes"));
    //     dbLweets.forEach((document) => {
    //         console.log('%s 이거는',document.data)
    //         //const lweetObject = { ...document.data(), id: document.id };
    //       //  setLikes((prev) => [lweetObject, ...prev])
    //        // console.log('%s like',lweetObject);
    // });
    // useEffect(() => {
    //     Likes();
    // }, []);
     
    // }
    // console.log(likes);



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
   
    // useEffect(() => {
    //     onSnapshot(collection(db,"likes"), (snapshot) =>
    //     {
    //         const newLike = snapshot.docs.map((document) => ({
    //             id: document.id,
    //             ...document.data(),
    //         }));
    //         console.log('%s 라이크' ,newLike.id);
    //         setLikes(newLike);
    //     });
     
    // }, []);

 
    return (
        <>
       
    <LweetFactory userObj={userObj} />
    {/* <div> {likes.map((like)=> (
        <Lweet 
        key = {like.id}
        likeobj = {like}/>
    ))}</div> */}

             <div>
                {lweets.map((lweet) => (

                    <Lweet 
                    key = { lweet.id} 
                    lweetObj={lweet}
                    userObj={userObj}
                    isOwner={lweet.creatorID === userObj.uid} 
                    />   
                ))}
             </div>

             </>
    );
};
export default Home;