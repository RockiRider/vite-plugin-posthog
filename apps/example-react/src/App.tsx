import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useVitePostHog,
  useFeatureFlagEnabled,
} from "vite-plugin-posthog/react";
import { usePostHogConsent } from "react-posthog-consent/vite";

const COOKIE_PREFIX = "my_app_name";

function App() {
  const [count, setCount] = useState(0);
  const posthog = useVitePostHog();
  const showWelcomeMessage = useFeatureFlagEnabled("welcome-msg");
  const { acceptConsent, rejectConsent, hasConsent, overRideReset } =
    usePostHogConsent(COOKIE_PREFIX);

  const handleClick = () => {
    posthog?.capture("count incremented");
    setCount((count) => count + 1);
  };

  const handleReset = () => {
    overRideReset();
  };

  const handleReject = () => {
    rejectConsent();
  };

  const handleAccept = () => {
    acceptConsent();
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
      {hasConsent() ? (
        <p>Consent has been given</p>
      ) : (
        <div className="cookie-consent-area">
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default App;
