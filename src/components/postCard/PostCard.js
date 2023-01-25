import React, { useState } from 'react'
import './PostCard.css';
import { FiHeart, FiSend, FiSmile } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db, auth } from '../../config/FirebaseConfig';
import { Link } from 'react-router-dom';


const PostCard = ({ post, postId, setAlertMessage }) => {
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comments, setComments] = useState('');
  const [isClick, setIsClick] = useState(false);


  const invalid = (comments === '');
  const isLiked = (post.likes).filter((value) => (auth.currentUser.displayName) === (value.username))




  const handleLikes = async () => {
    setIsClick(true);
    try {
      // if already liked then remove like onclick
      if (isLiked.length !== 0) {
        setLikesCount(likesCount - 1)
        await updateDoc(doc(db, 'posts', postId), {
          likes: arrayRemove({
            username: auth.currentUser.displayName,
          }),
        });


      }
      // if not liked then add like onclick
      else {
        setLikesCount(likesCount + 1)
        await updateDoc(doc(db, 'posts', postId), {
          likes: arrayUnion({
            username: auth.currentUser.displayName,
          }),
        });
      }
    }
    catch (error) {
      console.log(error)
      setAlertMessage(error.message)
    }

    setTimeout(() => {
      setIsClick(false)
    }, 1000);
  }

  const handlePostComments = async () => {

    try {
      await updateDoc(doc(db, 'posts', postId), {

        comments: arrayUnion({
          username: auth.currentUser.displayName,
          comment: comments
        })
      });
      setComments('')
      // console.log('comments updates')
    }
    catch (error) {
      console.log(error)
      setAlertMessage(error.message)
      setComments('')
    }

  }




  const handleShare = async (username, caption) => {
    const shareData = {
      'title': 'Instagram Clone',
      'text': `One amazing post is posted by ${username} with caption ${caption} follow link to view`,
      'url': document.location.href,
    }
    try {
      await navigator.share(shareData)
    } catch (error) {
      console.log(error)
      setAlertMessage(error.message)
    }
  }

  return (
    <div className='card-container'>
      <div className="card-wrapper">
        <div className="card-header align-center " >
          <div className="image-wrapper absolute-center">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
          </div>
          <Link to={`/profile/${post.username}`} >
          <div className="profile-username cur-point">
            {post.username}
          </div>
        </Link>
      </div>
      <div className="post-wrapper absolute-center cur-point" onDoubleClick={handleLikes}>
        <img src={post.imageUrl} alt="post" />
        <div className="large-like-icon" style={{ display: isClick ? 'block' : 'none' }}>
          <FiHeart style={{ width: '100%', height: '100%', fill: 'white', color: 'white' }}
          />
        </div>
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
                style={{
                  width: '100%', height: '100%',
                  fill: isLiked.length > 0 && 'red', color: isLiked.length > 0 && 'red'
                }}
              />
            </button>
          </div>

          <div className="comments-icon absolute-center">
            <FaRegComment style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="share-icon absolute-center cur-point" onClick={() => handleShare(post.username, post.caption)}>
            <FiSend style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <div className="like-count-wrapper ">
          {post.likes.length} Likes
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
          value={comments ?? ''} />

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
    </div >
  )
}

export default PostCard