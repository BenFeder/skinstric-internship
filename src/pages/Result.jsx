import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { RotatingSquares, default as TopNav } from "../components/TopNav";
import "../style.css";

// Simple CameraModal for camera permission
const CameraModal = ({ onAllow, onDeny }) => (
  <div className="result-modal">
    <div className="result-modal-content">
      <h2>Allow Camera Access?</h2>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <button className="result-modal-btn" onClick={onAllow}>
          Allow
        </button>
        <button className="result-modal-btn" onClick={onDeny}>
          Deny
        </button>
      </div>
    </div>
  </div>
);

// GalleryApproveModal for gallery image approval and upload
const GalleryApproveModal = ({ file, onRemove }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleApprove = async () => {
    setIsPosting(true);
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      localStorage.setItem("capturedImage", base64);
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );
      if (!response.ok) throw new Error("API error");
      const result = await response.json();
      if (result && result.data) {
        localStorage.setItem("apiData", JSON.stringify(result.data));
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onRemove();
        navigate("/select");
      }, 1200);
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="result-preview-modal" style={{ position: "relative" }}>
      <div className="result-preview-title">Preview:</div>
      <img
        src={URL.createObjectURL(file)}
        alt="Uploaded preview"
        width="250px"
        className="result-preview-img"
      />
      <div
        className="result-preview-btn-row"
        style={{ display: "flex", gap: 16, marginTop: 16 }}
      >
        <button
          className="result-preview-btn"
          onClick={onRemove}
          disabled={isPosting}
        >
          Remove Image
        </button>
        <button
          className="result-preview-btn"
          onClick={handleApprove}
          disabled={isPosting}
        >
          {isPosting ? "Uploading..." : "Approve Image"}
        </button>
      </div>

      {isPosting && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            zIndex: 10,
          }}
        >
          ANALYZING IMAGE...
        </div>
      )}

      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 8 }}>Uploaded!</div>}
    </div>
  );
};

const WebcamCaptureModal = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

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

  const handleApprove = async () => {
    if (!imgSrc) return;
    setIsPosting(true);
    try {
      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imgSrc }),
        }
      );
      if (!response.ok) throw new Error("API error");
      const result = await response.json();
      if (result && result.data) {
        localStorage.setItem("apiData", JSON.stringify(result.data));
      }
    } catch (err) {
      // Optionally handle error
      console.error("Failed to POST image:", err);
    }
    setIsPosting(false);
    if (onClose) onClose();
    navigate("/select");
  };

  const retake = () => {
    setImgSrc(null);
    localStorage.removeItem("capturedImage");
  };

  return (
    <div
      className="result-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        background: "#000",
      }}
    >
      {imgSrc ? (
        <>
          <img
            src={imgSrc}
            alt="captured"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
          <div
            className="result-modal-btn-row"
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              gap: 24,
              zIndex: 2,
            }}
          >
            <button className="result-modal-btn" onClick={retake}>
              Retake Photo
            </button>
            <button
              className="result-modal-btn"
              onClick={handleApprove}
              disabled={isPosting}
            >
              Approve & Upload
            </button>
            <button className="result-modal-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
          {isPosting && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                fontWeight: 700,
                zIndex: 10,
              }}
            >
              ANALYZING IMAGE...
            </div>
          )}
        </>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              gap: 24,
              zIndex: 2,
            }}
          >
            <button className="result-modal-btn" onClick={capture}>
              TAKE PICTURE
            </button>
            <button className="result-modal-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          width: "100vw",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
          zIndex: 3,
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
          <img
            src="/assets/camera.png"
            alt="Camera"
            className="result-image camera-btn"
            onClick={handleCameraClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleCameraClick()}
          />
        </RotatingSquares>
      </div>
      {/* Gallery Button */}
      <div className="result-center-block result-gallery-block">
        <RotatingSquares size={240}>
          <img
            src="/assets/gallery.png"
            alt="Gallery"
            className="result-image gallery-btn"
            onClick={handleGalleryClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleGalleryClick()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="result-file-input"
            onChange={handleImageChange}
          />
        </RotatingSquares>
      </div>

      {/* Webcam Modal Flow */}
      {showCameraModal && (
        <CameraModal onAllow={handleAllow} onDeny={handleDeny} />
      )}
      {showWebcam && <WebcamCaptureModal onClose={handleWebcamClose} />}

      {/* Image Preview Modal */}
      {selectedImage && (
        <GalleryApproveModal
          file={selectedImage}
          onRemove={() => setSelectedImage(null)}
        />
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
