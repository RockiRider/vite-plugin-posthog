import { useMemo } from "react";
import { PostHog } from "../types";

export const useVitePostHog = (): PostHog | null => {
  return useMemo(() => {
    if (typeof window !== "undefined" && window.posthog) {
      return window.posthog;
    }
    return null;
  }, []);
};
