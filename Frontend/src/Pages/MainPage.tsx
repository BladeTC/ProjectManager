//import { useState } from "react";
import { Link } from "react-router-dom";
//useNavigate
import "../css/MainPage.css";
import { useEffect, useState } from "react";
const URL = "/api";

function App() {
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

  return (
    <div id="main" className="flex flex-col">
      <div className="flex flex-col-2 h-fit m-0 border-b-2 p-3">
        <p className="text-4xl w-1/2 pl-4 pt-2">Project manager</p>
        <div className="flex flex-row-reverse w-1/2 pb-0 ">
          <Link key="CreateProject" to={`/create_project`}>
            <button className="btn btn-primary text-xl text-center">
              Create project
            </button>
          </Link>
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
