import React from 'react';
import { db } from "fbase.js";
import { doc, collection,addDoc,deleteDoc, onSnapshot,getDocs } from "firebase/firestore";
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

        // if(userObj.uid === doc(db , `likes/${lweetObj.id}`);) 
       
    };
    //updateDoc(doc(db, `lweets/${lweetObj.id}`), {total: liketotal});
    setLikemg(1);
}

const togglelike = async() => {
    const ok = window.confirm("좋아요 취소?");
    //const Like2 = Likemap
    //console.log('%s likeonj1',JSON.stringify(Likemap));
  
    if (ok) {
        
       //const data = await deleteDoc(doc(db , `likes/${Likemap.id}`));
       const test = await doc(db,`likes/${likeObj.id}`);
        console.log('%s test',test);
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