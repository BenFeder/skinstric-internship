
import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";


const Summary = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "#fff" }}>
      <TopNav />
      {/* Bottom left BACK button */}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          display: "flex",
          alignItems: "center",
          fontSize: 13,
          fontWeight: 600,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate("/select")}
        aria-label="Back to Select"
      >
        <span style={{ fontSize: 18, marginRight: 6 }}>&#8592;</span>
        <span>BACK</span>
      </button>
      {/* Bottom right HOME button */}
      <button
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          alignItems: "center",
          fontSize: 13,
          fontWeight: 600,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
        aria-label="Go to Home"
      >
        <span>HOME</span>
        <span style={{ fontSize: 18, marginLeft: 6 }}>&#8594;</span>
      </button>
    </div>
  );
};

export default Summary;
