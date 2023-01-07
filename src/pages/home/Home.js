import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import Navbar from '../../components/navbar/Navbar';
import PostCard from '../../components/postCard/PostCard';
import PostCardSkeleton from '../../components/postCard/PostCardSkeleton';
import Story from '../../components/stories/Story';
import firebaseContex from '../../context/FirebaseContex';
import './Home.css'

const Home = () => {
  const { posts, allUsers, loading } = useContext(firebaseContex);
  const navigate = useNavigate()

  // const [isUpload, setIsUpload] = useState(false);

  const loaclUser = JSON.parse(localStorage.getItem('authUser'))

  useEffect(() => {
    if (loaclUser === null) {
      navigate('/login')
    }
  }, [loaclUser])



  const filterCurrentUser = allUsers.filter((value) => {
    return (loaclUser?.uid).includes(value.id)

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
              <PostCard key={post.id} post={post.data()} postId={post.id} />
            )
          }
        </div>
      </div>

      <ImageUpload />

      <div className='userprofile-suggestion-wrapper'>
        <div className="userprofile-wrapper">
          <div className="userprofile-image-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user-profile"
            />
          </div>

          {filterCurrentUser.map((currentUser) =>
            <div className="username-fullname-wrapper" key={currentUser.id}>
              <div className="username-wrapper">
                {currentUser.data().username}
              </div>
              <div className="fullname-wrapper" >
                {currentUser.data().fullName}
              </div>
            </div>

          )}

        </div>

        <div className="suggestion-wrapper">
          <div className="suggestion-title">
            Suggestions For You
          </div>
          <div className="suggestion-user-list">
            {
              allUsers.slice(0, 5).map((users) =>
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