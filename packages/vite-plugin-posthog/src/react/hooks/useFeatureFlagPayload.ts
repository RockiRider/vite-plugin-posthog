import { useEffect, useState } from "react";
import { useVitePostHog } from "./useVitePostHog";
import { JsonType } from "../types";

export function useFeatureFlagPayload(flag: string): JsonType | undefined {
  const client = useVitePostHog();

  const [featureFlagPayload, setFeatureFlagPayload] = useState<JsonType>();

  useEffect(() => {
    return client?.onFeatureFlags(() => {
      setFeatureFlagPayload(client.getFeatureFlagPayload(flag));
    });
  }, [client, flag]);

  return featureFlagPayload;
}
