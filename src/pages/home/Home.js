import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Navbar from "../../components/navbar/Navbar";
import PostCard from "../../components/postCard/PostCard";
import PostCardSkeleton from "../../components/postCard/PostCardSkeleton";
import Story from "../../components/stories/Story";
import firebaseContex from "../../context/FirebaseContex";
import "./Home.css";
import { RxCross2 } from "react-icons/rx";
import UserInfoModel from "../../components/userInfoModel/UserInfoModel";
import RightNavbar from "../../components/rightNavbar/RightNavbar";
import SearchBox from "../../components/searchBox/SearchBox";

const Home = () => {
  const { posts, allUsers, loading, postLimit, setPostLimit, postCount } =
    useContext(firebaseContex);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const localUser = JSON.parse(localStorage.getItem("authUser"));
  useEffect(() => {
    if (localUser === null) {
      navigate("/login");
    }
  }, [localUser]);

  const currentUserInfo = allUsers.filter((val) => {
    return localUser?.uid === val.id;
  });

  return (
    <div className="home-page-container">
      <div className="top-photogram-logo">
        <div className="photogram-logo">Okv Photogram</div>
      </div>
      <Navbar />
      <div className="story-post-wrapper">
        <Story />
        <div className="post-conatiner">
          {loading ? (
            <PostCardSkeleton />
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post.data()}
                postId={post.id}
                setAlertMessage={setAlertMessage}
              />
            ))
          )}
        </div>

        {postLimit <= postCount ? (
          <div className="absolute-center">
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setPostLimit(postLimit + 10)}
            >
              Load more post
            </button>
          </div>
        ) : null}
      </div>

      <ImageUpload />
      <SearchBox />

      <RightNavbar currentUserInfo={currentUserInfo} />

      <div className="alert-box" style={{ display: !alertMessage && "none" }}>
        <div className="alert-message-wrapper">{alertMessage}</div>
        <div
          className="alert-cancle-icon align-center cur-point"
          onClick={() => setAlertMessage("")}
        >
          <RxCross2 style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      {loading ? "" : !currentUserInfo.length && <UserInfoModel />}
    </div>
  );
};

export default Home;
