import React, { useContext, useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import firebaseContex from '../../context/FirebaseContex'
import { db, auth} from '../../config/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import usernameChecker from './UsernameCheker'
import { updateProfile } from 'firebase/auth'
import Loading from '../../components/loading/Loading'


const Signup = () => {
  const { signup } = useContext(firebaseContex)
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const invalid = (password.length < 6) || email === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const usernameList = await usernameChecker(username)
    if (!usernameList.length) {
      try {
        const createUser = await signup(email, password);
        localStorage.setItem('authUser',JSON.stringify(createUser.user))
        // add userinfo to firebase database
        await updateProfile(auth.currentUser,{
          displayName: username
        });
        const userRef = doc(db, 'userinfo', createUser.user.uid)
        
        await setDoc(userRef,
          {
            userId: createUser.user.uid,
            email: email.toLowerCase(),
            fullName,
            username: username.toLowerCase(),
            dateCreated: new Date()
          }
        )
        setLoading(false)
        navigate('/')

      } catch (error) {
        console.log(error)
        e.target.reset();
        setLoading(false)
        setErrorMessage(error.message.replace('Firebase:',''));
        setTimeout(() => {
          setErrorMessage('')
        }, 5000);
        
      }
    }
    else {
      setErrorMessage("Username already taken")
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      
    }



  }


  return (
    <div className='login-container'>
      <div className="login-wrapper">
        <div className="login-box">
          <div className="logo-wrapper">
            <img
              src="/images/Instagram_logo.svg"
              alt="instagram logo"
              className='instagram-logo'
            />
          </div>
          <div className="login-form-wrapper">
            <form className='login-form' onSubmit={handleSubmit} >
              <div className="input-label">
                <input
                  type="email"
                  placeholder='Email address'
                  aria-label='Enter your email address'
                  aria-required='true'
                  autoComplete='off'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <div className="input-label">
                <input
                  type="text"
                  placeholder='FullName'
                  aria-label='Enter your full name'
                  aria-required='true'
                  autoComplete='off'
                  name='fullName'
                  onChange={(e) => setFullName(e.target.value)}

                />
              </div>
              <div className="input-label">
                <input
                  type="text"
                  placeholder='Username'
                  aria-label='Enter your full name'
                  aria-required='true'
                  autoComplete='off'
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}

                />
              </div>
              <div className="input-label">
                <input
                  type="password"
                  placeholder='Password'
                  aria-label='Enter your password'
                  aria-required='true'
                  autoComplete='off'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>

              <div className="button-wrapper ">
                <button
                  disabled={invalid}
                  type='submit'
                  className='login-button cur-point'
                  style={{ opacity: invalid && '0.5' }}
                >Sign Up
                </button>
                {loading && <Loading/>}
              </div>

            </form>
            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
          </div>
        </div>
        <div className="redirect-box login-box">
          <div className="redirect-text">
            <p>
              Have an account? <Link to='/login' className='cur-point'>
                Log In</Link>
            </p>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Signup