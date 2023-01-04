import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

const usernameChecker = async(username)=>{
const q = query(collection(db, "userinfo"), where("username", "==", username));

const querySnapshot = await getDocs(q);

  // console.log(querySnapshot)
  
  return querySnapshot.docs;

}

export default usernameChecker;