import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PageTrack } from "vite-plugin-posthog/react";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PageTrack uniquePageTitle="Home" eventMetaData={{ feature: "HomePage" }}>
      <App />
    </PageTrack>
  </React.StrictMode>
);
