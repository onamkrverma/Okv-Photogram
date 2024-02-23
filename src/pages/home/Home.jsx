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
import LoadingCircle from "../../components/loading/LoadingCircle";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const Home = () => {
  const { posts, allUsers, loading, postLimit, setPostLimit, postCount } =
    useContext(firebaseContex);
  const [alertMessage, setAlertMessage] = useState("");

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const currentUserInfo = allUsers.filter((val) => {
    return authUser?.uid === val.id;
  });

  // infinite scroll custom hook
  const infiniteScroll = useInfiniteScroll();

  useEffect(() => {
    const handleScroll = () =>
      infiniteScroll({
        postLimit,
        postCount,
        setPostLimit,
        increaseLimitBy: 10,
      });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postLimit, postCount, infiniteScroll, setPostLimit]);

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

        {postLimit <= postCount ? <LoadingCircle /> : null}
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
