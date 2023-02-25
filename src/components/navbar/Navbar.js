import React, { useContext, useState } from 'react';
import './Navbar.css';
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox, MdOutlineMenu } from 'react-icons/md';
import {GrSearch} from 'react-icons/gr';
import { NavLink, useNavigate } from 'react-router-dom';
import firebaseContex from '../../context/FirebaseContex';
import { auth } from '../../config/FirebaseConfig';

const Navbar = () => {
  const { logout, isUpload, setIsUpload,isSearch, setIsSearch } = useContext(firebaseContex);
  const [isMenuMore, setIsMenuMore] = useState(false)

  const navigate = useNavigate();

  const handleLogout = async() => {
    navigate('/login');
    await logout();
  }


  return (
    <div className="navbar-container" style={{width:isSearch && '80px'}}>
      <div className="navbar-wrapper">
        <div className="logo-wrapper" style={{textAlign:isSearch && 'center'}}>
         {isSearch ? <img
            src={'/images/photogram-logo.png'}
            alt="instagram logo"
            className='photogram-logo'
            style={{width: isSearch && '40px',height:isSearch && '40px'}}
          />
          :
          <div className="photogram-logo" style={{width: isSearch && '40px',height:isSearch && '40px'}}>
            Okv Photogram
          </div>
          }
        </div>
        <div className="nav-menu-wrapper">
          <div className='home-menu-wrapper  menu-wrapper'>
            <NavLink to='/' className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
              <div className="icon absolute-center">
                <MdHomeFilled style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`} >
                Home
              </div>
            </NavLink>

          </div>
          <div className='search-menu-wrapper menu-wrapper'>
            <button
              type='button'
              className='create-btn cur-point'
              title='search user'
              onClick={() => setIsSearch(!isSearch)}
            >
              <div className="icon absolute-center">
                <GrSearch style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`} >
                Search
              </div>
            </button>
          </div>


          <div className='explore-menu-wrapper menu-wrapper'>
            <NavLink to='/explore' className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
              <div className="icon absolute-center">
                <MdOutlineExplore style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`} >
                Explore
              </div>
            </NavLink>
          </div>
          <div className='post-menu-wrapper menu-wrapper'>
            <button
              type='button'
              className='create-btn cur-point'
              title='create post'
              onClick={() => setIsUpload(!isUpload)}
            >
              <div className="icon absolute-center">
                <MdOutlineAddBox style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`} >
                Create
              </div>
            </button>
          </div>
          <div className="profile-menu-wrapper menu-wrapper">
          <NavLink to={`/profile/${auth.currentUser?.displayName}`} className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
            <div className="user-image-wrapper absolute-center icon">
              <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
            </div>
            <div className={`menu-title ${isSearch && 'hide-content'}`} >
              Profile
            </div>
            </NavLink>
          </div>
          <div className="more-menu-wrapper menu-wrapper">
            <button
              type='button'
              title='more options'
              className='more-menue-btn create-btn cur-point'
              onClick={() => setIsMenuMore(!isMenuMore)}
            >
              <div className=" icon">
                <MdOutlineMenu style={{ width: '100%', height: '100%' }} />
              </div>
              <div className={`menu-title ${isSearch && 'hide-content'}`} >
                More
              </div>
            </button>
            <div className="more-menu-options-wrapper" style={{ display: isMenuMore ? 'flex' : 'none' }}>
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