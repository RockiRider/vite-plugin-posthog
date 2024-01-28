import posthogJs from "posthog-js";

export type PostHog = typeof posthogJs;

export type ConsentConfig = {
  cookiePrefix?: string;
  opt_in_name?: string;
  enable_session_recording?: boolean;
  capture_event_properties?: {
    [key: string]: string;
  };
  cookie_expiration?: number;
  secure_cookie?: boolean;
};

export type CookiePayload = {
  status: boolean;
  timestamp: number;
};
