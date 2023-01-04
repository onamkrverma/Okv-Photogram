import React from 'react'
import './Story.css'
import {FaUserAlt} from 'react-icons/fa'

const Story = () => {

  const arrlength = Array(5).fill(1)


  return (
    <div className='story-container absolute-center'>
      {arrlength.map((val,index)=>

      <div className="story-wrapper" key={index}>
        <div className="story-profile-image">
          <FaUserAlt style={{width:'100%',height:'100%' ,fill:'white'}} />
        </div>
        <div className="username-wrapper">
          username
        </div>
        
      </div>
      )}
      

    </div>
  )
}

export default Story