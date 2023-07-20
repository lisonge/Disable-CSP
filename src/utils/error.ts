export const safe = <T, U>(run: () => T, fallback: (e: any) => U) => {
  try {
    return run();
  } catch (e) {
    return fallback(e);
  }
};
