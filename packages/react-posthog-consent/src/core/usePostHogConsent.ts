import { ConsentConfig } from "@core/types";
import { usePostHog } from "posthog-js/react";
import { acceptConsent } from "@shared/acceptConsent";
import { rejectConsent } from "@shared/rejectConsent";
import { checkHasConsent } from "@shared/checkHasConsent";
import { getCookie } from "@shared/getCookie";
import { triggerOptIn } from "@shared/triggerOptIn";
import { triggerReset } from "@shared/triggerReset";

export const usePostHogConsent = (config: ConsentConfig) => {
  const posthog = usePostHog();

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
