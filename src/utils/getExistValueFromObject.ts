export function filterNonNullValues<T extends object>(object: T): T {
  return {
    ...(Object.fromEntries(
      Object.entries(object).filter(([_, v]) => v !== null)
    ) as T),
  };
}
