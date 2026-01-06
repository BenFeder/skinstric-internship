import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { RotatingSquares } from "../components/TopNav";

const CameraModal = ({ onAllow, onDeny }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.95)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div style={{ fontSize: 24, marginBottom: 32 }}>
      Allow access to your camera?
    </div>
    <div style={{ display: "flex", gap: 24 }}>
      <button
        style={{
          background: "#fff",
          color: "#000",
          padding: "12px 32px",
          fontWeight: 600,
          fontSize: 18,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
        onClick={onDeny}
      >
        DENY
      </button>
      <button
        style={{
          background: "#fff",
          color: "#000",
          padding: "12px 32px",
          fontWeight: 600,
          fontSize: 18,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
        onClick={onAllow}
      >
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
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Camera Button */}
      <div
        style={{
          position: "absolute",
          left: "35%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <button
          onClick={handleCameraClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
          }}
        >
          <img
            src="/assets/camera.png"
            alt="Camera"
            className="scalable-image"
            style={{
              width: 128,
              height: 128,
              zIndex: 3,
              display: "block",
              margin: "auto",
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
      </div>
      {/* Gallery Button */}
      <div
        style={{
          position: "absolute",
          left: "65%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <button
          onClick={handleGalleryClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
          }}
        >
          <img
            src="/assets/gallery.png"
            alt="Gallery"
            className="scalable-image"
            style={{
              width: 128,
              height: 128,
              zIndex: 3,
              display: "block",
              margin: "auto",
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.95)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 32 }}>Preview:</div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded preview"
            width="250px"
            style={{ borderRadius: 8, marginBottom: 24 }}
          />
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              background: "#fff",
              color: "#000",
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Result;
