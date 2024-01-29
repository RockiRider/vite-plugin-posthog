import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

/**
 * A hook that returns an array of active feature flags.
 * @returns an array of active feature flags
 */
export function useActiveFeatureFlags(): string[] | undefined {
  const client = useVitePostHog();

  const [featureFlags, setFeatureFlags] = useState<string[]>([]);

  useEffect(() => {
    return client?.onFeatureFlags((flags) => {
      setFeatureFlags(flags);
    });
  }, [client]);

  return featureFlags;
}
