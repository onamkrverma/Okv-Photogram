import React, { useContext, useRef, useState } from "react";
import "./ImageUpload.css";
import { storage, db, auth } from "../../config/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loading from "../loading/Loading";
import { RxCross2 } from "react-icons/rx";
import firebaseContex from "../../context/FirebaseContex";
import { encode } from "../../utils/imageOptimizer";

const ImageUpload = () => {
  const { isUpload, setIsUpload } = useContext(firebaseContex);

  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    setMessage("");
    if (image) {
      setLoading(true);
      const imageName = image.name.split(".")[0].replaceAll(" ", "-");
      const encodedWebpImage = await encode(image);
      const storageRef = ref(storage, `/images/${imageName}.webp`);
      const uploadTask = uploadBytesResumable(storageRef, encodedWebpImage, {
        contentType: "image/webp",
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percentage = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
          setCaption("");
          imageRef.current.value = "";
          setProgress(0);
          setLoading(false);
          setMessage(error.message);
        },
        async () => {
          // download url
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // console.log(downloadURL);
          // add image url to database

          await addDoc(collection(db, "posts"), {
            userId: auth.currentUser.uid,
            imageUrl: downloadURL,
            username: auth.currentUser.displayName,
            caption: caption,
            likes: [],
            comments: [],
            datePostedOn: serverTimestamp(),
          });

          setCaption("");
          imageRef.current.value = null;
          setImage("");
          setProgress(0);
          setLoading(false);
          setMessage("Image uploaded successfully ✅");
        }
      );
    }
  };

  const handleClose = () => {
    setCaption("");
    setImage("");
    imageRef.current.value = "";
    setProgress(0);
    setMessage("");
    setIsUpload(false);
    setLoading(false);
  };

  return (
    <div
      className="upload-model-container absolute-center"
      style={{ display: isUpload ? "flex" : "none" }}
    >
      <div className="image-upload-container absolute-center">
        <div className="image-upload-wrapper">
          <textarea
            type="text"
            placeholder="Enter captions (optional)"
            className="caption-textarea"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />
          <input
            type="file"
            title="select image"
            placeholder="select image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/jpeg, image/png, image/webp"
            className="image-select-input"
            ref={imageRef}
          />

          <div className="button-wrapper">
            <button
              type="button"
              title="upload"
              onClick={handleUpload}
              disabled={!image}
              className="upload-btn  cur-point"
              style={{ opacity: (!image || loading) && "0.5" }}
            >
              Upload
            </button>
            {loading && <Loading />}
          </div>

          {progress > 0 && <p>Upload {progress}% completed</p>}
          {message && (
            <div>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        title="cancel button"
        className="cancel-btn cur-point"
        onClick={handleClose}
      >
        <RxCross2 style={{ height: "100%", width: "100%" }} />
      </button>
    </div>
  );
};

export default ImageUpload;
