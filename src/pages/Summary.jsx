import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

const Summary = () => {
  const navigate = useNavigate();
  // Example data object
  // Example data with confidence arrays
  const data = {
    race: [
      { label: "Black", value: 0.4 },
      { label: "Asian", value: 0.3 },
      { label: "White", value: 0.2 },
      { label: "Latino", value: 0.1 },
    ],
    age: [
      { label: "18-24", value: 0.1 },
      { label: "25-34", value: 0.6 },
      { label: "35-44", value: 0.2 },
      { label: "45-54", value: 0.1 },
    ],
    gender: [
      { label: "Female", value: 0.7 },
      { label: "Male", value: 0.3 },
    ],
  };

  const [selectedTab, setSelectedTab] = useState("race");

  // Helper to get label and value
  const tabOptions = [
    { key: "race", label: "race", display: "RACE" },
    { key: "age", label: "(age range)", display: "AGE" },
    { key: "gender", label: "SEX", display: "GENDER" },
  ];
  const selected = tabOptions.find(t => t.key === selectedTab);

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
          {tabOptions.map((tab, idx) => (
            <div
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              style={{
                background: selectedTab === tab.key ? "#bdbdbd" : "#e0e0e0",
                borderRadius: 8,
                padding: 12,
                marginBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer',
                border: selectedTab === tab.key ? '2px solid #333' : '2px solid transparent',
                transition: 'background 0.2s, border 0.2s',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{tab.label}</div>
              <div style={{ fontSize: 14, color: "#555" }}>{tab.display}</div>
            </div>
          ))}
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
        <div style={{ flex: 0.5, minWidth: 0, marginLeft: 6, background: '#e0e0e0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', height: '100%' }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
            {selected.display}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 16 }}>A.I. CONFIDENCE</div>
          <div style={{ width: '100%' }}>
            {data[selected.key]
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((item, idx) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{item.label}</span>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>{Math.round(item.value * 100)}%</span>
                </div>
              ))}
          </div>
        </div>
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
