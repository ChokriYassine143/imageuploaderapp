import React, { useState } from 'react';
import './SuccessMessage.css';
import { Link } from 'react-router-dom';
const SuccessMessage = (props) => {
  const [link,setlink]=useState(props.imageUrl.slice(0,-20)+"...")
  const handleCopyLink = () => {
    navigator.clipboard.writeText(props.imageUrl)
    .then(() => {
      console.log('Link copied to clipboard!');
    })
    .catch((error) => {
      console.error('Copy failed:', error);
    });
  };
  function changelink(){
    setlink(props.imageUrl);
  }
  return (
    <div className="success-message">
      <div className="success-icon">&#10004;</div>
      <h3>Uploaded Successfully!</h3>
      <img src={props.imageUrl} alt="Uploaded Preview" className="preview-image" />
      <div className="link-container">
        <p  onClick={changelink} className="link-text">
         {link}
        </p>
        <button className="copy-link-button" onClick={handleCopyLink}>
          Copy Link
        </button>
      </div>
     
    
       
    </div>
  );
};

export default SuccessMessage;
