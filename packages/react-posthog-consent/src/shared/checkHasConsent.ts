import { ConsentConfig } from "@core/types";
import { configureCookies } from "@shared/configureCookies";
import { getCookiePrefix } from "@utils/getCookiePrefix";

export const checkHasConsent = (config: ConsentConfig) => {
  const cookies = configureCookies(config);

  return (
    cookies.get(`${getCookiePrefix(config.cookiePrefix)}_consent`)?.status ===
      true || false
  );
};
