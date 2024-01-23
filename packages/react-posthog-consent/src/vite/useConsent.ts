import { useContext } from "react";
import { ConsentContext } from "./ConsentProvider";

export const useConsent = () => {
  const ctx = useContext(ConsentContext);
  if (ctx === undefined)
    throw new Error(
      "The useConsent hook can only be used within an ConsentProvider"
    );
  return ctx;
};
