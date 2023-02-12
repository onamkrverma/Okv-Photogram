import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../../../config/FirebaseConfig';
import Loading from '../../loading/Loading';

import './SuggestionList.css'

const SuggestionList = ({users,usersId}) => {
  const [loading, setLoading] = useState(false);
  const isFollower = (users.follower)?.filter((value)=>(value?.username) === (auth.currentUser.displayName));

  
  const handleClick = async(username,userId)=>{
   setLoading(true)
    if(!isFollower.length){
      await updateDoc(doc(db, 'userinfo', auth.currentUser.uid), {
        following: arrayUnion({
          username,
        })
      });
      await updateDoc(doc(db, 'userinfo', userId), {
        follower: arrayUnion({
          username:auth.currentUser.displayName,
        })
      });
      
    }
    else{
      await updateDoc(doc(db, 'userinfo', auth.currentUser.uid), {
        following: arrayRemove({
          username,
        })
      });
      await updateDoc(doc(db, 'userinfo', userId), {
        follower: arrayRemove({
          username:auth.currentUser.displayName,
        })
      });
    }
    setLoading(false)
  }

  return (
    <div className="userprofile-follow-wrapper" >
      <div className="userprofile-wrapper">
        <div className="userprofile-image-wrapper">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user-profile"
          />
        </div>
        <div className="username-fullname-wrapper">
          <div className="username-wrapper">
            {users.username}
          </div>
          <div className="fullname-wrapper">
            {users.fullName}
          </div>
        </div>
      </div>
      <div className="follow-unfollow-btn-wrapper ">
        <button
          type='button'
          className='follow-unfollow-btn cur-point'
          onClick={() => handleClick(users.username, usersId)}
        >
          {isFollower?.length?'Unfollow':'Follow'}
        </button>
        {loading && <Loading/>}
      </div>
    </div>


  )
}

export default SuggestionList