import { useMemo } from "react";
import { PostHog } from "../types";

export const useVitePostHog = (): PostHog | null => {
  return useMemo(() => {
    if (
      typeof window !== "undefined" &&
      window.posthog &&
      !(Array.isArray(window.posthog) && window.posthog.length === 0)
    ) {
      return window.posthog;
    }
    return null;
  }, []);
};
