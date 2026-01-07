import React from "react";
import { useNavigate } from "react-router-dom";
import { default as TopNav } from "../components/TopNav";

const Select = () => {
  const navigate = useNavigate();
  return (
    <div
      className="select-page-root"
      style={{ minHeight: "100vh", position: "relative", background: "#fff" }}
    >
      <TopNav />
      <div style={{ marginLeft: 24, marginTop: 56 }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 18,
            marginBottom: 4,
            letterSpacing: 0.5,
          }}
        >
          A.I. ANALYSIS
        </div>
        <div style={{ fontSize: 13, marginBottom: 6 }}>
          A.I. HAS ESTIMATED THE FOLLOWING.
        </div>
        <div style={{ fontSize: 12, marginBottom: 6 }}>
          FIX ESTIMATED INFORMATION IF NEEDED.
        </div>
        {/* Add form fields for race, age, gender, etc. here if needed */}
      </div>
      {/* Centered 4-square wrapper */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(45deg)",
          display: "grid",
          gridTemplateColumns: "repeat(2, 144px)",
          gridTemplateRows: "repeat(2, 144px)",
          gap: "3px",
          zIndex: 10,
        }}
      >
        {/* Top square */}
        <button
          style={{
            width: 144,
            height: 144,
            background: "#bdbdbd", // darker grey
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "#222",
            border: "none",
            cursor: "pointer",
            padding: 0,
            outline: "none",
          }}
          onClick={() => navigate("/summary")}
          aria-label="Go to summary"
        >
          <span
            style={{
              transform: "rotate(-45deg)",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            DEMOGRAPHICS
          </span>
        </button>
        {/* Right square */}
        <div
          style={{
            width: 144,
            height: 144,
            background: "#e0e0e0",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "#222",
          }}
        >
          <span
            style={{
              transform: "rotate(-45deg)",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            SKIN TYPE DETAILS
          </span>
        </div>
        {/* Left square */}
        <div
          style={{
            width: 144,
            height: 144,
            background: "#e0e0e0",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "#222",
          }}
        >
          <span
            style={{
              transform: "rotate(-45deg)",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            COSMETIC CONCERNS
          </span>
        </div>
        {/* Bottom square */}
        <div
          style={{
            width: 144,
            height: 144,
            background: "#e0e0e0",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 16,
            color: "#222",
          }}
        >
          <span
            style={{
              transform: "rotate(-45deg)",
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            WEATHER
          </span>
        </div>
      </div>
      {/* Bottom left BACK button */}
      <button
        className="select-back-btn"
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
        }}
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <span style={{ fontSize: 18, marginRight: 6 }}>&#8592;</span>
        <span>BACK</span>
      </button>
      {/* Bottom right GET SUMMARY button */}
      <button
        className="select-summary-btn"
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
        }}
        onClick={() => {
          /* Add summary logic here */
        }}
        aria-label="Get Summary"
      >
        <span>GET SUMMARY</span>
        <span style={{ fontSize: 18, marginLeft: 6 }}>&#8594;</span>
      </button>
    </div>
  );
};

export default Select;
