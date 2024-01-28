import { getCookiePrefix } from "@utils/getCookiePrefix";
import { configureCookies } from "@shared/configureCookies";
import { ConsentConfig } from "@core/types";

export const rejectConsent = (config: ConsentConfig) => {
  const cookies = configureCookies(config);

  cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
    status: true,
    timestamp: Date.now(),
  });
};
