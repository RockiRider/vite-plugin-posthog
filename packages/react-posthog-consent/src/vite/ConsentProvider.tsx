import React, { ReactNode, PropsWithChildren, createContext } from "react";
import { ConsentConfig } from "./types";
import { usePostHogConsent } from "./usePostHogConsent";

type ConsentContextType = {
  acceptConsent: () => void;
  rejectConsent: () => void;
  hasConsent: () => boolean;
  reset: () => void;
};

export const ConsentContext = createContext<ConsentContextType>({
  acceptConsent: () => {},
  rejectConsent: () => {},
  hasConsent: () => false,
  reset: () => {},
});

interface ConsentProviderProps {
  cookieBanner: ReactNode;
  config: ConsentConfig;
}

export const ConsentProvider = ({
  children,
  cookieBanner,
  config,
}: PropsWithChildren<ConsentProviderProps>) => {
  const consentReturn = usePostHogConsent(config);

  return (
    <ConsentContext.Provider value={consentReturn}>
      {children}
      <div
        id="cookie-consent"
        style={{ zIndex: 0, position: "absolute", bottom: 0, width: "100%" }}
      >
        {cookieBanner}
      </div>
    </ConsentContext.Provider>
  );
};
