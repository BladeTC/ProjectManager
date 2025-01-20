import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/ProjectView.css";
import { useCallback, useEffect, useState } from "react";
const URL = "/api";

function App() {
  const navigate = useNavigate();
  const project_id = useParams();

  const [tasks, setTasks] = useState<
    Array<{ id: number; task: string; project_id: number; check: number }>
  >([]);

  const get_task_list = useCallback(
    async function () {
      const response = await fetch(URL + "tasks/" + project_id.Id, {
        method: "get",
      });
      const temp = await response.json();
      if (temp.length === 0) {
        return;
      }
      setTasks(temp);
    },
    [project_id.Id]
  );

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
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries()); // (!) This doesn't include multiple select values
    await fetch(URL + "tasks", {
      method: "POST",
      body: JSON.stringify({
        task: value,
        project_id: Number(project_id.Id),
        subtask_id: Number(formJson.sub_tasks),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const txt_field_element =
      document.querySelector<HTMLInputElement>("#task_input");
    if (txt_field_element !== null) {
      txt_field_element.value = "";
    }

    navigate(`/project/${project_id.Id}`);
  }

  useEffect(() => {
    get_task_list();
  }, [get_task_list]);
  return (
    <div className="flex place-content-center h-screen">
      <div className="self-center border-l-neutral-50 border-2 w-1/2 rounded-lg">
        <form onSubmit={handle_submit} className="pr-2 pt-2 flow grid-flow-col">
          <div className="pb-4 pl-2">
            <p className="text-xl pb-2">Task:</p>
            <input
              id="task_input"
              type="text"
              className="text bg-slate-300 text-black me-6 text-xl w-full"
              name="project_name"
              required
            />
            <p className="text-xl pb-2">Mark as subtask of task:</p>
            <select
              name="sub_tasks"
              defaultValue="none"
              id="sub_tasks"
              className="bg-white text-neutral-950 text-xl w-1/2"
            >
              <option
                key="none"
                defaultValue="none"
                className="bg-inherit text-black rounded-lg pl-2 pb-1 border-opacity-10 border-2 w-3/4 text-xl"
              >
                {"<none>"}
              </option>
              {tasks.map((p, index) => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-inherit text-black rounded-lg pl-2 pb-1 border-opacity-10 border-2 w-3/4 text-xl"
                >
                  {`${index + 1}. ${p.task}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 p-2 pr-0">
              <Link key="main" to={`/project/${project_id.Id}`}>
                <button className="btn btn-primary text-xl text-center self-start">
                  Cancel
                </button>
              </Link>
            </div>
            <div className="w-1/2 flex flex-row-reverse  p-2 pr-0">
              <input
                type="Submit"
                className="btn btn-primary text-xl text-center self-end "
                defaultValue="Add task"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
