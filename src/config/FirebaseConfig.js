import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVyjmwiwg1RY0kNybQMq5SxptFkM-rTz8",
  authDomain: "instagramclone-b0a88.firebaseapp.com",
  projectId: "instagramclone-b0a88",
  storageBucket: "instagramclone-b0a88.appspot.com",
  messagingSenderId: "32571036107",
  appId: "1:32571036107:web:8a1404ff480764db18264e"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
export  {app,auth,db};