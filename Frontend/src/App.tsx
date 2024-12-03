//import { useState } from "react";
import { Route, Routes } from "react-router-dom";
//useNavigate
import "./css/App.css";
import MainPage from "./Pages/MainPage";
import ProjectView from "./Pages/ProjectView";

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/view" element={<ProjectView />} />
      </Routes>
    </div>
  );
}

export default App;
