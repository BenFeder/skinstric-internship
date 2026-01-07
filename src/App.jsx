import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import Result from "./pages/Result";
import Select from "./pages/Select";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testing" element={<Testing />} />
      <Route path="/result" element={<Result />} />
      <Route path="/select" element={<Select />} />
    </Routes>
  );
}

export default App;
