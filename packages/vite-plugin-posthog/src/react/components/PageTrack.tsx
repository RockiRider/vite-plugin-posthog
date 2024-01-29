import React, { PropsWithChildren, useEffect } from "react";
import { useVitePostHog } from "../hooks/useVitePostHog";
import { EventMetaData } from "../types";

interface PageTrackProps {
  uniquePageTitle: string;
  eventMetaData?: EventMetaData;
}
export const PageTrack = ({
  uniquePageTitle,
  children,
  eventMetaData,
}: PropsWithChildren<PageTrackProps>) => {
  const posthog = useVitePostHog();

  useEffect(() => {
    posthog?.capture("$pageview", {
      "Page Title": uniquePageTitle,
      ...eventMetaData,
    });
  }, []);

  return <>{children}</>;
};
