export const getCookiePrefix = (str: string | undefined) => {
  if (!str) return "app_consent";
  return str;
};
