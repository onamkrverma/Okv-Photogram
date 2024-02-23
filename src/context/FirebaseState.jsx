import React, { useEffect, useState } from "react";
import firebaseContex from "./FirebaseContex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import {
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const FirebaseState = ({ children }) => {
  const localUser = JSON.parse(localStorage.getItem("authUser"));
  const [user, setUser] = useState(localUser);
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [postLimit, setPostLimit] = useState(10);
  const [postCount, setPostCount] = useState(null);
  // for toggle upload model
  const [isUpload, setIsUpload] = useState(false);
  // for toggle search model
  const [isSearch, setIsSearch] = useState(false);
  // for loading
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with facebook
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    return signOut(auth);
  };

  // get posts order by posted date
  const getPostsByLimit = () => {
    const postRef = collection(db, "posts");
    const q = query(postRef, orderBy("datePostedOn", "desc"), limit(postLimit));
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs);
      setLoading(false);
    });
  };
  // get total post count
  const getPostCount = async () => {
    const coll = collection(db, "posts");
    const snapshot = await getCountFromServer(coll);
    setPostCount(snapshot.data().count);
  };

  // get all users info
  const getAllUsers = () => {
    const q = query(collection(db, "userinfo"));

    onSnapshot(q, (querySnapshot) => {
      setAllUsers(querySnapshot.docs);
      setLoading(false);
    });
  };

  // get random user for suggested user
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const getRandomUsers = () => {
    if (!localUser) return;
    const q = query(
      collection(db, "userinfo"),
      where("username", "!=", localUser.displayName),
      limit(5)
    );

    onSnapshot(q, (querySnapshot) => {
      setSuggestedUsers(querySnapshot.docs);
      setLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribe = () =>
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          localStorage.setItem("authUser", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("authUser");
          setUser(null);
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getPostsByLimit();
  }, [postLimit]);

  useEffect(() => {
    getPostCount();
    getAllUsers();
    getRandomUsers();
  }, []);

  return (
    <firebaseContex.Provider
      value={{
        signup,
        login,
        logout,
        user,
        posts,
        allUsers,
        isUpload,
        setIsUpload,
        loading,
        setLoading,
        facebookLogin,
        isSearch,
        setIsSearch,
        suggestedUsers,
        setPostLimit,
        postLimit,
        postCount,
      }}
    >
      {children}
    </firebaseContex.Provider>
  );
};

export default FirebaseState;
