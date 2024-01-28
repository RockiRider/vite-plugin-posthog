import { ConsentConfig, PostHog } from "./types";
import { checkHasConsent } from "./checkHasConsent";

export const triggerReset = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.reset();
  if (checkHasConsent(config)) {
    posthog?.opt_in_capturing();
  }
};
