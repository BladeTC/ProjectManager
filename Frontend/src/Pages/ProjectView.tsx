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

  async function deleteTask(item: {
    id: number;
    task?: string;
    project_id?: number;
    check?: number;
  }) {
    // const response =
    await fetch(URL + "task", {
      method: "DELETE",
      body: JSON.stringify({
        id: Number(item.id),
        check: Number(item.check),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //const temp: Array<Task> = await response.json();
    get_task_list();
  }

  return (
    <div>
      <div id="main" className="flex items-center border-b-2 p-3">
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
        <div className="space-y-2">
          <ol className="w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400 ">
            {tasks.map((p, i) => (
              <li
                key={p.id}
                className="inline-flex flex-col bg-inherit w-full text-cyan-50 rounded-lg pb-1 border-opacity-10 border-2 text-xl"
              >
                <span className="flex pt-2 px-2 justify-end items-end pb-2 gap-1">
                  <p className="break-all grow">
                    {i + 1}. {p.task}
                  </p>
                  <div className="dropdown dropdown-bottom dropdown-end h-fit">
                    <div
                      tabIndex={0}
                      role="button"
                      className="flex m-0 list-none rounded-lg border-opacity-10 h-6 border-2 px-2 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                    <ul className="menu border-opacity-10 border-2 dropdown-content bg-base-200 bg-opacity-15 backdrop-blur-sm rounded-box z-[1] w-52 p-2 shadow">
                      <li className="rounded-lg  border-opacity-2 border-2 bg-base-100">
                        <Link
                          to={`/edit_task/${p.project_id}/${p.id}`}
                          className=""
                        >
                          <p>Edit task</p>
                        </Link>
                      </li>
                      <li className="rounded-lg border-opacity-2 border-2 bg-base-100">
                        <button
                          onClick={() => {
                            deleteTask(p);
                          }}
                        >
                          Delete task
                        </button>
                      </li>
                    </ul>
                  </div>
                </span>
                <div className="inline"></div>
                {!!p.subs.length && (
                  <ol className="w-full space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400 pl-6 border-t-2">
                    {p.subs.map((subs, i) => (
                      <li
                        key={subs.id}
                        className="inline-flex flex-col bg-inherit w-full text-cyan-50 rounded-lg pb-1 text-xl"
                      >
                        <span className="flex pt-2 px-2 justify-end items-end pb-2 gap-1">
                          <p className="break-all grow">
                            {i + 1}. {`${subs.task}`}
                          </p>
                          <div className="dropdown dropdown-bottom dropdown-end h-fit">
                            <div
                              tabIndex={0}
                              role="button"
                              className="flex m-0 list-none rounded-lg border-opacity-10 h-6 border-2 px-2 items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                              </svg>
                            </div>
                            <ul className="menu border-opacity-10 border-2 dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                              <li className="rounded-lg  border-opacity-2 border-2 ">
                                <Link
                                  to={`/edit_task/${subs.project_id}/${subs.id}`}
                                  className=""
                                >
                                  <p>Edit task</p>
                                </Link>
                              </li>
                              <li className="rounded-lg border-opacity-2 border-2 ">
                                <button
                                  onClick={() => {
                                    deleteTask(subs);
                                  }}
                                >
                                  Delete task
                                </button>
                              </li>
                            </ul>
                          </div>
                        </span>
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
