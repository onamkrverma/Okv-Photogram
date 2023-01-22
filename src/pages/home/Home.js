import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import Navbar from '../../components/navbar/Navbar';
import PostCard from '../../components/postCard/PostCard';
import PostCardSkeleton from '../../components/postCard/PostCardSkeleton';
import Story from '../../components/stories/Story';
import firebaseContex from '../../context/FirebaseContex';
import './Home.css'
import { RxCross2 } from 'react-icons/rx';
import UserInfoModel from '../../components/userInfoModel/UserInfoModel';
import RightNavbar from '../../components/rightNavbar/RightNavbar';
import SearchBox from '../../components/searchBox/SearchBox';


const Home = () => {
  const { posts, allUsers, loading } = useContext(firebaseContex);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  const localUser = JSON.parse(localStorage.getItem('authUser'))


  useEffect(() => {
    if (localUser === null) {
      navigate('/login')
    }
  }, [localUser])

  const suggestedUsers = allUsers.filter((val) => {
    return (localUser?.uid) !== (val.id);
  })

  const currentUserInfo = allUsers.filter((val) => {
    return (localUser?.uid) === (val.id);
  })


  return (
    <div className='home-page-container'>
      <div className="top-instagram-logo">
        <img
          src="/images/Instagram_logo.svg"
          alt="instagram logo"
          className='instagram-logo'
        />
      </div>
      <Navbar />
      <div className='story-post-wrapper'>
        <Story />
        <div className="post-conatiner">
          {loading ? <PostCardSkeleton />
            :
            posts.map((post) =>
              <PostCard key={post.id} post={post.data()} postId={post.id} setAlertMessage={setAlertMessage} />
            )
          }
        </div>
      </div>

      <ImageUpload />
      <SearchBox/>

      <RightNavbar currentUserInfo={currentUserInfo} suggestedUsers={suggestedUsers} localUser={localUser}/>

      <div className="alert-box" style={{ display: !alertMessage && 'none' }}>
        <div className="alert-message-wrapper">
          {alertMessage}
        </div>
        <div className="alert-cancle-icon align-center cur-point" onClick={() => setAlertMessage('')}>
          <RxCross2 style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {loading ? '' : (!currentUserInfo.length && <UserInfoModel />)}


    </div>
  )
}

export default Home