import React from 'react'
import './PostCard.css';


const PostCard = ({ post }) => {
  return (
    <div className='card-container'>
      <div className="card-wrapper">
        <div className="card-header">
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
          <div className="username-caption-wrapper">
            <div className="profile-username">
              {post.username}
            </div>
            <div className="caption-wrapper">
              {post.caption}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostCard