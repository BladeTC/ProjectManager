import { Link, useParams } from "react-router-dom";
import "../css/ProjectView.css";
import { useState, useEffect, useCallback } from "react";
import { Task } from "../../../backend/models";
const URL = "/api";

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [p_name, setP_name] = useState("");
  const project_id = useParams();

  const get_task_list = useCallback(
    async function () {
      const response = await fetch(URL + "tasks/" + project_id.Id, {
        method: "get",
      });
      const temp: Array<Task> = await response.json();
      if (temp.length === 0) {
        return;
      }
      setTasks(temp);
    },
    [project_id.Id]
  );

  const get_project_name = useCallback(
    async function () {
      const response = await fetch(URL + "project/" + project_id.Id, {
        method: "get",
      });
      const temp = await response.json();
      if (temp.length === 0) {
        return;
      }
      setP_name(temp[0].name);
    },
    [project_id.Id]
  );
  useEffect(() => {
    get_task_list();
    get_project_name();
  }, [get_project_name, get_task_list]);

  return (
    <div>
      <div id="main" className="flex items-center gap-2 border-b-2 p-3">
        <div className="w-1/2">
          <p className="text-4xl w-1/2 pl-4">{p_name}</p>
        </div>
        <div className="flex flex-row-reverse w-1/2 space-x-4 space-x-reverse">
          <Link to="/main">
            <button className="btn btn-primary text-xl text-center ">
              Return
            </button>
          </Link>
          <Link to={`/create_task/${project_id.Id}`} className="">
            <button className="btn btn-primary text-xl text-center ">
              Add task
            </button>
          </Link>
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-col space-y-2">
          <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
            {tasks.map((p) => (
              <li
                key={p.id}
                className="bg-inherit text-cyan-50 rounded-lg pl-2 pb-1 border-opacity-10 border-2 w-3/4 text-xl"
              >
                {`${p.task}`}
                {!!p.subs.length && (
                  <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside mt-2 dark:text-gray-400 pl-6 border-t-2">
                    {p.subs.map((subs) => (
                      <li
                        key={subs.id}
                        className="bg-inherit text-cyan-50 rounded-lg pl-2 pb-1 text-xl"
                      >
                        {`${subs.task}`}
                      </li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
export default App;
