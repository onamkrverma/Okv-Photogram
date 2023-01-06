import React, { useState } from 'react';
import './ImageUpload.css'
import { storage, db, auth } from '../../config/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, } from 'firebase/firestore';
import Loading from '../loading/Loading';


const ImageUpload = () => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);


  const handleUpload = (e) => {
    
    e.preventDefault()
    if (image) {
      setLoading(true)
      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
          e.target.rest();
          setProgress(0)
          setMessage(error.message)
        },
        async () => {
          // download url
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          console.log(downloadURL);
          // add image url to database

          await addDoc(collection(db, 'posts'),
            {
              userId: auth.currentUser.uid,
              imageUrl: downloadURL,
              username: auth.currentUser.displayName,
              caption: caption,
              likes: 0,
              comments: [],
              datePostedOn: serverTimestamp(),

            })


          e.target.rest();
          setProgress(0);
          setMessage('upload success');
          setLoading(false);

        }
      );
    }

  }


  return (
    <div className="image-upload-container absolute-center" >

      <div className='image-upload-wrapper' >
        <form >
          <textarea
            type="text"
            placeholder='Enter captions'
            className='caption-textarea'
            onChange={(e) => setCaption(e.target.value)}
          />
          <input type="file"
            title='select image'
            placeholder='select image'
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            className='image-select-input' 
            />

          <div className="button-wrapper">
            <button
              type='button'
              title='upload'
              onClick={handleUpload}
              disabled={!image} 
              className='upload-btn login-button cur-point'
              style={{ opacity: (!image || loading) && '0.5' }}
            >
              Upload
            </button>
            {loading && <Loading />}
          </div>
        </form>
        <p>File upload at {progress}</p>
        <div>
          <p>{message}</p>
        </div>

      </div>

    </div>
  )
}

export default ImageUpload