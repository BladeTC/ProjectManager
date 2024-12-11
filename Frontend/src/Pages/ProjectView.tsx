import { Link, useParams } from "react-router-dom";
import "../css/ProjectView.css";
import { useState, useEffect } from "react";
const URL = "/api";

function App() {
  const [tasks, setTasks] = useState<
    Array<{ id: number; task: string; project_id: number; check: number }>
  >([]);
  const [p_name, setP_name] = useState("");
  const project_id = useParams();

  async function get_task_list() {
    const response = await fetch(URL + "tasks/" + project_id.Id, {
      method: "get",
    });
    const temp = await response.json();
    if (temp.length === 0) {
      return;
    }
    setTasks(temp);
  }
  async function get_project_name() {
    const response = await fetch(URL + "projects/" + project_id.Id, {
      method: "get",
    });
    const temp = await response.json();
    if (temp.length === 0) {
      return;
    }
    setP_name(temp[0].name);
  }
  useEffect(() => {
    get_task_list();
    get_project_name();
  }, []);

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
    await fetch(URL + "tasks", {
      method: "POST",
      body: JSON.stringify({ task: value, project_id: Number(project_id.Id) }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const txt_field_element =
      document.querySelector<HTMLInputElement>("#task_input");
    if (txt_field_element !== null) {
      txt_field_element.value = "";
    }

    get_task_list();
  }

  return (
    <div>
      <div id="main" className="flex items-center gap-2 border-b-2 p-3 ">
        <div className="w-1/2">
          <p className="text-5xl text-white pl-6">{p_name}</p>
        </div>
        <div className="flex flex-row-reverse w-1/2">
          <Link to="/main">
            <button className="btn btn-primary text-xl text-center ">
              Return
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col space-y-2 w-1/2 border-r-2 border-b-3">
          <form className="pe-8 pt-2 pl-2" onSubmit={handle_submit}>
            <input
              id="task_input"
              type="text"
              className="text bg-slate-300 text-black me-6 text-xl"
              name="project_name"
              required
            />
            <input
              type="Submit"
              className="btn btn-primary text-xl text-center border-0"
              defaultValue="Add"
            />
          </form>
          {tasks.map((p) => (
            <p
              key={p.id}
              className="bg-inherit text-cyan-50 rounded-lg pl-2 pb-1 border-opacity-10 border-2 m-4 w-3/4 text-xl"
            >
              <input type="checkbox" className="mr-2" />
              {p.task}
            </p>
          ))}
        </div>
        <div className="flex w-1/2 border-l-2"></div>
      </div>
    </div>
  );
}
export default App;
