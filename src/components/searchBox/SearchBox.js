import React, { useContext, useState } from 'react';
import firebaseContex from '../../context/FirebaseContex';
import "./SearchBox.css";
import '../rightNavbar/RightNavbar.css';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const { isSearch, setIsSearch, allUsers } = useContext(firebaseContex);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const filterUsername = allUsers.map((user) => user.data()).filter((val) => (val?.username).includes(searchQuery.toLowerCase()));
    setResults(filterUsername)

    if (!results.length) {
      setResultMessage('No result found')
    }

  }

  const handleRedirect = (username) => {
    navigate(`/profile/${username}`)
    setIsSearch(false)
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
        <form onSubmit={handleSearch}>
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
        </form>
        <div className="line-seperator"></div>
        <div className="search-results-wrapper">
          <div className="result-title search-title">
            Results
          </div>
          <div className="search-results">
            {
              results.map((users) =>
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
            {!results.length && <div>{resultMessage}</div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox