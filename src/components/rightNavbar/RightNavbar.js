import React from 'react'
import Footer from '../footer/Footer';
import './RightNavbar.css';
import SuggestionList from './suggestionList/SuggestionList';

const RightNavbar = ({currentUserInfo,suggestedUsers}) => {
  
  const shuffleArr = suggestedUsers.sort(()=>0.5-Math.random());
  

  return (
    <div className='rightNavbar-section'>
      <div className='userprofile-suggestion-wrapper'>
        <div className="userprofile-wrapper">
          <div className="userprofile-image-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user-profile"
            />
          </div>

          {currentUserInfo.map((currentUser) =>
            <div className="username-fullname-wrapper" key={currentUser.id}>
              <div className="username-wrapper">
                {currentUser.data().username}
              </div>
              <div className="fullname-wrapper" >
                {currentUser.data().fullName}
              </div>
            </div>

          )}

        </div>

        <div className="suggestion-wrapper">
          <div className="suggestion-title">
            Suggestions For You
          </div>
          <div className="suggestion-user-list">
            {
              shuffleArr.slice(0, 5).map((users) =>
               <SuggestionList users={users.data()} key={users.id} usersId={users.id} />
              )
            }

          </div>
          <Footer/>
        </div>
          
      </div>
    </div>
  )
}

export default RightNavbar