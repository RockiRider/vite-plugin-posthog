import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/App.css";
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
        <button onClick={handleClick} data-testid={"main_count_btn"}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => posthog?.reset()}>Reset</button>
    </>
  );
}

export default App;
