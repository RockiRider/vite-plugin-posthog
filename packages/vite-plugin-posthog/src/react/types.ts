import posthogJs, { Survey, JsonType } from "posthog-js";

export type PostHog = typeof posthogJs;
export { Survey, JsonType };
export type EventMetaData = {
  [x: string]: any;
};
