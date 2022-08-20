import React from 'react';
import { db,storage } from "fbase.js";
import { doc, collection,addDoc,deleteDoc,  updateDoc, onSnapshot } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage"
import { useState, useEffect } from "react";
//import Like from "components/Like.js";

const Lweet = ({ lweetObj, isOwner, userObj,likes,likekey }) => {
   
    const [editing, setEditing] = useState(false);
    const [newLweet, setNewLweet] = useState(lweetObj.text);
    const [ like, setLike]= useState();
    //const [ liketotal, setliketotal] =  useState(lweetObj.total);
    const [ likemg, setlikemg]= useState(false);

    

    const desertRef = ref(storage, lweetObj.attachmentUrl);

   

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        
        if (ok) {
            
            await deleteDoc(doc(db , `lweets/${lweetObj.id}`));
            if (lweetObj.attachmentUrl !=="")
            //await storage.refFromUrl(lweetObj.attachmentUrl).delete();
            await deleteObject(desertRef);
            
            
        };
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
        setLike(post);
    };
    //updateDoc(doc(db, `lweets/${lweetObj.id}`), {total: liketotal});
    setlikemg(true);
        
  

    };

        useEffect(() => {
        onSnapshot(collection(db,"likes"), (snapshot) =>
        {
            const newLike = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
                
            }));
            console.log('%s 라이크' ,newLike.id);
            setLike(newLike.id);
        });
     
    }, []);


    const togglelike = async() => {
        const ok = window.confirm("좋아요 취소?");
       
        console.log('%s 아이디',like.id);
      
        if (ok) {
            //console.log('%s 아이디',likes.id);
           //const data = await deleteDoc(doc(db , `likes/${like.id}`));
           await deleteDoc(doc(db, 'likes', like.id));
          // console.log('%s data',data.id);
        };
        setlikemg((prev) => !prev);
    }

    return(
        <div className='body'>
            <div className='column'>
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
          
           { isOwner && (
                <>
            
            <button onClick = {onDeleteClick}>Delete Lweet </button>
            <button onClick = {toggleEditing}>Update Lweet </button>
            </>
            )
        }
                { likemg ? ( 
              <button onClick = {togglelike}> Lweet Cancel </button>
                ):( 
                    <button onClick = {onLike}> Lweet like </button>
               
                )
                }
            
            
        
        
            </>
            )}
            </div>
        </div>
        
    );
};

export default Lweet;

