/** Sort object entries */
export const sortedEntries = <T extends Record<string, T[keyof T]>>(
  obj: T,
  numeric: boolean = true,
  asc: boolean = false
): [string, T[keyof T]][] => {
  const collator = new Intl.Collator(undefined, { numeric });
  return Object.entries(obj).sort(
    ([keyA, _a], [keyB, _b]) => (asc ? 1 : -1) * collator.compare(keyA, keyB)
  );
};
