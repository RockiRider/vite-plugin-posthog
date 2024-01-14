import posthogJs, { PostHogConfig } from "posthog-js";

type PostHogConfigOptions = Omit<
  PostHogConfig,
  "api_host" | "opt_out_capturing_by_default"
>;

export type VitePostHogOptionsConfig = Partial<PostHogConfigOptions>;

export type VitePostHogOptions = {
  apiKey: string;
  hostUrl: string;
  isDevModeOn?: boolean;
  config?: VitePostHogOptionsConfig;
};

export type PostHog = typeof posthogJs;
