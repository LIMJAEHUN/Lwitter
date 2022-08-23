import React from 'react';
import { db,storage } from "fbase.js";
import { doc, collection,addDoc,deleteDoc,  updateDoc, onSnapshot,getDocs } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage"
import { useState, useEffect } from "react";
//import Like from "components/Like.js";

const Lweet = ({ lweetObj, isOwner, userObj }) => {
   
    const [editing, setEditing] = useState(false);
    const [newLweet, setNewLweet] = useState(lweetObj.text);
    //const [ like, setLike]= useState([]);
    const [ likes, setLikes]= useState([]);
    //const [ liketotal, setliketotal] =  useState(lweetObj.total);
    const [ likemg, setLikemg]= useState(0);

    

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

        // if(userObj.uid === doc(db , `likes/${lweetObj.id}`);) 
       
    };
    //updateDoc(doc(db, `lweets/${lweetObj.id}`), {total: liketotal});
    setLikemg(1);
}

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
    
  

    //console.log('%s like',likes.id);
//     const listItems = numbers.map((number) =>
//     <li key={number.toString()}>
//       {number}
//     </li>
//   );

    const togglelike = async() => {
        const ok = window.confirm("좋아요 취소?");
      
        if (ok) {
            console.log('%s 아이디2',likes.map((like) => like.id));
            const LikeData = likes.map((like)  => <li likeonj = {like}  key ={ like.id} /> )
            console.log('%s LikeData',LikeData.likeonj);
           const data = await deleteDoc(doc(db , `likes/${LikeData.id}`));
           //const test = await doc(db,`likes/${likeID}`);
            console.log('%s data',data);
        };
        setLikemg((prev) => !prev);
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

