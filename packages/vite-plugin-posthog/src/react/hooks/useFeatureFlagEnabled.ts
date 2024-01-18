import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

export function useFeatureFlagEnabled(flag: string): boolean | undefined {
  const client = useVitePostHog();

  const [featureEnabled, setFeatureEnabled] = useState<boolean | undefined>();
  // would be nice to have a default value above however it's not possible due
  // to a hydration error when using nextjs

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureEnabled(client.isFeatureEnabled(flag));
    });
  }, [client, flag]);

  return featureEnabled;
}
