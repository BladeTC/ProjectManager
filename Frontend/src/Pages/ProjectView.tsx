//import { useState } from "react";
import { Link } from "react-router-dom";
//useNavigate
import Navigation from "../Navigation";
import "../css/ProjectView.css";

function App() {
  return (
    <div id="main" className="flex items-center gap-2">
      <Link to="/main">
        <button className="btn">Return</button>
      </Link>
    </div>
  );
}

export default App;
<Navigation />;
