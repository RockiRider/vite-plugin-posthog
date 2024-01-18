import { useEffect, useState } from "react";
import { JsonType } from "posthog-js";
import { useVitePostHog } from "./useVitePostHog";

export function useFeatureFlagPayload(flag: string): JsonType | undefined {
  const client = useVitePostHog();

  const [featureFlagPayload, setFeatureFlagPayload] = useState<JsonType>();
  // would be nice to have a default value above however it's not possible due
  // to a hydration error when using nextjs

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureFlagPayload(client.getFeatureFlagPayload(flag));
    });
  }, [client, flag]);

  return featureFlagPayload;
}
