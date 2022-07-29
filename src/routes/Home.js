import React from 'react';
import { useEffect, useState } from 'react';
import { db, storage } from "fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Lweet from "components/Lweet";
import { v4 as uuidv4 } from "uuid";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";




const Home = ({userObj}) => {
    
    const [ lweet, setLweet ] = useState("");
    const [ lweets, setLweets ] = useState([]);
    const [ attachment, setAttachment] = useState("");

    // const getLweets = async() => {
    //     const dbLweets = await getDocs(collection(db, "lweets"));
    //     dbLweets.forEach((document) => {
    //         const lweetObject = { ...document.data(), id: document.id };
    //     setLweets((prev) => [lweetObject, ...prev])
    // });
    // }
 


    useEffect(() => {
       // getLweets();
       //db.collection("lweet").onSnapshot((snapshot) =>
        onSnapshot(collection(db,"lweets"), (snapshot) =>
        {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setLweets(newArray);
        });
     
    }, []);

    console.log(lweets);



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
       // console.log("Document written with ID: ", docRef.id);
        
        
        setLweet("");
        setAttachment("");
        // const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        // const response = await uploadString(fileRef, attachment, "data_url");
        // console.log(response);
        // const attachmentUrl = getDownloadURL(ref(storage, `${userObj.uid}/${uuidv4()}`))
       // const attachmentUrl = await response.ref.getDownloadURL();

        };
   
  
    
    
   


    // await addDoc(collection(dbService, "nweets"), {
    //     text: nweet,
    //     createdAt: Date.now(),
    //   });



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
    return (
        <>
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
             <div>
                {lweets.map((lweet) => (
                    // <div key={lweet.id}>
                    //     <h4>{lweet.text}</h4>
                    // </div>
                  
                    <Lweet 
                    key = { lweet.id} 
                    lweetObj={lweet} 
                    isOwner={lweet.creatorID === userObj.uid} 
                    />
                    
                ))}
                
             </div>
             
             </>
    );
};
export default Home;