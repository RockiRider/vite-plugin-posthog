import { PostHog } from "./types";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}
