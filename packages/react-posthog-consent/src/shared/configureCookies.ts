import { ConsentConfig } from "@core/types";
import { addDays } from "@utils/addDays";
import Cookies from "universal-cookie";

export const configureCookies = (config: ConsentConfig) => {
  const requestedDate = addDays(config.cookie_expiration || 30);
  const cookies = new Cookies(null, {
    secure: config.secure_cookie,
    sameSite: "strict",
    expires: requestedDate,
  });
  return cookies;
};
