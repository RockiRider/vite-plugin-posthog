import posthogJs, { PostHogConfig } from "posthog-js";

type PostHogConfigOptions = Omit<
  PostHogConfig,
  "api_host" | "opt_out_capturing_by_default"
>;

export type VitePostHogProps = {
  apiKey: string;
  hostUrl: string;
  isDevModeOn?: boolean;
  config?: Partial<PostHogConfigOptions>;
};

export type PostHog = typeof posthogJs;
