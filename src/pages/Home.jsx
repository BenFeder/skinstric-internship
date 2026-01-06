import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import TopNav from "../components/TopNav";

function Home() {
  const navigate = useNavigate();
  const [isHoveringTest, setIsHoveringTest] = useState(false);

  return (
    <div className="app">
      <TopNav />
      <div className="rectangle-left"></div>
      <button className="discover-ai-btn" onClick={() => {}}>
        <span className="arrow-icon-left">←</span>
        DISCOVER AI
      </button>
      <h1 className={`heading ${isHoveringTest ? "heading-shifted" : ""}`}>
        Sophisticated
        <br />
        skincare
      </h1>
      <button
        className="take-test-btn"
        onClick={() => navigate("/testing")}
        onMouseEnter={() => setIsHoveringTest(true)}
        onMouseLeave={() => setIsHoveringTest(false)}
      >
        TAKE TEST
        <span className="arrow-icon">→</span>
      </button>
      <div className="rectangle-right"></div>
      <p className="bottom-description">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE.
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </div>
  );
}

export default Home;
