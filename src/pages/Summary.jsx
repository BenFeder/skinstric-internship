import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

const Summary = () => {
  const navigate = useNavigate();
  // Example data object
  // Retrieve API data from localStorage
  const [data, setData] = useState({ race: [], age: [], gender: [] });
  useEffect(() => {
    try {
      const apiData = JSON.parse(localStorage.getItem("apiData"));
      if (apiData) {
        // Normalize API data: convert { key: prob } to [{ label, value }]
        const normalize = (obj) =>
          obj && typeof obj === "object"
            ? Object.entries(obj).map(([label, value]) => ({ label, value }))
            : [];
        setData({
          race: normalize(apiData.race),
          age: normalize(apiData.age),
          gender: normalize(apiData.gender),
        });
        // Log the raw API data for debugging
        console.log("Retrieved API data from localStorage:", apiData);
      }
    } catch (e) {
      // fallback: leave as empty arrays
    }
  }, []);

  const [selectedTab, setSelectedTab] = useState("race");

  // Helper to get label and value
  const tabOptions = [
    { key: "race", label: "race", display: "RACE" },
    { key: "age", label: "(age range)", display: "AGE" },
    { key: "gender", label: "SEX", display: "GENDER" },
  ];
  const selected = tabOptions.find((t) => t.key === selectedTab);

  // Track which field is selected in the third column
  const [selectedField, setSelectedField] = useState(null);

  // Automatically update selectedField when selectedTab changes
  React.useEffect(() => {
    const sorted = data[selectedTab]?.slice().sort((a, b) => b.value - a.value);
    if (sorted && sorted.length > 0) {
      setSelectedField(sorted[0]);
    } else {
      setSelectedField(null);
    }
  }, [selectedTab, data]);

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
          {tabOptions.map((tab, idx) => {
            // Get top-ranked field for each category
            const topItem =
              data[tab.key] && data[tab.key].length > 0
                ? [...data[tab.key]].sort((a, b) => b.value - a.value)[0]
                : null;
            return (
              <div
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                style={{
                  background: selectedTab === tab.key ? "#bdbdbd" : "#e0e0e0",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  cursor: "pointer",
                  border:
                    selectedTab === tab.key
                      ? "2px solid #333"
                      : "2px solid transparent",
                  transition: "background 0.2s, border 0.2s",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                  {topItem
                    ? topItem.label.charAt(0).toUpperCase() +
                      topItem.label.slice(1)
                    : tab.label}
                </div>
                <div style={{ fontSize: 14, color: "#555" }}>{tab.display}</div>
              </div>
            );
          })}
        </div>
        {/* Middle Column (1.0) */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            marginLeft: 6,
            background: "#e0e0e0",
            borderRadius: 12,
            padding: 24,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {/* Data heading: selected field label or default */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              alignSelf: "flex-start",
              textTransform: "capitalize",
            }}
          >
            {selectedField
              ? selectedField.label.charAt(0).toUpperCase() +
                selectedField.label.slice(1)
              : selected.label.charAt(0).toUpperCase() +
                selected.label.slice(1)}
          </div>
          {/* Percentage Circle: show selected field's value or default */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              height: 260,
            }}
          >
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
                strokeDashoffset={
                  2 *
                  Math.PI *
                  120 *
                  (1 -
                    (selectedField
                      ? selectedField.value
                      : data[selected.key][0]?.value || 0))
                }
                transform="rotate(-90 130 130)"
                style={{ transition: "stroke-dashoffset 0.5s" }}
              />
              <text
                x="130"
                y="144"
                textAnchor="middle"
                fontSize="48"
                fontWeight="bold"
                fill="#222"
              >
                {selectedField
                  ? Math.round(selectedField.value * 100)
                  : Math.round((data[selected.key][0]?.value || 0) * 100)}
                %
              </text>
            </svg>
          </div>
        </div>
        {/* Right Column (0.5) */}
        <div
          style={{
            flex: 0.5,
            minWidth: 0,
            marginLeft: 6,
            background: "#e0e0e0",
            borderRadius: 12,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            position: "relative",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              width: "100%",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
              {selected.display}
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 16,
                fontWeight: 600,
                color: "#333",
              }}
            >
              A.I. CONFIDENCE
            </div>
          </div>
          <div style={{ width: "100%" }}>
            {data[selected.key]
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((item, idx) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                    cursor: "pointer",
                    border:
                      selectedField && selectedField.label === item.label
                        ? "2px solid #333"
                        : "2px solid transparent",
                    borderRadius: 6,
                    background:
                      selectedField && selectedField.label === item.label
                        ? "#d3d3d3"
                        : "transparent",
                    transition: "background 0.2s, border 0.2s",
                  }}
                  onClick={() => setSelectedField(item)}
                >
                  <span style={{ fontSize: 18 }}>
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 600 }}>
                    {Math.round(item.value * 100)}%
                  </span>
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
