import { ConsentConfig } from "./types";
import { getCookiePrefix } from "../utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const checkHasConsent = (config: ConsentConfig) => {
  const cookies = configureCookies(config);

  return (
    cookies.get(`${getCookiePrefix(config.cookiePrefix)}_consent`)?.status ===
      true || false
  );
};
