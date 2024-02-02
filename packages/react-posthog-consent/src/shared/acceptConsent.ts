import { ConsentConfig, PostHog } from "./types";
import { getCookiePrefix } from "./utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const acceptConsent = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  // TODO: COnfigure Opt-in capturing
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
