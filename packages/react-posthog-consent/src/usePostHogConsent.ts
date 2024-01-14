import { PostHog } from "./types";
import Cookies, { CookieSetOptions } from "universal-cookie";

export const usePostHogConsent = (
  posthog: PostHog | undefined,
  cookiePrefix: string,
  cookieOptions?: CookieSetOptions
) => {
  const cookies = new Cookies(null, cookieOptions);

  const acceptConsent = () => {
    posthog?.opt_in_capturing();
    cookies.set(`${cookiePrefix}_consent`, {
      status: true,
      timestamp: Date.now(),
    });
  };

  const rejectConsent = () => {
    cookies.set(`${cookiePrefix}_consent`, {
      status: true,
      timestamp: Date.now(),
    });
  };

  const hasConsent = () => {
    return cookies.get(`${cookiePrefix}_consent`)?.status;
  };

  const overRideReset = () => {
    posthog?.reset();
    if (hasConsent()) {
      posthog?.opt_in_capturing();
    }
  };

  return {
    acceptConsent,
    rejectConsent,
    hasConsent,
    overRideReset,
  };
};
