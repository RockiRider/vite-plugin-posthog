import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";

/**
 * A hook that returns the variant key of a feature flag.
 * @param flag  - the feature flag in question
 * @returns
 */
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
