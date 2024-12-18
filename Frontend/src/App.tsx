//import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
//useNavigate
import "./css/App.css";
import MainPage from "./Pages/MainPage";
import ProjectView from "./Pages/ProjectView";
import CreateProject from "./Pages/CreateProject";
import CreateTask from "./Pages/CreateTask";

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/create_project" element={<CreateProject />} />
        <Route path="/create_task/:Id" element={<CreateTask />} />
        <Route path="/project/:Id" element={<ProjectView />} />
      </Routes>
    </div>
  );
}

export default App;
