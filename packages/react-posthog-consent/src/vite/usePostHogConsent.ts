import Cookies from "universal-cookie";
import { useVitePostHog } from "vite-plugin-posthog/react";
import { ConsentConfig } from "./types";

const addDays = (days: number) => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

const getCookiePrefix = (str: string | undefined) => {
  if (!str) return "app_consent";
  return str;
};

export const usePostHogConsent = (config: ConsentConfig) => {
  const posthog = useVitePostHog();

  const configureCookies = () => {
    const requestedDate = addDays(config?.cookie_expiration || 30);
    const cookies = new Cookies(null, {
      secure: config?.secure_cookie,
      sameSite: "strict",
      expires: requestedDate,
    });
    return cookies;
  };

  const acceptConsent = () => {
    posthog?.opt_in_capturing();
    const cookies = configureCookies();
    cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
      status: true,
      timestamp: Date.now(),
    });
  };

  const rejectConsent = () => {
    const cookies = configureCookies();

    cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
      status: true,
      timestamp: Date.now(),
    });
  };

  const hasConsent = () => {
    const cookies = configureCookies();

    return (
      cookies.get(`${getCookiePrefix(config.cookiePrefix)}_consent`)?.status ===
        true || false
    );
  };

  const reset = () => {
    posthog?.reset();
    if (hasConsent()) {
      posthog?.opt_in_capturing();
    }
  };

  return {
    acceptConsent,
    rejectConsent,
    hasConsent,
    reset,
  };
};
