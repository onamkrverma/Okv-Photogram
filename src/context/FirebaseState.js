import React, { useEffect, useState } from 'react'
import firebaseContex from './FirebaseContex'
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut , onAuthStateChanged}
   from "firebase/auth";
import {auth} from '../config/FirebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/FirebaseConfig';

const FirebaseState = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [posts, setPosts] = useState([])
  
  const signup = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
    
  }

  const login = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logout = () =>{
    return signOut(auth);
  }

   
  // get all posts
   const getAllPosts = async()=>{
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs)
    // querySnapshot.docs.map((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   console.log(doc.data().imageUrl)
    // });
  }

  // console.log('post',posts)


  useEffect(() => {
    const unsubscribe = ()=> onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser){
        localStorage.setItem('authUser',JSON.stringify(currentUser))
      }
      else{
        localStorage.removeItem('authUser')
        setUser(null);
      }
      
    });
    getAllPosts();
  
    return () => {
      unsubscribe()
    }
    
  }, [posts])
  

 

  


  return (
    <firebaseContex.Provider  value={{signup, login,logout,user,posts}}>
      {children}
    </firebaseContex.Provider>
  )
}

export default FirebaseState