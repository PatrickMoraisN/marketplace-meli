export function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `há ${days} dia${days > 1 ? 's' : ''}`
  if (hours > 0) return `há ${hours} hora${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`
  return 'agora mesmo'
}
