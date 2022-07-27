import React from 'react';
import { db } from "fbase";
import { doc, deleteDoc,  updateDoc } from "firebase/firestore";
import { useState } from "react";

const Lweet = ({ lweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newLweet, setNewLweet] = useState(lweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        console.log(ok);
        if (ok) {
            console.log(lweetObj.id);
            const data = await deleteDoc(doc(db , `lweets/${lweetObj.id}`));
            
            console.log(data);
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
            {isOwner && (
                <>
            <button onClick = {onDeleteClick}>Delete Lweet </button>
            <button onClick = {toggleEditing}>Update Lweet </button>
            </>
            )}
            </>
            )}
        </div>
    );
};

export default Lweet;