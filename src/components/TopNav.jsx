import React from "react";
import "../App.css";

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
    style={{
      position: "absolute",
      width: size + 64,
      height: size + 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div
      className="rotating-square square-outermost"
      style={{
        width: size + 64,
        height: size + 64,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    ></div>
    <div
      className="rotating-square square-outer"
      style={{
        width: size + 32,
        height: size + 32,
        position: "absolute",
        top: 16,
        left: 16,
      }}
    ></div>
    <div
      className="rotating-square square-inner"
      style={{
        width: size,
        height: size,
        position: "absolute",
        top: 32,
        left: 32,
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: size + 64,
        height: size + 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      {children}
    </div>
  </div>
);
