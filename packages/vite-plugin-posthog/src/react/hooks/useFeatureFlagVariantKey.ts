import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

export function useFeatureFlagVariantKey(
  flag: string
): string | boolean | undefined {
  const client = useVitePostHog();

  const [featureFlagVariantKey, setFeatureFlagVariantKey] = useState<
    string | boolean
  >();
  // would be nice to have a default value above however it's not possible due
  // to a hydration error when using nextjs

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureFlagVariantKey(client.getFeatureFlag(flag));
    });
  }, [client, flag]);

  return featureFlagVariantKey;
}
