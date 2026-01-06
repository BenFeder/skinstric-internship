import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Result from "./pages/Result";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
