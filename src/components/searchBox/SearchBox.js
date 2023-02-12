import React, { useContext, useState } from 'react';
import firebaseContex from '../../context/FirebaseContex';
import "./SearchBox.css";
import '../rightNavbar/RightNavbar.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const { isSearch, setIsSearch, allUsers } = useContext(firebaseContex);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filterUsername = allUsers.map((user) => user.data()).filter((val) => (val?.username)?.includes(searchQuery.toLowerCase()));

  const handleRedirect = (username) => {
    navigate(`/profile/${username}`)
    setIsSearch(false)
    setSearchQuery('')
  }

  return (
    <div className='search-box-container' style={{transform:isSearch?'translateX(0px)':''}}>
      <div className="search-box-wrapper">
        <div className="search-title">
          Search user
        </div>
        <button
          type='button'
          title='clear button'
          className='cancel-btn cur-point'
          onClick={() => setIsSearch(false)}
        >
          <RxCross2 style={{ height: '100%', width: '100%' }} />
        </button>
          <div className="search-input ">
            <input
              type="text"
              placeholder='Search user by username'
              aria-label='Search user by username'
              aria-required='true'
              autoComplete='off'
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button
              type='button'
              title='clear button'
              className='clear-btn cancel-btn cur-point'
              onClick={() => setSearchQuery('')}
            >
              <RxCross2 style={{ height: '100%', width: '100%' }} />
            </button>
          </div>
          <div className="search-btn-wrapper" style={{ display: 'none' }}>
            <button type='submit'></button>
          </div>
        
        <div className="line-seperator"></div>
        <div className="search-results-wrapper">
          <div className="result-title search-title">
            Results
          </div>
          <div className="search-results">
            { searchQuery &&
              filterUsername.map((users) =>
                <div className="search-userprofile-follow-wrapper cur-point" key={users.userId} onClick={() => handleRedirect(users.username)}>
                  <div className="userprofile-wrapper">
                    <div className="userprofile-image-wrapper">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="user-profile"
                      />
                    </div>
                    <div className="username-fullname-wrapper">
                      <div className="username-wrapper">
                        {users.username}
                      </div>
                      <div className="fullname-wrapper">
                        {users.fullName}
                      </div>
                    </div>
                  </div>
                </div>
              )

            }
            {!filterUsername.length && <div>No user found</div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox