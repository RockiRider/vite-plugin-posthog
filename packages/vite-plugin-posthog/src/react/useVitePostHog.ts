import { useMemo } from "react";

export const useVitePostHog = () => {
  return useMemo(() => {
    if (typeof window !== "undefined" && window.posthog) {
      return window.posthog;
    }
    return null;
  }, []);
};
