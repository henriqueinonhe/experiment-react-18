import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./clientWorker";

hydrateRoot(document, <App />);
