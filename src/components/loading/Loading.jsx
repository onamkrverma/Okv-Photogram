import React from 'react';
import './Loading.css'

const Loading = () => {
  return (
    <div className="loading-spinner-wrapper">
      <img
        src="/images/loadSpinner.svg"
        alt="load spinner"
        className='loading-image'
      />
    </div>
  )
}

export default Loading