import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import firebaseContex from '../../context/FirebaseContex'
import './Login.css'

const Login = () => {
  const { login } = useContext(firebaseContex)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()


  const invalid = (password.length < 6) || email === '';



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/')

    } catch (error) {
      e.target.reset();
      setErrorMessage(error.message)
    }

  }


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
                  style={{ opacity: invalid && '0.5' }}
                >Log In
                </button>
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
      </div>
    </div>

  )
}

export default Login