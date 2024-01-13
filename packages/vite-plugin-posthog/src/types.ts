import posthogJs from "posthog-js";

export type VitePostHogProps = {
  apiKey: string;
  hostUrl: string;
};

export type PostHog = typeof posthogJs;
