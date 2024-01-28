import React, {
  ReactNode,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { ConsentConfig, ConsentContextType } from "@core/types";
import { usePostHogConsent } from "@core/usePostHogConsent";

export const ConsentContext = createContext<ConsentContextType>({
  handleAcceptConsent: () => {},
  handleRejectConsent: () => {},
  hasConsent: () => false,
  handleReset: () => {},
  handleOptIn: () => {},
  getConsentCookie: () => undefined,
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
  const [showBanner, setShowBanner] = useState(
    consentReturn.getConsentCookie() === undefined
  );

  useEffect(() => {
    const payload = consentReturn.getConsentCookie();
    if (payload) {
      const currentDate = new Date();
      const expirationDate = new Date(payload.timestamp);
      //Check the date
      if (currentDate > expirationDate) {
        console.log(currentDate > expirationDate);
        setShowBanner(true);
      } else {
        if (payload.status) {
          consentReturn.handleOptIn();
        }
      }
    }
  }, []);

  return (
    <ConsentContext.Provider value={consentReturn}>
      {children}
      {showBanner && (
        <div
          id="cookie-consent"
          style={{
            zIndex: 999999,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          {cookieBanner}
        </div>
      )}
    </ConsentContext.Provider>
  );
};
