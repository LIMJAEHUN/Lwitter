import React from 'react';
import { db } from "fbase.js";
import { doc,collection,addDoc } from "firebase/firestore";

import { useState } from "react";

const Like = ({ lweetObj, userObj }) => {
        const [ like, setLike]= useState();

    const onSubmit = async(event) => {
        event.preventDefault();
        const ok = window.confirm("좋아요를 누르시겠습니까?");
        if (ok){
            const post = doc(db , `lweets/${lweetObj.id}`);
            console.log(post.id);
            await addDoc(collection(db, "likes"), {
            post:post.id,
            //uid:userObj.uid,
            createdAt: Date.now(),
        })};
        
        setLike("");

    };

   
    return(
        <form onSubmit={onSubmit}>
            
            <input type = "submit" value = "like" />
        </form>
    )
};
export default Like;