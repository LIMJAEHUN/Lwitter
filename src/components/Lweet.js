import React from 'react';
import { db,storage } from "fbase.js";
import {addDoc, doc, deleteDoc,  updateDoc,onSnapshot,collection } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage"
import { useState } from "react";

const Lweet = ({ lweetObj, isOwner, userObj }) => {
   
    const [editing, setEditing] = useState(false);
    const [newLweet, setNewLweet] = useState(lweetObj.text);
    const [ like, setLike]= useState("");

    const desertRef = ref(storage, lweetObj.attachmentUrl);

    const onLike = async () => {
        const ok = window.confirm("좋아요를 누르시겠습니까?");
        if (ok){
            const data = doc(db , `lweets/${lweetObj.id}`);
            console.log(data.id);
            const likesDB = await addDoc(collection(db, "likes"));
           // console.log(likesDB);
            likesDB.forEach((document) =>
            {
                const likeObject = { ...document.data(), id: document.id, post_id:data.id };
            
            setLike((prev) => [likeObject, ...prev])
           
            console.log(likeObject);
            
        });
    }
        //     onSnapshot(collection(db,"likes"), (snapshot) =>
        //     {
        //     const newLike = snapshot.docs.map((document) => ({
        //         id:document.id,
        //         post_id: data.id,
                
        //         ...document.data(),
        //     }));
        //     console.log(newLike);
        //     setLike("");
        // })}

    };

    // const getLweets = async() => {
    //     const dbLweets = await getDocs(collection(db, "lweets"));
    //     dbLweets.forEach((document) => {
    //         const lweetObject = { ...document.data(), id: document.id };
    //     setLweets((prev) => [lweetObject, ...prev])
    // });
    // }

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        
        if (ok) {
            
            await deleteDoc(doc(db , `lweets/${lweetObj.id}`));
            if (lweetObj.attachmentUrl !=="")
            //await storage.refFromUrl(lweetObj.attachmentUrl).delete();
            await deleteObject(desertRef);
            
            
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const{
            target: { value },
        } = event;
        setNewLweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await  updateDoc(doc(db, `lweets/${lweetObj.id}`), {text: newLweet});
        setEditing(false);
        //await db.doc(`lweets/${lweetObj.id}`).update({text: newLweet});
    };

    return(
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input onChange = {onChange} value={newLweet} required />
                    <input type ="submit" value="Update Lweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>

            ):( 
                <>
            <h4>{lweetObj.text}</h4>
            {lweetObj.attachmentUrl && (
                <img src = {lweetObj.attachmentUrl} width = "50px" height="50px" alt="profile"/>
            )}
          
           { isOwner ? (
                <>
            
            <button onClick = {onDeleteClick}>Delete Lweet </button>
            <button onClick = {toggleEditing}>Update Lweet </button>
            </>
            ):( <input type ="submit" value = "like" onClick = {onLike}></input>
                //<span onClick={() => { setLike(like + 1); }} > 좋아요 {like}</span>
                //<button onClick = {onLike}> 좋아요2 </button>
            )}
            </>
            )}
        </div>
    );
};

export default Lweet;

