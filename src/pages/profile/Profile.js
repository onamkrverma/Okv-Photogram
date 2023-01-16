import React, { useContext, useEffect, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import ImageUpload from '../../components/imageUpload/ImageUpload'
import Navbar from '../../components/navbar/Navbar'
import firebaseContex from '../../context/FirebaseContex'
import ExploreCardSkeleton from '../explore/ExploreCardSkeleton'
import './Profile.css'
import '../explore/Explore.css'
import ProfileSkeleton from './ProfileSkeleton'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'


const Profile = () => {
  const { allUsers, loading ,setLoading} = useContext(firebaseContex);
  const localUser = JSON.parse(localStorage.getItem('authUser'))
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

   // get current user's posts
   const getCurrentUserPosts = ()=>{
    const postRef = collection(db,"posts");
    const q = query(postRef,where('username','==',localUser.displayName));
    
    onSnapshot(q, (querySnapshot) => {
      setCurrentUserPosts(querySnapshot.docs);
      setLoading(false);
   });
  }


  const currentUserInfo = allUsers.filter((val) => {
    return (localUser?.uid) === (val.id);
  })

  useEffect(() => {
    getCurrentUserPosts()
  }, [])
  


  return (
    <div className='profile-page-section'>
      <div className="top-instagram-logo">
        <img
          src="/images/Instagram_logo.svg"
          alt="instagram logo"
          className='instagram-logo'
        />
      </div>
      <Navbar />
      <ImageUpload />


      <div className="profile-page-container">
        {
          loading ? <ProfileSkeleton />
            :
            currentUserInfo.map((currentUser) =>
              <div className="profile-datails-wrapper absolute-center" key={currentUser.id}>
                <div className="profile-image-wrapper">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
                </div>

                <div className="profile-details-wrapper" >
                  <div className="profile-username-wrapper">
                    {currentUser.data().username}
                  </div>
                  <div className="posts-followers-details-wrapper absolute-center">
                    <div className="total-posts-wrapper total-wrapper">
                      {currentUserPosts.length} Post
                    </div>
                    <div className="total-followers-wrapper total-wrapper">
                      N/A followers
                    </div>
                    <div className="total-following-wrapper total-wrapper">
                      N/A following
                    </div>

                  </div>
                  <div className="profile-fullname-wrapper">
                    {currentUser.data().fullName}
                  </div>

                </div>

              </div>
            )

        }
        <div className="posts-list-section">

          <div className="posts-list-title">
            Posts
          </div>
          <div className="posts-list-container">
            {
              loading ? <ExploreCardSkeleton number={3} />
                :
                currentUserPosts.map((post) =>
                  <div className="post-list-wrapper explore-post-container cur-point" key={post.id} >
                    <div className="explore-post-image">
                      <img src={post.data().imageUrl} alt="post" />
                    </div>
                    <div className="like-comments-wrapper ">
                      <div className="like-wrapper align-center">
                        <div className="like-icon absolute-center">
                          <FiHeart style={{ width: '85%', height: '85%', fill: 'white' }} />
                        </div>
                        <div className="like-counts">
                          {post.data().likes.length}
                        </div>
                      </div>
                      <div className="comments-wrapper align-center">
                        <div className="comments-icon absolute-center ">
                          <FaComment style={{ width: '85%', height: '85%', fill: 'white' }} />
                        </div>
                        <div className="commets-counts">
                          {post.data().comments.length}
                        </div>
                      </div>
                    </div>
                  </div>

                )}
            {!currentUserPosts.length && <p> No Post available</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile