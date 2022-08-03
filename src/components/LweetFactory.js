import React from "react";
import { useState } from 'react';
import { db, storage } from "fbase.js";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";


const LweetFactory = ({ userObj }) => {
    const [ lweet, setLweet ] = useState("");
    const [ attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== ""){
        const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, 'data_url');
        console.log(response);
        attachmentUrl = await getDownloadURL(response.ref)
        }
        
        await addDoc(collection(db, "lweets"), {
        text: lweet,
        createdAt: Date.now(),
        creatorID: userObj.uid,
        attachmentUrl,
        });
        
        setLweet("");
        setAttachment("");
        };
        const onChange = (event) => {
            event.preventDefault();
            const {
                target: { value },
            } = event;
            setLweet(value);
        };
        const onFileChange = (event) => {
            const {
             target: { files },
            } = event;
            const theFile = files[0];
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
             const {
                 currentTarget: {result},
             } = finishedEvent;
             setAttachment(result);
            }
            reader.readAsDataURL(theFile);
         };
         const onClearAttachment = () => setAttachment("");
    return(
        <form onSubmit={onSubmit}>
        <input
         value ={lweet}
         onChange = {onChange}
         type = "text"
         placeholder="What's on your mind?"
         maxLength={120} />
         <input type = "file" accept="image/*" onChange={onFileChange}/>
         <input type ="submit" value = "Lweet" />
         {attachment && (
         <div>
         <img src={attachment} width="50px" height={"50px"} alt="profile"/>
         <button onClick={onClearAttachment}>Clear</button>
         </div>
         )}
         </form>
    );

};

export default LweetFactory;