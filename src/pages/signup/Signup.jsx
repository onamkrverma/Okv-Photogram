import React, { useContext, useEffect, useState } from "react";
import "./Signup.css";
import "../login/Login.css";
import { Link } from "react-router-dom";
import firebaseContex from "../../context/FirebaseContex";
import { db, auth } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import usernameChecker from "./UsernameCheker";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import Loading from "../../components/loading/Loading";
import Footer from "../../components/footer/Footer";
import { RiMailSendFill } from "react-icons/ri";

const Signup = () => {
  const { signup } = useContext(firebaseContex);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);

  const invalid =
    password.length < 6 || email === "" || fullName === "" || username === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const usernameList = await usernameChecker(username);
    if (!usernameList.length) {
      try {
        const createUser = await signup(email, password);
        await updateProfile(auth.currentUser, {
          displayName: username.toLowerCase().trim(),
        });

        await sendEmailVerification(createUser.user);

        setIsEmailSend(true);

        // wait until email verify
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);

            localStorage.setItem("authUser", JSON.stringify(createUser.user));

            // add userinfo to firebase database
            const userRef = doc(db, "userinfo", createUser.user.uid);
            await setDoc(userRef, {
              userId: createUser.user.uid,
              email: email.toLowerCase(),
              fullName: fullName.trim(),
              username: username.toLowerCase().trim(),
              follower: [],
              following: [],
              authProvider: "Email and password",
              dateCreated: new Date(),
            });
            window.location.href = "/login";
            setIsEmailSend(false);
          }
          await auth.currentUser.reload();
        }, 2000);
      } catch (error) {
        setErrorMessage(error.message.replace("Firebase:", ""));
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Username already taken");
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    document.title = "Signup • Okv Photogram";
  }, []);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-box">
          <div className="logo-wrapper">
            <div className="photogram-logo">Okv Photogram</div>
          </div>

          {!isEmailSend ? (
            <div className="login-form-wrapper">
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-label">
                  <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Enter your email address"
                    aria-required="true"
                    autoComplete="off"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-label">
                  <input
                    type="text"
                    placeholder="FullName"
                    aria-label="Enter your full name"
                    aria-required="true"
                    autoComplete="off"
                    name="fullName"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="input-label">
                  <input
                    type="text"
                    placeholder="Username"
                    aria-label="Enter your username"
                    aria-required="true"
                    autoComplete="off"
                    name="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.code === "Space" && e.preventDefault()}
                  />
                </div>
                <div className="input-label">
                  <input
                    type="password"
                    placeholder="Password"
                    aria-label="Enter your password"
                    aria-required="true"
                    autoComplete="off"
                    name="password"
                    required
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button-wrapper ">
                  <button
                    disabled={invalid}
                    type="submit"
                    className="login-button cur-point"
                    style={{ opacity: (invalid || loading) && "0.5" }}
                  >
                    Sign Up
                  </button>
                  {loading && <Loading />}
                </div>
              </form>
              {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            </div>
          ) : (
            // email send confirmation
            <div className="signup-confirm-email-wrapper">
              <RiMailSendFill size={100} color="#0095f6" />
              <p className="confirm-email-message">
                Please check your inbox or spam folder for the verification
                link. You need to verify your email first 📧🔍
              </p>
            </div>
          )}
        </div>
        <div className="redirect-box login-box">
          <div className="redirect-text">
            <p>
              Have an account?{" "}
              <Link to="/login" className="cur-point">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
