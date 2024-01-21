import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

export function useFeatureFlagEnabled(flag: string): boolean | undefined {
  const client = useVitePostHog();

  const [featureEnabled, setFeatureEnabled] = useState<boolean | undefined>();

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureEnabled(client.isFeatureEnabled(flag));
    });
  }, [client, flag]);

  return featureEnabled;
}
