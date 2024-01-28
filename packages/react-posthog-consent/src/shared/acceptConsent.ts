import { ConsentConfig, PostHog } from "@core/types";
import { configureCookies } from "./configureCookies";
import { getCookiePrefix } from "@utils/getCookiePrefix";

export const acceptConsent = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.opt_in_capturing();
  const cookies = configureCookies(config);
  cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
    status: true,
    timestamp: Date.now(),
  });
  if (config.enable_session_recording) {
    posthog?.startSessionRecording();
  }
};
