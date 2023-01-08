import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostCardSkeleton = () => {
  const arrayCount = Array(6).fill(1)
  return (
    
    arrayCount.map((val,index)=>
    <div className='card-container' key={index}>
      <div className="card-wrapper">
        <div className="card-header align-center">
          <div className="image-wrapper absolute-center">
            <Skeleton circle={true} height={42} width={42} />
          </div>
          <div className="profile-username">
            <Skeleton width={65}/>
          </div>
        </div>
        <div className="post-wrapper">
          <Skeleton height={300} />
        </div>
        <div className="card-bottom">
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      </div>
    </div>
    )
  )
}

export default PostCardSkeleton