import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

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
