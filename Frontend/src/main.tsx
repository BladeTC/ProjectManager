import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./css/main.css";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
