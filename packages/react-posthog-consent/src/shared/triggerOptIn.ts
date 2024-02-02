import { ConsentConfig, PostHog } from "./types";

export const triggerOptIn = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  //TODO: Re-trigger opt-in capturing, with days left
  posthog?.opt_in_capturing();
  if (config.enable_session_recording) {
    posthog?.startSessionRecording();
  }
};
