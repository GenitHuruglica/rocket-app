import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RocketDetailsPage from "./pages/RocketDetailsPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rockets/:id" element={<RocketDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
