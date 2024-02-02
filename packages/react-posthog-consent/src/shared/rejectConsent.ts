import { ConsentConfig } from "./types";
import { getCookiePrefix } from "./utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const rejectConsent = (config: ConsentConfig) => {
  //TODO: Add in Posthog Opt out, just incase
  const cookies = configureCookies(config);
  cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
    status: false,
    timestamp: Date.now(),
  });
};
