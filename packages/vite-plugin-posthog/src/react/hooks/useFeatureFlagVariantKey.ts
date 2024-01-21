import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

export function useFeatureFlagVariantKey(
  flag: string
): string | boolean | undefined {
  const client = useVitePostHog();

  const [featureFlagVariantKey, setFeatureFlagVariantKey] = useState<
    string | boolean
  >();

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureFlagVariantKey(client.getFeatureFlag(flag));
    });
  }, [client, flag]);

  return featureFlagVariantKey;
}
