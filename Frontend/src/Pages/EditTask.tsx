import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/ProjectView.css";
import { useCallback, useEffect, useState } from "react";
const URL = "/api";

function App() {
  const navigate = useNavigate();
  const task_id = useParams().Id;
  const pr_id = useParams().PrId;
  const [task, setTask] = useState<
    Array<{ id: number; task: string; project_id: number; check: number }>
  >([]);

  const get_task_list = useCallback(
    async function () {
      const response = await fetch(URL + "task/" + task_id, {
        method: "get",
      });
      const temp = await response.json();
      if (temp.length === 0) {
        return;
      }
      setTask(temp);
    },
    [task_id]
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
    await fetch(URL + "task", {
      method: "PATCH",
      body: JSON.stringify({
        task: value,
        task_id: Number(task_id),
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

    navigate(`/project/${task[0].project_id}`);
  }

  useEffect(() => {
    get_task_list();
  }, [get_task_list]);
  return (
    <div className="flex place-content-center h-screen">
      <div className="self-center border-l-neutral-50 border-2 sm:w-1/2 rounded-lg">
        <form onSubmit={handle_submit} className="pr-2 pt-2 flow grid-flow-col">
          <div className="pb-4 pl-2">
            <p className="text-xl pb-2">Task:</p>
            <input
              id="task_input"
              type="text"
              className="input input-bordered input-primary w-full max-w-xs"
              name="project_name"
              required
            />
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 p-2 pr-0">
              <Link key="main" to={`/project/${pr_id}`}>
                <button className="btn btn-primary text-xl text-center self-start">
                  Cancel
                </button>
              </Link>
            </div>
            <div className="w-1/2 flex flex-row-reverse  p-2 pr-0">
              <input
                type="Submit"
                className="btn btn-primary text-xl text-center self-end "
                defaultValue="Update task"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default App;
