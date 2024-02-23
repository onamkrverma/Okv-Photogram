import React, { useContext } from 'react'
import './Story.css'
import {FaUserAlt} from 'react-icons/fa'
import firebaseContex from '../../context/FirebaseContex'
import StorySkeleton from './StorySkeleton'

const Story = () => {
  const {allUsers,loading} = useContext(firebaseContex)

  return (
    
    <div className='story-container align-center'>

     { loading ? <StorySkeleton/>
      :
      allUsers.map((user,index)=>

      <div className="story-wrapper" key={index}>
        <div className="story-profile-image">
          <FaUserAlt style={{width:'100%',height:'100%' ,fill:'white'}} />
        </div>
        <div className="username-wrapper">
          {user.data().username}
        </div>
        
      </div>
      )}
      

    </div>
  )
}

export default Story