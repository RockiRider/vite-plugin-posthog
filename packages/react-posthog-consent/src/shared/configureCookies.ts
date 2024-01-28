import Cookies from "universal-cookie";
import { ConsentConfig } from "./types";
import { addDays } from "../utils/addDays";

export const configureCookies = (config: ConsentConfig) => {
  const requestedDate = addDays(config.cookie_expiration || 30);
  const cookies = new Cookies(null, {
    secure: config.secure_cookie,
    sameSite: "strict",
    expires: requestedDate,
  });
  return cookies;
};
