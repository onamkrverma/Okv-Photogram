import React, { useContext, useState } from 'react';
import { storage ,db} from '../../config/FirebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp,} from 'firebase/firestore';
import firebaseContex from '../../context/FirebaseContex';

const ImageUpload = () => {
  const {user} = useContext(firebaseContex)
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
      (error) =>{
        console.log(error);
        setImage('')
        setProgress(0)
      } ,
      async() => {
        // download url
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          console.log(downloadURL);
          // add image url to database
          
          await addDoc(collection(db,'posts'),
          {
            userId: user.uid,
            imageUrl: downloadURL,
            username: user.displayName,
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
    <div className='image-upload-wrapper'>
      <input
       type="text" 
       placeholder='Enter captions'
       onChange={(e)=> setCaption(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} accept='images/*' />
      
      <button onClick={handleUpload}>Upload</button>
      <p>file upload at {progress}</p>
    </div>
  )
}

export default ImageUpload