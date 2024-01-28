export const addDays = (days: number) => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
