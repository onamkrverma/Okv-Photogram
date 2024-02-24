import React, { useRef, useState } from "react";
import "./PostCard.css";
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../config/FirebaseConfig";
import { Link } from "react-router-dom";
import {
  HiOutlineFaceSmile,
  HiOutlineChatBubbleOvalLeft,
  HiOutlinePaperAirplane,
  HiHeart,
} from "react-icons/hi2";

const PostCard = ({ post, postId, setAlertMessage }) => {
  const [likesCount, setLikesCount] = useState(post.likes);
  const [comments, setComments] = useState("");
  const [isClick, setIsClick] = useState(false);
  const inputRef = useRef(null);
  const isLiked = post.likes.filter(
    (value) => auth.currentUser.displayName === value.username
  );

  const handleLikes = async () => {
    setIsClick(true);
    try {
      // if already liked then remove like onclick
      if (isLiked.length !== 0) {
        setLikesCount(likesCount - 1);
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayRemove({
            username: auth.currentUser.displayName,
          }),
        });
      }
      // if not liked then add like onclick
      else {
        setLikesCount(likesCount + 1);
        await updateDoc(doc(db, "posts", postId), {
          likes: arrayUnion({
            username: auth.currentUser.displayName,
          }),
        });
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
    }

    setTimeout(() => {
      setIsClick(false);
    }, 1000);
  };

  const handleCommentClick = () => {
    inputRef.current.focus();
  };

  const handlePostComments = async () => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion({
          username: auth.currentUser.displayName,
          comment: comments,
        }),
      });
      setComments("");
      // console.log('comments updates')
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
      setComments("");
    }
  };

  const handleShare = async (username, caption) => {
    const shareData = {
      title: "Okv Photogram",
      text: `One amazing post is posted by "${username}" with caption: "${caption}", visit given link to view`,
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
    }
  };

  return (
    <div className="card-container">
      <div className="card-wrapper">
        <div className="card-header align-center ">
          <div className="image-wrapper absolute-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user-profile"
            />
          </div>
          <Link to={`/profile/${post.username}`}>
            <div className="profile-username cur-point">{post.username}</div>
          </Link>
        </div>
        <div
          className="post-wrapper absolute-center cur-point"
          onDoubleClick={handleLikes}
        >
          <img src={post.imageUrl} alt="post" />
          <div
            className="large-like-icon"
            style={{ display: isClick ? "block" : "none" }}
          >
            <HiHeart
              fill="red"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>
        <div className="card-bottom">
          <div className="post-like-comments-wrapper align-center">
            <div className="like-icon absolute-center">
              <button
                type="button"
                title="like"
                onClick={handleLikes}
                className="like-btn cur-point"
              >
                <HiHeart
                  fill={isLiked.length > 0 ? "red" : "none"}
                  strokeWidth={isLiked.length > 0 ? "0" : "1.5"}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </button>
            </div>

            <div
              className="comments-icon absolute-center cur-point"
              onClick={handleCommentClick}
            >
              <HiOutlineChatBubbleOvalLeft
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div
              className="share-icon absolute-center cur-point"
              onClick={() => handleShare(post.username, post.caption)}
            >
              <HiOutlinePaperAirplane
                transform="rotate(-40 0 0)"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="like-count-wrapper ">{post.likes.length} Likes</div>
          <div className="post-date-wrapper">
            {post.datePostedOn?.toDate()?.toDateString()}
          </div>
          <div className="username-caption-wrapper align-center ">
            <div className="profile-username">{post.username}</div>
            <div className="caption-wrapper">{post.caption}</div>
          </div>

          {post.comments?.map((data, index) => (
            <div className="comments-display-section align-center" key={index}>
              <p className="profile-username">{data.username}</p>
              <p className="comments-wrapper caption-wrapper">{data.comment}</p>
            </div>
          ))}
        </div>
        <div className="post-comments-wrapper align-center">
          <div className="smile-icon">
            <HiOutlineFaceSmile style={{ width: "100%", height: "100%" }} />
          </div>
          <input
            type="text"
            className="comments-input"
            placeholder="Add a comment"
            onChange={(e) => setComments(e.target.value)}
            value={comments ?? ""}
            ref={inputRef}
            min={1}
            maxLength={50}
          />

          <button
            disabled={comments.length <= 0}
            onClick={handlePostComments}
            type="button"
            className="comments-post-btn cur-point"
            style={{ opacity: comments.length <= 0 && "0.5" }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
