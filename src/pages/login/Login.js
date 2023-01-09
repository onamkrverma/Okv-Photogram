import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Loading from '../../components/loading/Loading'
import firebaseContex from '../../context/FirebaseContex'
import './Login.css'

const Login = () => {
  const { login } = useContext(firebaseContex)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const localUser = JSON.parse(localStorage.getItem('authUser'))
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()


  const invalid = (password.length < 6) || email === '';

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const loginUser = await login(email, password);
      localStorage.setItem('authUser',JSON.stringify(loginUser.user))
      // console.log('loginuser',loginUser )
      setLoading(false)
      navigate('/')

    } catch (error) {
      e.target.reset();
      setLoading(false)
        setErrorMessage(error.message.replace('Firebase:',''));
        setTimeout(() => {
          setErrorMessage('')
        }, 5000);
    }

  }

  

  useEffect(() => {
    if (localUser) {
      navigate('/')
    }
  }, [localUser])


  return (
    <div className='login-container'>
      <div className="login-poster">
        <img
          src="/images/iphone.png"
          alt="iphone-poster"
          className='login-poster-image'
        />
      </div>
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
            <form className='login-form' onSubmit={handleSubmit}>
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
                  style={{ opacity: (invalid || loading) && '0.5' }}
                >
                  Log In
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
              Don't have an account? <Link to='/signup' className='cur-point'>
                Sign up</Link>
            </p>
          </div>

        </div>
        <div className="guest-login-info-wrapper login-box">
          <div className="title">
            Create new account or login as a guest
          </div>
          <div className="guest-login-credential">
          <div className="guest-email">
            <p>Email: guest@gmail.com</p>
          </div>
          <div className="guest-password">
            <p>Password: guest@1234</p>
          </div></div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}

export default Login