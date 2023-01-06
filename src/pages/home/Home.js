import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import Navbar from '../../components/navbar/Navbar';
import PostCard from '../../components/postCard/PostCard';
import Story from '../../components/stories/Story';
import firebaseContex from '../../context/FirebaseContex';
import './Home.css'
import { RxCross2 } from 'react-icons/rx';

const Home = () => {
  const { logout, posts, allUsers } = useContext(firebaseContex);
  const navigate = useNavigate()

  const [isUpload, setIsUpload] = useState(false);

  const loaclUser = JSON.parse(localStorage.getItem('authUser'))

  useEffect(() => {
    if (loaclUser === null) {
      navigate('/login')
    }
  }, [loaclUser])



  const filterCurrentUser = allUsers.filter((value)=>{
    return (loaclUser?.uid).includes(value.id)
    
  })


  

  return (
    <div className='home-page-container'>
      <Navbar isUpload={isUpload} setIsUpload={setIsUpload} logout={logout} />
      <div className='story-post-wrapper'>
        <Story />
        <div className="post-conatiner">
          {
            posts.map((post) =>
              <PostCard key={post.id} post={post.data()} postId={post.id}/>
            )
          }
        </div>



      </div>

      <div className="upload-model-container absolute-center" style={{ display: isUpload ? 'flex' : 'none' }} >
        <ImageUpload isUpload={isUpload} setIsUpload={setIsUpload} />
        <button
          type='button'
          title='cancel button'
          className='cancel-btn cur-point'
          onClick={() => setIsUpload(false)}
        >
          <RxCross2 style={{ height: '100%', width: '100%' }} />
        </button>
      </div>



      <div className='userprofile-suggestion-wrapper'>
        <div className="userprofile-wrapper">
          <div className="userprofile-image-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user-profile"
            />
          </div>
          <div className="username-fullname-wrapper">
            <div className="username-wrapper">
              {loaclUser?.displayName}
            </div>
            {
              filterCurrentUser.map((name)=>
              <div className="fullname-wrapper" key={name.id}>
              {name.data().fullName}
            </div>
              )
            }
            
          </div>
        </div>

        <div className="suggestion-wrapper">
          <div className="suggestion-title">
            Suggestions For You
          </div>
          <div className="suggestion-user-list">
            {
              allUsers.slice(0,5).map((users) =>
                <div className="userprofile-wrapper" key={users.id}>
                  <div className="userprofile-image-wrapper">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="user-profile"
                    />
                  </div>
                  <div className="username-fullname-wrapper">
                    <div className="username-wrapper">
                      {users.data().username}
                    </div>
                    <div className="fullname-wrapper">
                      {users.data().fullName}
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        </div>

      </div>




    </div>
  )
}

export default Home