/** Sort object entries */
export const sortedEntries = (
  obj: Record<string, unknown>,
  numeric: boolean = false,
  asc: boolean = true
): [string, unknown][] => {
  const collator = new Intl.Collator(undefined, { numeric });
  return Object.entries(obj).sort(
    ([keyA, _a], [keyB, _b]) => (asc ? 1 : -1) * collator.compare(keyA, keyB)
  );
};
