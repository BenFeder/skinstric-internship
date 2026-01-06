import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Testing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(320);

  useEffect(() => {
    // Dynamically set the width of the innermost square to fit the input
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth + 48); // add padding for visual space
    }
  }, [step, name, city, loading, done]);

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter" && name.trim()) {
      localStorage.setItem("userName", name.trim());
      setStep(1);
    }
  };

  const handleCityKeyDown = async (e) => {
    if (e.key === "Enter" && city.trim()) {
      localStorage.setItem("cityName", city.trim());
      setLoading(true);
      setApiMessage("");
      try {
        const response = await fetch(
          "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim(), city: city.trim() }),
          }
        );
        const data = await response.json();
        if (data && data.success) {
          setApiMessage(data.success);
        } else {
          setApiMessage("Submission failed.");
        }
      } catch (err) {
        setApiMessage("Submission failed.");
      }
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
        <div
          className="rotating-square square-outermost"
          style={{ width: inputWidth + 96, height: inputWidth + 96 }}
        >
          <div
            className="rotating-square square-outer"
            style={{ width: inputWidth + 48, height: inputWidth + 48 }}
          >
            <div
              className="rotating-square square-inner"
              style={{ width: inputWidth, height: inputWidth }}
            ></div>
          </div>
        </div>
        <div className="center-overlay-content">
          {!loading && !done && (
            <div className="input-label">CLICK TO TYPE</div>
          )}
          {step === 0 && !loading && !done && (
            <input
              className="big-heading-input"
              placeholder="Introduce Yourself"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameKeyDown}
              autoFocus
              ref={inputRef}
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
              ref={inputRef}
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
              {apiMessage && (
                <div style={{ marginTop: 16, color: "#222", fontWeight: 500 }}>
                  {apiMessage}
                </div>
              )}
            </div>
          )}
        </div>
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
