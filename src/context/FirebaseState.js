import React, { useEffect, useState } from 'react'
import firebaseContex from './FirebaseContex'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged, FacebookAuthProvider, signInWithPopup,
}
  from "firebase/auth";
import { auth } from '../config/FirebaseConfig'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../config/FirebaseConfig';

const FirebaseState = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem('authUser'));
  const [user, setUser] = useState(localUser);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // for toggle upload model
  const [isUpload, setIsUpload] = useState(false);
  // for toggle search model
  const [isSearch, setIsSearch] = useState(false);
  // for loading
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);

  }

  // login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // login with facebook
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }


  const logout = () => {
    localStorage.removeItem('authUser')
    setUser(null)
    return signOut(auth);
  }


  // get all posts order by posted date 
  const getAllPosts = () => {
    const postRef = collection(db, "posts");
    const q = query(postRef, orderBy("datePostedOn", "desc"));

    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs);
      setLoading(false);
    });

  }

  // get all users info
  const getAllUsers = () => {
    const q = query(collection(db, "userinfo"));

    onSnapshot(q, (querySnapshot) => {
      setAllUsers(querySnapshot.docs);
      setLoading(false)
    })
  }




  useEffect(() => {
    const unsubscribe = () => onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem('authUser', JSON.stringify(currentUser))
      }
      else {
        localStorage.removeItem('authUser')
        setUser(null);
      }

    });
    return () => {
      unsubscribe()
    }

  }, [])

  useEffect(() => {
    getAllPosts();
    getAllUsers();

  }, [])



  return (
    <firebaseContex.Provider
      value={{
        signup, login, logout, user, posts,
        allUsers, isUpload, setIsUpload, loading, setLoading,
        facebookLogin, isSearch, setIsSearch
      }}>
      {children}
    </firebaseContex.Provider>
  )
}

export default FirebaseState