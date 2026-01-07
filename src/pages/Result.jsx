import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { RotatingSquares, default as TopNav } from "../components/TopNav";
import "../style.css";

const CameraModal = ({ onAllow, onDeny }) => (
  <div className="result-modal">
    <div className="result-modal-title">ALLOW A.I. TO ACCESS YOUR CAMERA?</div>
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

const WebcamCaptureModal = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // Load image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("capturedImage");
    if (savedImage) {
      setImgSrc(savedImage);
    }
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    localStorage.setItem("capturedImage", imageSrc);
  };

  const retake = () => {
    setImgSrc(null);
    localStorage.removeItem("capturedImage");
  };

  return (
    <div className="result-modal" style={{ justifyContent: "flex-end" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {imgSrc ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={imgSrc}
              alt="captured"
              style={{
                maxWidth: 400,
                maxHeight: 300,
                borderRadius: 8,
                marginBottom: 24,
              }}
            />
            <button className="result-modal-btn" onClick={retake}>
              Retake Photo
            </button>
            <button
              className="result-modal-btn"
              style={{ marginTop: 12 }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              height={300}
              style={{ borderRadius: 8, marginBottom: 24 }}
            />
            <button className="result-modal-btn" onClick={capture}>
              TAKE PICTURE
            </button>
            <button
              className="result-modal-btn"
              style={{ marginTop: 12 }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
          TO GET BETTER RESULTS MAKE SURE TO HAVE
        </div>
        <div
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            display: "flex",
            gap: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>◇ NEUTRAL EXPRESSION</span>
          <span>◇ FRONTAL POSE</span>
          <span>◇ ADEQUATE LIGHTING</span>
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  const handleCameraClick = () => setShowCameraModal(true);
  const handleGalleryClick = () =>
    fileInputRef.current && fileInputRef.current.click();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleAllow = () => {
    setShowCameraModal(false);
    setShowWebcam(true);
  };
  const handleDeny = () => {
    setShowCameraModal(false);
  };
  const handleWebcamClose = () => {
    setShowWebcam(false);
  };

  return (
    <div className="result-page-root">
      <TopNav />
      <div className="result-center-block result-camera-block">
        <RotatingSquares size={240}>
          <div className="result-image-btn-wrapper">
            <button
              className="result-image camera-btn"
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
              className="result-image gallery-btn"
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

      {/* Webcam Modal Flow */}
      {showCameraModal && (
        <CameraModal onAllow={handleAllow} onDeny={handleDeny} />
      )}
      {showWebcam && <WebcamCaptureModal onClose={handleWebcamClose} />}

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
