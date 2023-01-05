import React, { useState } from 'react';
import './ImageUpload.css'
import { storage, db,auth } from '../../config/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, } from 'firebase/firestore';


const ImageUpload = () => {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);


  const handleUpload = () => {
    if (!image) {
      alert('select image first')
    }

    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed',
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percentage);
      },
      (error) => {
        console.log(error);
        setImage('')
        setProgress(0)
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
            datePostedOn: serverTimestamp(),

          })

        alert('upload success')
        setImage('')
        setProgress(0)

      }
    );

  }

  
  return (
    <div className="image-upload-container absolute-center" >

      <div className='image-upload-wrapper' >
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
          className='image-select-input' />

        <button
        type='button'
          className='upload-btn login-button cur-point'
          onClick={handleUpload}
        >
          Upload
        </button>
        <p>file upload at {progress}</p>


      </div>

      


    </div>
  )
}

export default ImageUpload