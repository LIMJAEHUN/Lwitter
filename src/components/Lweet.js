import React from 'react';
import { db,storage } from "fbase.js";
import { doc,deleteDoc,  updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage"
import { useState } from "react";


const Lweet = ({ lweetObj, isOwner, userObj }) => {
   
    const [editing, setEditing] = useState(false);
    const [newLweet, setNewLweet] = useState(lweetObj.text);
  

    

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

  

    // const Likes = async() => {
    //     const dbLweets = await getDocs(collection(db, "likes"));
    //      dbLweets.forEach((document) => {
    //        // console.log('%s 이거는',document.data)
    //         const lweetObject = {  id: document.id };
    //         setLike(lweetObject)
    //        // console.log('%s like',lweetObject.id);
    // });
   
    //};
   // console.log('%s like',like.id);

    //console.log('%s 이거는',document.id));
   
     
    
    // useEffect(() => {
      
    // }, []);

      
    
  

    //console.log('%s like',likes.id);
//     const listItems = numbers.map((number) =>
//     <li key={number.toString()}>
//       {number}
//     </li>
//   );

   

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
            
            
        
        
            </>
            )}
            </div>
        </div>
        
    );
};

export default Lweet;

