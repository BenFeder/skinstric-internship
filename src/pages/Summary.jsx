import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

const Summary = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ minHeight: "100vh", position: "relative", background: "#fff" }}
    >
      <TopNav />
      <div
        style={{
          marginLeft: 24,
          marginTop: 96,
          marginBottom: 32,
          maxWidth: "100vw",
          overflowWrap: "break-word",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 16,
            marginBottom: 0,
            letterSpacing: 0.5,
            lineHeight: 1,
          }}
        >
          A.I. ANALYSIS
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "normal",
            marginBottom: 0,
            lineHeight: 1,
          }}
        >
          DEMOGRAPHICS
        </div>
        <div style={{ fontSize: 14, marginBottom: 0, lineHeight: 1 }}>
          PREDICTED RACE & AGE
        </div>
      </div>
      {/* Demographic Data Row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: 128,
          gap: 6,
        }}
      >
        {/* Left Column (0.25) */}
        <div
          style={{
            flex: 0.25,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            marginLeft: 16,
            marginTop: 32,
            gap: 6,
          }}
        >
          {/* Race Section */}
          <div
            style={{ background: "#e0e0e0", borderRadius: 8, padding: 12, marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              race
            </div>
            <div style={{ fontSize: 14, color: "#555" }}>RACE</div>
          </div>
          {/* Age Section */}
          <div
            style={{ background: "#e0e0e0", borderRadius: 8, padding: 12, marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              (age range)
            </div>
            <div style={{ fontSize: 14, color: "#555" }}>AGE</div>
          </div>
          {/* Sex Section */}
          <div
            style={{ background: "#e0e0e0", borderRadius: 8, padding: 12, marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
              SEX
            </div>
            <div style={{ fontSize: 14, color: "#555" }}>GENDER</div>
          </div>
        </div>
        {/* Middle Column (1.0) */}
        <div style={{ flex: 1, minWidth: 0, marginLeft: 6, background: '#e0e0e0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', position: 'relative' }}>
          {/* Data heading (default: race) */}
          <div style={{ fontSize: 20, fontWeight: 700, alignSelf: 'flex-start' }}>race</div>
          {/* Percentage Circle */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', height: 260 }}>
            <svg width="260" height="260" viewBox="0 0 260 260">
              <circle
                cx="130"
                cy="130"
                r="120"
                fill="none"
                stroke="#ccc"
                strokeWidth="8"
              />
              <circle
                cx="130"
                cy="130"
                r="120"
                fill="none"
                stroke="#333"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - 0.6)}
                transform="rotate(-90 130 130)"
                style={{ transition: 'stroke-dashoffset 0.5s' }}
              />
              <text
                x="130"
                y="144"
                textAnchor="middle"
                fontSize="48"
                fontWeight="bold"
                fill="#222"
              >
                60%
              </text>
            </svg>
          </div>
        </div>
        {/* Right Column (0.5) */}
        <div style={{ flex: 0.5, minWidth: 0, marginLeft: 6 }}></div>
      </div>
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
