import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const StorySkeleton = () => {
  const arrayCount = Array(6).fill(1)
  return (
    
      arrayCount.map((val,index)=>
      <div className="story-wrapper" key={index}>
        <div className="story-profile-image-skeleton">
          <Skeleton circle={true} height={50} width={50}/>
        </div>
        <div className="username-wrapper">
          <Skeleton />
        </div>
      </div>
      )
    

      

   
  )
}

export default StorySkeleton