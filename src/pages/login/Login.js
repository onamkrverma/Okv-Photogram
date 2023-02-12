import { sendEmailVerification } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Loading from '../../components/loading/Loading'
import { auth } from '../../config/FirebaseConfig'
import firebaseContex from '../../context/FirebaseContex'
import './Login.css'
import '../signup/Signup.css';

const Login = () => {
  const { login, facebookLogin } = useContext(firebaseContex)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);

  const localUser = JSON.parse(localStorage.getItem('authUser'))
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()


  const invalid = (password.length < 6) || email === '';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const loginUser = await login(email, password);
      if (auth.currentUser.emailVerified) {
        localStorage.setItem('authUser', JSON.stringify(loginUser.user))
        setLoading(false)
        navigate('/')
      }
      else {
        setErrorMessage('Your email not verified yet.')
        await sendEmailVerification(auth.currentUser)
        setLoading(false)
        setIsEmailSend(true)
        // wait until email verify
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            localStorage.setItem('authUser', JSON.stringify(loginUser.user))
            navigate('/')
            setIsEmailSend(false)
          }
          await auth.currentUser.reload()
        }, 2000);
      }


    } catch (error) {
      e.target.reset();
      setLoading(false)
      setErrorMessage(error.message.replace('Firebase:', ''));
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }

  }


  const handleFacebookLogin = async () => {
    try {
      const facebookLoginUser = await facebookLogin();
      localStorage.setItem('authUser', JSON.stringify(facebookLoginUser.user));
      navigate('/');
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message.replace('Firebase:', ''))
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
          {!isEmailSend ?
          
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
                {loading && <Loading />}

              </div>
            </form>
            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
          </div>
          :
          // email send confirmation
          <div className="signup-confirm-email-wrapper">
            <div className="confirm-email-image-wrapper">
              <img
                src="/images/confirm-email.svg"
                alt="confirm-email"
                className='confirm-email-image'
              />
            </div>
            <div className='confirm-email-message'>
              Your Email not Verified yet, So Please verify email first.
              Varification link send to your email (check inbox or spam folder).
            </div>

          </div>
          }
          <div className='seprator'>OR</div>
          <div className="facebook-login-wrapper">
            <button
              type='button'
              onClick={handleFacebookLogin}
              className='facebook-login-btn login-button cur-point align-center'
            >
              <span className="facebook-icon">
                <FaFacebookSquare style={{ width: '100%', height: '100%' }} />
              </span>
              Login with facebook
            </button>
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
        <div className="guest-login-info-wrapper login-box" 
        style={{display:'none'}}>
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


      <Footer />
    </div>

  )
}

export default Login