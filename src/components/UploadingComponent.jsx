import React, { useState, useEffect } from 'react';
import './UploadingComponent.css';
import SuccessMessage from './SuccessMessage';

const UploadingComponent = (props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 20;
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100
          return prevProgress;
        }
      });
    }, 500);

    return () => {
     
      clearInterval(interval);
    };
  }, []);
  if (progress>=100){
   return <SuccessMessage imageUrl={props.url}/>
  }
  return (
    <div className="uploading-component">
      <h2>Uploading...</h2>
      <p>Your image is being uploaded. Please wait.</p>
    
        <div className="progress-bar">
          <div className="filler-bar" style={{ width: `${progress}%` }}></div>
        </div>
   
    </div>
  );
};

export default UploadingComponent;
