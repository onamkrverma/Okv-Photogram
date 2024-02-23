import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProfileSkeleton = () => {
  return (
    <div className='profile-datails-wrapper absolute-center'>
      <div className="user-image-wrapper">
        <Skeleton circle={true} height={'100%'} />
      </div>
      <div className='user-details-wrapper'>
        <div className="username-wrapper">
          <Skeleton width={100} />
        </div>
        <div className="posts-followers-details-wrapper absolute-center">
          <div className="total-posts-wrapper total-wrapper">
            <Skeleton width={50} />
          </div>
          <div className="total-followers-wrapper total-wrapper">
            <Skeleton width={50} />
          </div>
          <div className="total-following-wrapper total-wrapper">
            <Skeleton width={50} />
          </div>
        </div>
        <div className="user-fullname-wrapper">
          <Skeleton width={100} />
        </div>

      </div>

    </div>
  )
}

export default ProfileSkeleton