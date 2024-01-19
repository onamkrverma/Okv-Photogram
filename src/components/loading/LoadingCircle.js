import React from "react";
import "./LoadingCircle.css";

const LoadingCircle = () => {
  return (
    <div className="loading-circle absolute-center">
      <svg width="100px" height="100px" className="svg-circle">
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke="#0095f6"
          strokeWidth="3"
          strokeDasharray="70.68583470577033 25.561944901923447"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingCircle;
