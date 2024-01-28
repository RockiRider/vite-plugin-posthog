import Cookies from "universal-cookie";
import { getCookiePrefix } from "@utils/getCookiePrefix";
import { ConsentConfig, CookiePayload } from "@core/types";
import { addDays } from "@utils/addDays";
import { usePostHog } from "posthog-js/react";

export const usePostHogConsent = (config: ConsentConfig) => {
  const posthog = usePostHog();

  const configureCookies = () => {
    const requestedDate = addDays(config.cookie_expiration || 30);
    const cookies = new Cookies(null, {
      secure: config.secure_cookie,
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
    if (config.enable_session_recording) {
      posthog?.startSessionRecording();
    }
  };

  const triggerOptIn = () => {
    posthog?.opt_in_capturing();
    if (config.enable_session_recording) {
      posthog?.startSessionRecording();
    }
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

  const getConsentCookie = () => {
    const cookies = configureCookies();

    return cookies.get(`${getCookiePrefix(config.cookiePrefix)}_consent`) as
      | CookiePayload
      | undefined;
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
    getConsentCookie,
    reset,
    triggerOptIn,
  };
};
