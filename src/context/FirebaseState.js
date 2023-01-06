import React, { useEffect, useState } from 'react'
import firebaseContex from './FirebaseContex'
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut , onAuthStateChanged}
   from "firebase/auth";
import {auth} from '../config/FirebaseConfig'
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from '../config/FirebaseConfig';

const FirebaseState = ({children}) => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [posts, setPosts] = useState([]);
  const [allUsers,setAllUsers] = useState([]);
  
  const signup = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
    
  }

  const login = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logout = () =>{
    localStorage.removeItem('authUser')
    setUser(null)
    return signOut(auth);
  }

   
  // get all posts
   const getAllPosts = ()=>{
    const q = query(collection(db, "posts"));
    // setPosts(querySnapshot.docs)
    
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs);
   })
  //  console.log(posts)
    // posts.map((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    //   console.log(doc.data().imageUrl)
    // });
  }

  // get all users
  const getAllUsers = ()=>{
    const q = query(collection(db, "userinfo"));
    
    onSnapshot(q, (querySnapshot) => {
      setAllUsers(querySnapshot.docs);
   })
  }
  


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
    return () => {
      unsubscribe()
    }
    
  }, [])
  
  useEffect(() => {
    getAllPosts()
    getAllUsers()
  }, [])
  


  


  return (
    <firebaseContex.Provider  value={{signup, login,logout,user,posts,allUsers}}>
      {children}
    </firebaseContex.Provider>
  )
}

export default FirebaseState