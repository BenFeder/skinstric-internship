import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="rectangle-left"></div>
      <button className="discover-ai-btn" onClick={() => {}}>
        <span className="arrow-icon-left">←</span>
        DISCOVER AI
      </button>
      <h1 className="heading">
        Sophisticated
        <br />
        skincare
      </h1>
      <button className="take-test-btn" onClick={() => navigate("/testing")}>
        TAKE TEST
        <span className="arrow-icon">→</span>
      </button>
      <div className="rectangle-right"></div>
    </div>
  );
}

export default Home;
