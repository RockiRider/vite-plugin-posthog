import { ConsentConfig } from "./types";
import { getCookiePrefix } from "./utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const rejectConsent = (config: ConsentConfig) => {
  const cookies = configureCookies(config);

  cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
    status: true,
    timestamp: Date.now(),
  });
};
