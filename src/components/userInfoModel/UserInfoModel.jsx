import React, { useState } from "react";
import "./UserInfoModel.css";
import "../../pages/login/Login.css";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../config/FirebaseConfig";
import usernameChecker from "../../pages/signup/UsernameCheker";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../loading/Loading";

const UserInfoModel = () => {
  const localUser = JSON.parse(localStorage.getItem("authUser"));
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState(localUser?.displayName);
  const [isModel, setIsModel] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const invalid = username === "" || fullName === "";

  const handleClick = async () => {
    try {
      setLoading(true);
      const usernameList = await usernameChecker(username);
      if (!usernameList.length) {
        await updateProfile(auth.currentUser, {
          displayName: username.toLowerCase().trim(),
        });

        // add userinfo to firebase database
        const userRef = doc(db, "userinfo", localUser.uid);
        await setDoc(userRef, {
          userId: localUser.uid,
          email: localUser.email,
          fullName: fullName.trim(),
          username: username.toLowerCase().trim(),
          follower: [],
          following: [],
          authProvider: "UserinfoModel",
          dateCreated: new Date(),
        });
        setLoading(false);
        setIsModel(false);
      } else {
        setLoading(false);
        setErrorMessage("Username already taken");
        setUsername("");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <div
      className="set-username-fullname-model absolute-center"
      style={{ display: isModel ? "flex" : "none" }}
    >
      <div className="set-username-fullname-wrapper">
        <div className="set-username-fullname-box login-box ">
          <div className="model-title">Update FullName and Username !</div>

          <div className="input-label">
            <input
              type="text"
              placeholder="FullName"
              aria-label="Enter your fullname"
              aria-required="true"
              autoComplete="off"
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
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
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyDown={(e) => e.code === "Space" && e.preventDefault()}
            />
          </div>
          <div className="button-wrapper">
            <button
              type="button"
              className="login-button cur-point"
              onClick={handleClick}
              disabled={invalid}
              style={{ opacity: invalid && 0.5 }}
            >
              Update
            </button>
            {loading && <Loading />}
          </div>
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserInfoModel;
