import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Testing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter" && name.trim()) {
      localStorage.setItem("userName", name.trim());
      setStep(1);
    }
  };

  const handleCityKeyDown = (e) => {
    if (e.key === "Enter" && city.trim()) {
      localStorage.setItem("cityName", city.trim());
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1800);
    }
  };

  return (
    <div className="app">
      <TopNav />
      <div className="testing-nav-subtext">TO START ANALYSIS</div>
      <div className="center-content">
        {!loading && !done && <div className="input-label">CLICK TO TYPE</div>}
        {step === 0 && !loading && !done && (
          <input
            className="big-heading-input"
            placeholder="Introduce Yourself"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleNameKeyDown}
            autoFocus
          />
        )}
        {step === 1 && !loading && !done && (
          <input
            className="big-heading-input"
            placeholder="Your city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleCityKeyDown}
            autoFocus
          />
        )}
        {loading && (
          <>
            <div className="input-label">Processing submission</div>
            <div className="loading-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </>
        )}
        {done && (
          <div className="thankyou-block">
            <div className="thankyou-main">Thank you!</div>
            <div className="thankyou-sub">Proceed for the next step</div>
          </div>
        )}
      </div>
      <button className="back-btn" onClick={() => navigate("/")}>
        <span className="back-square">
          <span className="arrow-icon-left">←</span>
        </span>
        <span className="back-text">BACK</span>
      </button>
      {done && (
        <button className="proceed-btn" onClick={() => navigate("/result")}>
          <span className="proceed-text">PROCEED</span>
          <span className="proceed-square">
            <span className="arrow-icon-right">→</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default Testing;
