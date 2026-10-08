/** Progress is local convenience, not an assessment or a server-side student record. */
export const PROGRESS_KEY = 'leadtech:completed:v1';
export function parseProgress(raw: string | null, validIds: readonly string[]): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = new Set(validIds);
    return [...new Set(parsed.filter((id): id is string => typeof id === 'string' && valid.has(id)))];
  } catch {
    return [];
  }
}
export function toggleCompleted(current: readonly string[], id: string): string[] {
  return current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
}
export function nextPending(completed: readonly string[], orderedIds: readonly string[]): string | undefined {
  const done = new Set(completed);
  return orderedIds.find((id) => !done.has(id));
}
