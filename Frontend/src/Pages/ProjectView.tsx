//import { useState } from "react";
import { Link } from "react-router-dom";
//useNavigate
import Navigation from "../Navigation";
import "../css/ProjectView.css";
const URL = "http://localhost:3000/";

function App() {
  async function test_get() {
    const test = await fetch(URL, {
      method: "GET",
    });
    const body = await test.json();
    console.log(body);
    return;
  }
  return (
    <div id="main" className="flex items-center gap-2">
      <Link to="/">
        <button className="btn" onClick={test_get}>
          Return
        </button>
      </Link>
    </div>
  );
}

export default App;
<Navigation />;
