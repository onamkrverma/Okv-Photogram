import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "instagram-clone-a8b82.firebaseapp.com",
  projectId: "instagram-clone-a8b82",
  storageBucket: "instagram-clone-a8b82.appspot.com",
  messagingSenderId: "705527732931",
  appId: "1:705527732931:web:073a12ebb8053c41a1a076",
  measurementId: "G-SXP4CMXNE2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
