export function normalizeSearchQuery(value: string): string {
  if (!value) return ''
  const trimmed = value.trim().replace(/\s+/g, ' ')
  return encodeURIComponent(trimmed.toLowerCase())
}
