import React from "react";
import "../App.css";
import styles from "./RotatingSquares.module.css";

function TopNav() {
  return (
    <div className="top-nav">
      <div className="top-nav-left">
        <span className="brand-name">SKINSTRIC</span>
        <span className="intro-text">[INTRO]</span>
      </div>
      <div className="enter-code-btn">ENTER CODE</div>
    </div>
  );
}

export default TopNav;
export const RotatingSquares = ({ size, rotation = 0, children }) => (
  <div
    className={styles["rotating-squares"]}
    style={{
      width: size + 64,
      height: size + 64,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div
      className={`${styles["rotating-square"]} ${styles["square-outermost"]}`}
      style={{ width: size + 64, height: size + 64, top: 0, left: 0 }}
    ></div>
    <div
      className={`${styles["rotating-square"]} ${styles["square-outer"]}`}
      style={{ width: size + 32, height: size + 32, top: 16, left: 16 }}
    ></div>
    <div
      className={`${styles["rotating-square"]} ${styles["square-inner"]}`}
      style={{ width: size, height: size, top: 32, left: 32 }}
    ></div>
    <div
      className={styles["rotating-squares-content"]}
      style={{ width: size + 64, height: size + 64 }}
    >
      {children}
    </div>
  </div>
);
