import { PostHog } from "./types.ts";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}
