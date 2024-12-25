import React from "react"; // Ensure React is imported
import { createRoot } from "react-dom/client";
import App from "./app.js";
import "./styles.css";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
