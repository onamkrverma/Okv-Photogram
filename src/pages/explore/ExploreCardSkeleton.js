import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from 'react'

const ExploreCardSkeleton = ({number}) => {
  const arrayCount = Array(number).fill(1)


  return (
    arrayCount.map((val,index)=>
    <div className='explore-post-container' key={index} style={{border:'none'}}>
      <div className="explore-post-image">
        <Skeleton height={'100%'}/>
      </div>

    </div>
    )
    
  )
}

export default ExploreCardSkeleton