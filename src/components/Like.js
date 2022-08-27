import React from 'react';
import { db } from "fbase.js";
import { doc, collection,addDoc,deleteDoc,getDocs,query, where,updateDoc } from "firebase/firestore";
import { useState } from "react";


const Like = ({ lweetObj, userObj,likecount }) => {
    //const [ likes, setLikes]= useState([]);
    const [ likemg, setLikemg]= useState(0);
    // const [ likemg, setLikemg]= useState(() => JSON.parse(window.localStorage.getItem("likemg")) || 0);

    //     useEffect(() => {
    //         window.localStorage.setItem("likemg", JSON.stringify(likemg));
    //     }, [likemg]);

      

      
        
        

    const onLike = async(event) => {
        //event.preventDefault();
        const ok = window.confirm("좋아요를 누르시겠습니까?");
        console.log('%suserObj',userObj);
        if (ok){
            const post = doc(db , `lweets/${lweetObj.id}`);
            console.log('%post',post.id);
            await addDoc(collection(db, "likes"), {
            post:post.id,
            uid:userObj.uid,
            createdAt: Date.now(),
        }
       
        )
       
        await updateDoc(doc(db, `lweets/${lweetObj.id}`), {likeCount:likecount+1});
        setLikemg(1);
    };
   
    
}


const togglelike = async() => {
    const ok = window.confirm("좋아요 취소?");
  
  
    if (ok) {
        const q = query(collection(db, "likes"), where("uid", "==", userObj.uid), where("post", "==", lweetObj.id));
        const data = await getDocs(q);
        if (data.docs.length !== 0){
                await deleteDoc(data.docs[0].ref);
            }
    }
    await updateDoc(doc(db, `lweets/${lweetObj.id}`), {likeCount:likecount-1});
    setLikemg((prev) => !prev);
 
}


// useEffect(async() => {
    
//     const q = query(collection(db, "likes"), where("uid", "==", userObj.uid), where("post", "==", lweetObj.id));
//     console.log("%s qqq",q)
//     const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//         const likeObject = {  id: doc.id };
//         console.log("%s likeObject:", likeObject.id);
//         setLikes(likeObject)
//         });
  
   
// }, []);
      

    return(
        <div>
          { likemg ? ( 
              <button onClick = {togglelike}> Lweet Cancel {likecount}</button>
              //<button onClick={() => togglelike(likemg - 1)}>Lweet Cancel{likemg}</button>
                ):( 
                 <button onClick = {onLike}> Lweet like{likecount} </button>
                //<button onClick={() => onLike(likemg + 1)}>Lweet like{likemg}</button>
               
                )
                }
        </div>
    )
};
export default Like;