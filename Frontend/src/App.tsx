//import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//useNavigate
import "./css/App.css";
import MainPage from "./Pages/MainPage";
import ProjectView from "./Pages/ProjectView";

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/project/:Id" element={<ProjectView />} />
      </Routes>
    </div>
  );
}

export default App;
