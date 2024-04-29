import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n/init";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM
  .createRoot(rootElement)
  .render(<App />);
