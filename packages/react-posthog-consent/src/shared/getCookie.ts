import { ConsentConfig, CookiePayload } from "./types";
import { getCookiePrefix } from "../utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const getCookie = (config: ConsentConfig) => {
  const cookies = configureCookies(config);

  return cookies.get(`${getCookiePrefix(config.cookiePrefix)}_consent`) as
    | CookiePayload
    | undefined;
};
