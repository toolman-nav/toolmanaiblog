// A date-only published value means 08:00 Asia/Shanghai (00:00 UTC).
// Capture once so every route in a build uses the same cutoff.
const buildNow = Date.now();
export function publicationTime(published) {
  const day = published instanceof Date
    ? (Number.isFinite(published.getTime()) ? published.toISOString().slice(0, 10) : '')
    : String(published || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return NaN;
  const instant = Date.parse(day + 'T08:00:00+08:00');
  return Number.isFinite(instant) && new Date(instant).toISOString().slice(0, 10) === day ? instant : NaN;
}
export function isPublished(data, now = buildNow) {
  return !data.draft && publicationTime(data.published) <= Number(now);
}
