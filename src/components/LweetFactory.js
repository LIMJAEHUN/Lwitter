import React from "react";
import { useState } from 'react';
import { db, storage } from "fbase.js";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import "../css/Layout.css";

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
        likeCount: 0,
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
        <div className="body">
            <form onSubmit={onSubmit}>
                <div className="factory-form">
                    <div className="input-text">
                        <input  value ={lweet} onChange = {onChange} type = "text" placeholder="What's on your mind?" maxLength={120}/>
                    </div>

                    <div className="input-file">
                        <label className="input-file-button" htmlFor="input-file">이미지 업로드</label>
                        <input type = "file" style={{display:"none"}} id="input-file" accept="image/*" onChange={onFileChange}/>
                    </div>
                    <label className="input-file-button" htmlFor="input-twite">트윗</label>
                    <input type ="submit" style={{display:"none"}} id="input-twite" value = "Lweet"/>
                </div>    
                {attachment && ( 
                <div className="input-image">
                <img src={attachment} width="50%" height={"50%"} alt="profile"/>
                <button onClick={onClearAttachment}>Clear</button>
                </div>
                )}
                
            </form>
         </div>
    );

};

export default LweetFactory;