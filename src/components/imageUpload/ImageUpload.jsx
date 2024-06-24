import React, { useContext, useEffect, useRef, useState } from "react";
import "./ImageUpload.css";
import { storage, db, auth } from "../../config/FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Loading from "../loading/Loading";
import { RxCross2 } from "react-icons/rx";
import firebaseContex from "../../context/FirebaseContex";
import { encode } from "../../utils/imageOptimizer";
import { IoCloudUploadOutline } from "react-icons/io5";

const ImageUpload = () => {
  const { isUpload, setIsUpload } = useContext(firebaseContex);

  const [selectedFile, setSelectedFile] = useState("");
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  useEffect(() => {
    // disable body scroll
    document.body.style.overflow = isUpload ? "hidden" : "auto";
  }, [isUpload]);

  const handleUpload = async () => {
    setMessage("");
    if (selectedFile) {
      setLoading(true);
      const imageName = selectedFile.name.split(".")[0].replaceAll(" ", "-");
      const encodedWebpImage = await encode(selectedFile);
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
          setSelectedFile("");
          setSelectedFileUrl("");
          setProgress(0);
          setLoading(false);
          setMessage("Image uploaded successfully ✅");
        }
      );
    }
  };

  const handleClose = () => {
    if (imageRef.current) {
      setCaption("");
      setSelectedFile("");
      imageRef.current.value = "";
      setProgress(0);
      setMessage("");
      setIsUpload(false);
      setLoading(false);
      setSelectedFileUrl("");
    }
  };

  useEffect(() => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      const imageUrl = reader.result;
      setSelectedFileUrl(imageUrl);
    };
  }, [selectedFile]);

  return (
    <div
      className="upload-model-container absolute-center"
      style={{ display: isUpload ? "flex" : "none" }}
    >
      <div className="image-upload-container absolute-center">
        <div className="image-upload-wrapper">
          <div className="image-upload absolute-center">
            {selectedFileUrl.length > 0 ? (
              <img src={selectedFileUrl} alt="selected-file" />
            ) : (
              <>
                <IoCloudUploadOutline size={50} />
                <small> supports: jpeg, png, webp</small>
                <label htmlFor="image" className="browse-btn">
                  Browse
                </label>
              </>
            )}
            <input
              id="image"
              type="file"
              title="select image"
              placeholder="select image"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="image/jpeg, image/png, image/webp"
              className="image-select-input"
              ref={imageRef}
              hidden
            />
          </div>
          <div className="image-caption-wrapper">
            <div className="user-profile align-center ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="user-profile"
              />
              <p className="">{auth.currentUser?.displayName}</p>
            </div>

            <textarea
              type="text"
              placeholder="Enter captions (optional)"
              className="caption-textarea"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
          </div>
        </div>
        <div className="button-wrapper absolute-center">
          <button
            type="button"
            title="upload"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="upload-btn  cur-point"
            style={{ opacity: (!selectedFile || loading) && "0.5" }}
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
