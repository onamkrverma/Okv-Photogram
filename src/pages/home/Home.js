import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import PostCard from '../../components/postCard/PostCard';
import Story from '../../components/stories/Story';
import firebaseContex from '../../context/FirebaseContex';
import './Home.css'

const Home = () => {
  const { user, logout ,posts} = useContext(firebaseContex);
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])



  return (
    <div className='home-page-container'>
      <Navbar />
      <section className='story-post-wrapper'>
        <Story />
        {
          posts.map((post)=>
          <PostCard key={post.id} post={post.data()}/>
          )
        }
        
      </section>



      {/* <button onClick={()=>logout()}>Logout</button> */}
    </div>
  )
}

export default Home