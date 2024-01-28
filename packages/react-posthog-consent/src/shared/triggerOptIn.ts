import { ConsentConfig, PostHog } from "@core/types";

export const triggerOptIn = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.opt_in_capturing();
  if (config.enable_session_recording) {
    posthog?.startSessionRecording();
  }
};
