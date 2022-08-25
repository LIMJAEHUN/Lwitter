import React from 'react';
import { db } from "fbase.js";
import { doc, collection,addDoc,deleteDoc, onSnapshot,getDocs,query, where } from "firebase/firestore";
import { useState, useEffect } from "react";

const Like = ({ lweetObj, userObj,likeObj }) => {
    //const [ like, setLike]= useState([]);
    const [ likes, setLikes]= useState([]);
    //const [ liketotal, setliketotal] =  useState(lweetObj.total);
    const [ likemg, setLikemg]= useState(0);

    const onLike = async(event) => {
        event.preventDefault();
        const ok = window.confirm("좋아요를 누르시겠습니까?");
        console.log('%suserObj',userObj);
        if (ok){
            const post = doc(db , `lweets/${lweetObj.id}`);
            console.log('%post',post.id);
            await addDoc(collection(db, "likes"), {
            post:post.id,
            uid:userObj.uid,
            createdAt: Date.now(),
        })

       
    };
   
    setLikemg(1);
}


const togglelike = async() => {
    const ok = window.confirm("좋아요 취소?");
  
    if (ok) {
        const q = query(collection(db, "likes"), where("uid", "==", userObj.uid), where("post", "==", lweetObj.id));
        console.log("%s qqq",q)
        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            const likeObject = {  id: doc.id };
            console.log("%s likeObject:", likeObject.id);
            setLikes(likeObject)
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            });
        await deleteDoc(doc(db , "likes",likes.id));
       // await deleteDoc(doc(db, "cities", "DC"));

        const test = await doc(db,`likes/${likes.id}`);
        console.log('%s test',test);
      
      
        //await storage.refFromUrl(lweetObj.attachmentUrl).delete();
    
    // const Likes = async() => {
    //     const dbLweets = await getDocs(collection(db, "likes"));
    //      dbLweets.forEach((document) => {
    //        // console.log('%s 이거는',document.data)
    //         const lweetObject = {  id: document.id };
    //         setLike(lweetObject)
    //        // console.log('%s like',lweetObject.id);
    // });
    
        
       //const data = await deleteDoc(doc(db , `likes/${Likemap.id}`));
    //    const test = await doc(db,`likes/${likeObj.id}`);
    //     console.log('%s test',test);
    };
    setLikemg((prev) => !prev);
 
}


useEffect(() => {
    
    onSnapshot(collection(db,"likes"), (snapshot) =>
    {
        const newLike = snapshot.docs.map((document) => ({
            id: document.id,
           uid: userObj.uid,
           ...document.data(),
          
            
        }));
        console.log('%s 라이크' ,newLike.uid);
        setLikes(newLike);
    });
  
   
}, []);
   
    return(
        <div>
          { likemg ? ( 
              <button onClick = {togglelike}> Lweet Cancel </button>
                ):( 
                <button onClick = {onLike}> Lweet like </button>
               
                )
                }
        </div>
        // <form onSubmit={onLike}>
            
        //     <input type = "submit" value = "like" />
        // </form>
    )
};
export default Like;