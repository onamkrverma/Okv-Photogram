import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

const ExploreCardSkeleton = () => {
  const arrayCount = Array(6).fill(1)


  return (
    arrayCount.map((val,index)=>
    <div className='explore-post-container' key={index} style={{border:'none'}}>
      <div className="explore-post-image">
        <Skeleton height={206}/>
      </div>

    </div>
    )
    
  )
}

export default ExploreCardSkeleton