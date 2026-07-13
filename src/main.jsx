import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// @ts-ignore
import "slick-carousel/slick/slick.css";
// @ts-ignore
import "slick-carousel/slick/slick-theme.css";
// @ts-ignore
import "./index.css";

// @ts-ignore
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
