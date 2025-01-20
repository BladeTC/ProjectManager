import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/ProjectView.css";
const URL = "/api";

function App() {
  const navigate = useNavigate();
  const pr_id = useParams().Id;

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
    await fetch(URL + "pr", {
      method: "PATCH",
      body: JSON.stringify({
        name: value,
        id: Number(pr_id),
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

    navigate(`/main`);
  }

  return (
    <div className="flex place-content-center h-screen">
      <div className="self-center border-l-neutral-50 border-2 w-1/2 rounded-lg">
        <form onSubmit={handle_submit} className="pr-2 pt-2 flow grid-flow-col">
          <div className="pb-4 pl-2">
            <p className="text-xl pb-2">Project name:</p>
            <input
              id="task_input"
              type="text"
              className="text bg-slate-300 text-black me-6 text-xl w-full"
              name="project_name"
              required
            />
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 p-2 pr-0">
              <Link key="main" to={`/main`}>
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
