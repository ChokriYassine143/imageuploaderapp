import React, { useRef,useEffect,useState} from 'react';
import './ImageUploader.css'; // Import your CSS file for styling
import axios from 'axios';
import UploadingComponent from './UploadingComponent';
const ImageUploader = () => {
  const [ImageUploadedUrl,setImageUploadedUrl]=useState("");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }
    setSelectedFile(e.target.files[0])
}
useEffect(() => {
  if (!selectedFile) {
      setPreview(undefined)
      return
  }

  const objectUrl = URL.createObjectURL(selectedFile)
  setPreview(objectUrl)
  return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setSelectedFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };
async function handleupload(){
  const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('https://chokriyassine143-imageuploaderapi.onrender.com/uploadimage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      
      let uploadedimage="https://chokriyassine143-imageuploaderapi.onrender.com"+response.data.editedImageUrl;
      setImageUploadedUrl(uploadedimage);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
}
  return (
    ImageUploadedUrl.length !== 0 ? (
      <UploadingComponent url={ImageUploadedUrl}/>
    ) : (
      <div className="uploader-outer-container">
        <div className="uploader-inner-container">
          <h2>Upload Your Image</h2>
          <p>File should be Jpeg, Png, etc.</p>
          {selectedFile ? (
            <img src={preview} width="338px" height="218.903px" alt="Uploaded" />
          ) : (
            <div className="drag-drop-container"   onDragOver={handleDragOver}
            onDrop={handleDrop}>
       
            </div>
          )}
          <div className="button-container">
            <button className="button" onClick={() => fileInputRef.current.click()}>
              Choose Image
            </button>
            {selectedFile && (
              <button className="button" onClick={handleupload}>
                Upload Image
              </button>
            )}
            <input
              onChange={onSelectFile}
              ref={fileInputRef}
              type="file"
              accept=".jpeg, .jpg, .png"
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    )
    

  );
};

export default ImageUploader;
