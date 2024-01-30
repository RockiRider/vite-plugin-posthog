import { ConsentConfig, PostHog } from "../types";

export const triggerOptIn = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.opt_in_capturing();
  if (config.enable_session_recording) {
    posthog?.startSessionRecording();
  }
};
