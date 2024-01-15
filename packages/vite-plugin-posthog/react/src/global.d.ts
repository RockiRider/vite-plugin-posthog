import { PostHog } from "../../types.js";

declare global {
  interface Window {
    posthog?: PostHog;
  }
}
