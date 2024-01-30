import { useVitePostHog } from "vite-plugin-posthog/react";
import { ConsentConfig } from "../types";
import { acceptConsent } from "../shared/acceptConsent";
import { checkHasConsent } from "../shared/checkHasConsent";
import { getCookie } from "../shared/getCookie";
import { rejectConsent } from "../shared/rejectConsent";
import { triggerOptIn } from "../shared/triggerOptIn";
import { triggerReset } from "../shared/triggerReset";

export const usePostHogConsent = (config: ConsentConfig) => {
  const posthog = useVitePostHog();

  const handleAcceptConsent = () => {
    acceptConsent(posthog, config);
  };

  const handleRejectConsent = () => {
    rejectConsent(config);
  };

  const handleOptIn = () => triggerOptIn(posthog, config);

  const hasConsent = () => checkHasConsent(config);

  const getConsentCookie = () => getCookie(config);

  const handleReset = () => {
    triggerReset(posthog, config);
  };

  return {
    handleAcceptConsent,
    handleRejectConsent,
    hasConsent,
    getConsentCookie,
    handleReset,
    handleOptIn,
  };
};
