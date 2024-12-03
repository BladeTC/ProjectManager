//import { useState } from "react";
import { Link } from "react-router-dom";
//useNavigate
import "../css/MainPage.css";

function App() {
  return (
    <div id="main" className="flex flex-col">
      <div className="self-end pe-4 pt-2">
        <form>
          <input
            type="text"
            className="text bg-slate-300 text-black me-6 text-xl"
          />
          <Link to="/view">
            <input
              type="Submit"
              className="btn btn-primary text-xl text-center"
              value="Create new project"
            />
          </Link>
        </form>
      </div>
    </div>
  );
}

export default App;
