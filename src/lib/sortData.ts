// Shared single-key ascending/descending sort used by every /list/* page's
// sort button — intentionally simple (one key, one direction toggle) rather
// than a full multi-column sort UI.
export function applySort<T>(
  data: T[],
  sort: string | undefined,
  key: (item: T) => string | number
): T[] {
  const sorted = [...data].sort((a, b) => {
    const av = key(a);
    const bv = key(b);
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  });
  return sort === "desc" ? sorted.reverse() : sorted;
}
