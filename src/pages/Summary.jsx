import React, { useState, useEffect } from "react";
import styles from "../Summary.module.css";
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
    <div className={styles["summary-root"]}>
      <TopNav />
      <div className={styles["summary-header"]}>
        <div className={styles["summary-title"]}>A.I. ANALYSIS</div>
        <div className={styles["summary-heading"]}>DEMOGRAPHICS</div>
        <div className={styles["summary-subtitle"]}>PREDICTED RACE & AGE</div>
      </div>
      {/* Demographic Data Row */}
      <div className={styles["summary-row"]}>
        {/* Left Column (0.25) */}
        <div className={styles["summary-left"]}>
          {tabOptions.map((tab, idx) => {
            const topItem =
              data[tab.key] && data[tab.key].length > 0
                ? [...data[tab.key]].sort((a, b) => b.value - a.value)[0]
                : null;
            const selectedTabClass =
              selectedTab === tab.key ? styles.selected : "";
            return (
              <div
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`${styles["summary-tab"]} ${selectedTabClass}`}
              >
                <div
                  className={`${styles["summary-tab-label"]} ${selectedTabClass}`}
                >
                  {topItem
                    ? topItem.label.charAt(0).toUpperCase() +
                      topItem.label.slice(1)
                    : tab.label}
                </div>
                <div
                  className={`${styles["summary-tab-display"]} ${selectedTabClass}`}
                >
                  {tab.display}
                </div>
              </div>
            );
          })}
        </div>
        {/* Middle Column (1.0) */}
        <div className={styles["summary-middle"]}>
          {/* Data heading: selected field label or default */}
          <div className={styles["summary-middle-label"]}>
            {selectedField
              ? selectedField.label.charAt(0).toUpperCase() +
                selectedField.label.slice(1)
              : selected.label.charAt(0).toUpperCase() +
                selected.label.slice(1)}
          </div>
          {/* Percentage Circle: show selected field's value or default */}
          <div className={styles["summary-middle-circle"]}>
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
        <div className={styles["summary-right"]}>
          <div className={styles["summary-right-header"]}>
            <div className={styles["summary-right-title"]}>
              {selected.display}
            </div>
            <div className={styles["summary-right-confidence"]}>
              A.I. CONFIDENCE
            </div>
          </div>
          <div className={styles["summary-right-list"]}>
            {data[selected.key]
              .slice()
              .sort((a, b) => b.value - a.value)
              .map((item, idx) => {
                const selectedItemClass =
                  selectedField && selectedField.label === item.label
                    ? styles.selected
                    : "";
                return (
                  <div
                    key={item.label}
                    className={`${styles["summary-right-item"]} ${selectedItemClass}`}
                    onClick={() => setSelectedField(item)}
                  >
                    <span className={styles["summary-right-item-label"]}>
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </span>
                    <span className={styles["summary-right-item-value"]}>
                      {Math.round(item.value * 100)}%
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Bottom left BACK button */}
      <button
        className={styles["summary-back-btn"]}
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
        className={styles["summary-home-btn"]}
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
