import { useConsent } from "react-posthog-consent/vite";

const CookieBanner = () => {
  const { acceptConsent, rejectConsent } = useConsent();

  return (
    <div style={{ backgroundColor: "white", padding: 10 }}>
      <button onClick={acceptConsent}>Accept</button>
      <button onClick={rejectConsent}>Reject</button>
    </div>
  );
};

export default CookieBanner;
