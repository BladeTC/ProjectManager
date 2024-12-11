//import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//useNavigate
import "../css/MainPage.css";
import { useEffect, useState } from "react";
const URL = "/api";

function App() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<{ id: number; name: string }>>(
    []
  );
  async function get_project_list() {
    const response = await fetch(URL + "projects", {
      method: "get",
    });
    const temp = await response.json();
    setProjects(temp);
    //console.log(temp[temp.length - 1].id, new Date(temp[temp.length - 1].id));
  }
  useEffect(() => {
    get_project_list();
  }, []);
  let id = {};

  async function handle_submit(e: React.FormEvent) {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) {
      throw "e was not element Form";
    }
    const form_data = new FormData(e.target);
    const value = form_data.get("project_name");
    if (value === null) {
      throw "fname = null";
    }
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ name: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    id = await response.json();
    navigate(`/project/${id}`);
  }

  return (
    <div id="main" className="flex flex-col">
      <div className="flex flex-col-2 h-fit m-0 border-b-2 pb-3">
        <p className="text-4xl w-1/2">Project manager</p>
        <div className="flex flex-row-reverse w-1/2">
          <form onSubmit={handle_submit} className="pe-8 pt-2">
            <input
              type="text"
              className="text bg-slate-300 text-black me-6 text-xl"
              name="project_name"
              required
            />
            <input
              type="Submit"
              className="btn btn-primary text-xl text-center"
            />
          </form>
        </div>
      </div>
      <div className="grid grid-cols-5">
        {projects.map((p) => (
          <Link key={p.id} to={`/project/${p.id}`}>
            <button key={p.id} className="btn btn-outline m-4 w-3/4 text-xl">
              {p.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
