import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { RotatingSquares, default as TopNav } from "../components/TopNav";
import "../style.css";

const CameraModal = ({ onAllow, onDeny }) => (
  <div className="result-modal">
    <div className="result-modal-title">Allow access to your camera?</div>
    <div className="result-modal-btn-row">
      <button className="result-modal-btn" onClick={onDeny}>
        DENY
      </button>
      <button className="result-modal-btn" onClick={onAllow}>
        ALLOW
      </button>
    </div>
  </div>
);

const Result = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraClick = () => navigate("/camera/capture");
  const handleGalleryClick = () =>
    fileInputRef.current && fileInputRef.current.click();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="result-page-root">
      <TopNav />
      <div className="result-center-block result-camera-block">
        <RotatingSquares size={240}>
          <div className="result-image-btn-wrapper">
            <button
              className="result-image-btn camera-btn"
              onClick={handleCameraClick}
            >
              <img
                src="/assets/camera.png"
                alt="Camera"
                className="result-image camera-image"
              />
            </button>
          </div>
        </RotatingSquares>
      </div>
      {/* Gallery Button */}
      <div className="result-center-block result-gallery-block">
        <RotatingSquares size={240}>
          <div className="result-image-btn-wrapper">
            <button
              className="result-image-btn gallery-btn"
              onClick={handleGalleryClick}
            >
              <img
                src="/assets/gallery.png"
                alt="Gallery"
                className="result-image gallery-image"
              />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="result-file-input"
              onChange={handleImageChange}
            />
          </div>
        </RotatingSquares>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="result-preview-modal">
          <div className="result-preview-title">Preview:</div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded preview"
            width="250px"
            className="result-preview-img"
          />
          <button
            className="result-preview-btn"
            onClick={() => setSelectedImage(null)}
          >
            Remove Image
          </button>
        </div>
      )}
      {/* Back Button Bottom Left */}
      <button
        className="result-back-btn"
        onClick={() => navigate("/testing")}
        aria-label="Back to Testing"
      >
        <span className="result-back-arrow">&#8592;</span>
        <span className="result-back-text">BACK</span>
      </button>
    </div>
  );
};

export default Result;
