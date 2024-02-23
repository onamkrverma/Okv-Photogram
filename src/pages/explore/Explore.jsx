import React, { useContext, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Navbar from "../../components/navbar/Navbar";
import SearchBox from "../../components/searchBox/SearchBox";
import firebaseContex from "../../context/FirebaseContex";
import "./Explore.css";
import ExploreCardSkeleton from "./ExploreCardSkeleton";
import LoadingCircle from "../../components/loading/LoadingCircle";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const Explore = () => {
  const { posts, loading, postCount, postLimit, setPostLimit } =
    useContext(firebaseContex);
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    if (localUser === null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [localUser]);

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
    <div className="explore-page-container">
      <div className="top-photogram-logo">
        <div className="photogram-logo">Okv Photogram</div>
      </div>
      <Navbar />
      <ImageUpload />
      <SearchBox />

      <div className="explore-section">
        {loading ? (
          <ExploreCardSkeleton number={6} />
        ) : (
          <>
            {posts.map((post) => (
              <div className="explore-post-container cur-point" key={post.id}>
                <div className="explore-post-image">
                  <img src={post.data().imageUrl} alt="post" />
                </div>
                <div className="like-comments-wrapper ">
                  <div className="like-wrapper align-center">
                    <div className="like-icon absolute-center">
                      <FiHeart
                        style={{ width: "85%", height: "85%", fill: "white" }}
                      />
                    </div>
                    <div className="like-counts">
                      {post.data().likes.length}
                    </div>
                  </div>
                  <div className="comments-wrapper align-center">
                    <div className="comments-icon absolute-center ">
                      <FaComment
                        style={{ width: "85%", height: "85%", fill: "white" }}
                      />
                    </div>
                    <div className="commets-counts">
                      {post.data().comments.length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {postLimit <= postCount ? <LoadingCircle /> : null}
    </div>
  );
};

export default Explore;
