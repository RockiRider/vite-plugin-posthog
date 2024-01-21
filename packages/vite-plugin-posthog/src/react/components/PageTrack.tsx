import React, { PropsWithChildren, useEffect } from "react";
import { useVitePostHog } from "../hooks/useVitePostHog";

interface PageTrackProps {
  uniquePageTitle: string;
}
const PageTrack = ({
  uniquePageTitle,
  children,
}: PropsWithChildren<PageTrackProps>) => {
  const posthog = useVitePostHog();

  useEffect(() => {
    posthog?.capture("$pageview", {
      "Page Title": uniquePageTitle,
    });
  }, []);

  return <>{children}</>;
};

export default PageTrack;
