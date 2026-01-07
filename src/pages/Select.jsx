import React from "react";
import styles from "../Select.module.css";
import { useNavigate } from "react-router-dom";
import { default as TopNav } from "../components/TopNav";

const Select = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["select-page-root"]}>
      <TopNav />
      <div className={styles["select-header"]}>
        <div className={styles["select-title"]}>A.I. ANALYSIS</div>
        <div className={styles["select-desc"]}>
          A.I. HAS ESTIMATED THE FOLLOWING.
        </div>
        <div className={styles["select-note"]}>
          FIX ESTIMATED INFORMATION IF NEEDED.
        </div>
        {/* Add form fields for race, age, gender, etc. here if needed */}
      </div>
      {/* Centered 4-square wrapper */}
      <div className={styles["select-squares-wrapper"]}>
        {/* Top square */}
        <button
          className={styles["select-square-btn"]}
          onClick={() => navigate("/summary")}
          aria-label="Go to summary"
        >
          <span className={styles["select-square-label"]}>DEMOGRAPHICS</span>
        </button>
        {/* Right square */}
        <div className={styles["select-square"]}>
          <span className={styles["select-square-label"]}>
            SKIN TYPE DETAILS
          </span>
        </div>
        {/* Left square */}
        <div className={styles["select-square"]}>
          <span className={styles["select-square-label"]}>
            COSMETIC CONCERNS
          </span>
        </div>
        {/* Bottom square */}
        <div className={styles["select-square"]}>
          <span className={styles["select-square-label"]}>WEATHER</span>
        </div>
      </div>
      {/* Bottom left BACK button */}
      <button
        className={styles["select-back-btn"]}
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        <span className={`${styles["select-arrow"]} ${styles["left"]}`}>
          &#8592;
        </span>
        <span>BACK</span>
      </button>
      {/* Bottom right GET SUMMARY button */}
      <button
        className={styles["select-summary-btn"]}
        onClick={() => {
          /* Add summary logic here */
        }}
        aria-label="Get Summary"
      >
        <span>GET SUMMARY</span>
        <span className={`${styles["select-arrow"]} ${styles["right"]}`}>
          &#8594;
        </span>
      </button>
    </div>
  );
};

export default Select;
