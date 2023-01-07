import React, { useState } from 'react'
import './PostCard.css';
import { FiHeart, FiSmile } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { updateDoc,arrayUnion, doc } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';


const PostCard = ({ post, postId }) => {
  const [likesCount, setLikesCount] = useState(post.likes)
  const [comments, setComments] = useState('')
  const loaclUser = JSON.parse(localStorage.getItem('authUser'))

  const invalid = (comments === '');

  const handleLikes = async () => {
    setLikesCount(likesCount + 1)
    try {
      await updateDoc(doc(db, 'posts', postId), {
        likes: likesCount,
      });
      console.log('likes updates')
    } catch (error) {
      console.log(error)
    }

  }

  const handlePostComments = async () => {

    try {
      await updateDoc(doc(db, 'posts',postId), {
      
        comments: arrayUnion ({
            username: loaclUser.displayName,
            comment: comments
          })
        
           
         
      });
      setComments('')
      console.log('comments updates')
    } 
    catch (error) {
      console.log(error)
      setComments('')
    }

  }

  // console.log(post)


  return (
    <div className='card-container'>
      <div className="card-wrapper">
        <div className="card-header align-center">
          <div className="image-wrapper absolute-center">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
          </div>
          <div className="profile-username">
            {post.username}
          </div>
        </div>
        <div className="post-wrapper">
          <img src={post.imageUrl} alt="post" />
        </div>
        <div className="card-bottom">
          <div className="post-like-comments-wrapper align-center">
              <div className="like-icon absolute-center">
              <button 
              type='button'
              title='like'
              onClick={handleLikes}
              className='like-btn cur-point'>
                <FiHeart 
                style={{ width: '100%', height: '100%', fill: post.likes > 0 && 'red', color: post.likes > 0 && 'red' }} 
                />
              </button>
              </div>
            
            <div className="comments-icon absolute-center">
              <FaRegComment style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
          <div className="like-count-wrapper ">
            {post.likes} Likes
          </div>
          <div className="username-caption-wrapper align-center ">
            <div className="profile-username">
              {post.username}
            </div>
            <div className="caption-wrapper">
              {post.caption}
            </div>
          </div>

          {
            post.comments?.map((data, index) =>
              <div className="comments-display-section align-center" key={index}>
                <div className="profile-username">
                  {data.username}
                </div>
                <div className="comments-wrapper caption-wrapper">
                  {data.comment}
                </div>
              </div>
            )
          }


        </div>
        <div className="post-comments-wrapper align-center">
          <div className="smile-icon">
            <FiSmile style={{ width: '100%', height: '100%' }} />
          </div>
          <input
            type="text"
            className="comments-input"
            placeholder='Add a comment'
            onChange={(e) => setComments(e.target.value)} 
            value={comments ?? ''}/>

          <button
            disabled={invalid}
            onClick={handlePostComments}
            type='button'
            className='comments-post-btn cur-point'
            style={{ opacity: invalid && '0.5' }}
          >Post
          </button>
        </div>

      </div>
    </div>
  )
}

export default PostCard