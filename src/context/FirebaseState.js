import React, { useEffect, useState } from 'react'
import firebaseContex from './FirebaseContex'
import {createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut , onAuthStateChanged}
   from "firebase/auth";
import {auth} from '../config/FirebaseConfig'
const FirebaseState = ({children}) => {
  const [user, setUser] = useState();

  const signup = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
    
  }

  const login = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logout = () =>{
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      if(currentUser){
        setUser(currentUser);
      }
      else{
        setUser(null);
      }
      
    })
  
    return () => {
      unsubscribe()
    }
  }, [])
  


  return (
    <firebaseContex.Provider  value={{signup, login,logout,user}}>
      {children}
    </firebaseContex.Provider>
  )
}

export default FirebaseState