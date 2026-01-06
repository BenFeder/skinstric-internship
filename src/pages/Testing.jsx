import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";

function Testing() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <TopNav />
      <div className="testing-nav-subtext">TO START ANALYSIS</div>
      <h1>Testing Page</h1>
      <button className="back-btn" onClick={() => navigate("/")}> 
        <span className="back-square">
          <span className="arrow-icon-left">←</span>
        </span>
        <span className="back-text">BACK</span>
      </button>
    </div>
  );
}

export default Testing;
