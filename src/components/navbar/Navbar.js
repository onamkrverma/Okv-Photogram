import React from 'react'
import './Navbar.css'
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ImageUpload from '../imageUpload/ImageUpload'

const Navbar = () => {
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
            <div className="icon absolute-center">
              <MdOutlineAddBox style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="menu-title">Create</div>
          </div>
          <div className="profile-menu-wrapper menu-wrapper">
            {/* profile */}
          </div>
          <ImageUpload />
        </div>
      </div>
    </div>


  )
}

export default Navbar