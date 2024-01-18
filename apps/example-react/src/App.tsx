import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useVitePostHog,
  useFeatureFlagEnabled,
} from "vite-plugin-posthog/react";

function App() {
  const [count, setCount] = useState(0);
  const posthog = useVitePostHog();
  const showWelcomeMessage = useFeatureFlagEnabled("welcome-msg");

  const handleClick = () => {
    posthog?.capture("count incremented");
    setCount((count) => count + 1);
  };

  const handleReset = () => {
    posthog?.reset();
  };

  const handleReject = () => {
    posthog?.opt_out_capturing();
  };

  const handleAccept = () => {
    posthog?.opt_in_capturing();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {showWelcomeMessage && <h2>Welcome to Vite + React!</h2>}
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="cookie-consent-area">
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>

      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
