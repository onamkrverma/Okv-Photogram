import React from 'react'
import './Navbar.css'
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({isUpload,setIsUpload,logout}) => {

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
            <div className="icon absolute-center">
              <MdHomeFilled style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">
              <Link to='/'>
                Home
              </Link>

            </div>

          </div>
          <div className='explore-menu-wrapper menu-wrapper'>
            <div className="icon absolute-center">
              <MdOutlineExplore style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">Explore</div>
          </div>
          <div className='post-menu-wrapper menu-wrapper'>
            <button
             type='button'
              className='create-btn cur-point'
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
          <div className="profile-menu-wrapper menu-wrapper">
            {/* profile */}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>


  )
}

export default Navbar