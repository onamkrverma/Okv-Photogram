import React, { useContext, useState } from 'react'
import './Navbar.css'
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox ,MdOutlineMenu} from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import firebaseContex from '../../context/FirebaseContex'

const Navbar = () => {
  const { logout, isUpload,setIsUpload } = useContext(firebaseContex);
  const [isMenuMore, setIsMenuMore] = useState(false)

  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout()
    navigate('/login')
  }


  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="logo-wrapper">
          <img
            src="/images/Instagram_logo.svg"
            alt="instagram logo"
            className='instagram-logo'
          />
        </div>
        <div className="nav-menu-wrapper">
          <div className='home-menu-wrapper  menu-wrapper'>
            <NavLink to='/' className={({isActive})=> isActive? 'active-link align-center':'align-center'}>
            <div className="icon absolute-center">
              <MdHomeFilled style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">
                Home
            </div>
            </NavLink>

          </div>
          <div className='explore-menu-wrapper menu-wrapper'>
            <NavLink to='/explore' className={({isActive})=> isActive? 'active-link align-center':'align-center'}>
              <div className="icon absolute-center">
              <MdOutlineExplore style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">
               Explore 
              </div>
              </NavLink>
          </div>
          <div className='post-menu-wrapper menu-wrapper'>
            <button
             type='button'
              className='create-btn cur-point'
              title='create post'
              onClick={()=>setIsUpload(!isUpload)}
              >
            <div className="icon absolute-center">
              <MdOutlineAddBox style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">
              Create
            </div>
            </button>
          </div>
          {/* <div className="profile-menu-wrapper menu-wrapper">
            profile
          </div> */}
          <div className="more-menu-wrapper menu-wrapper">
            <button
            type='button'
            title='more options'
            className='more-menue-btn create-btn cur-point'
            onClick={()=>setIsMenuMore(!isMenuMore)}
            >
            <div className=" icon">
              <MdOutlineMenu style={{width:'100%',height:'100%'}}/>
            </div>
            <div className="menu-title">
              More
            </div>
            </button>
            <div className="more-menu-options-wrapper" style={{display: isMenuMore?'flex':'none'}}>
              <div className="logut-wrapper">
                <button
                type='button'
                title='logout'
                className='logout-btn cur-point'
                 onClick={handleLogout}
                 >Logout</button>
              </div>
            </div>


          </div>
          
        </div>
      </div>
    </div>


  )
}

export default Navbar