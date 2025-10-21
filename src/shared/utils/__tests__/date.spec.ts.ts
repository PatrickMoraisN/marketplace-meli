import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { timeAgo } from '../date'

describe('timeAgo', () => {
  const now = new Date('2025-10-20T12:00:00Z').getTime()

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(now)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "agora mesmo" when the difference is less than 60 seconds', () => {
    const timestamp = now - 30 * 1000 // 30 segundos atrás
    expect(timeAgo(timestamp)).toBe('agora mesmo')
  })

  it('returns "há 1 minuto" when the difference is about 1 minute', () => {
    const timestamp = now - 60 * 1000
    expect(timeAgo(timestamp)).toBe('há 1 minuto')
  })

  it('returns "há X minutos" for multiple minutes', () => {
    const timestamp = now - 15 * 60 * 1000 // 15 minutos atrás
    expect(timeAgo(timestamp)).toBe('há 15 minutos')
  })

  it('returns "há 1 hora" when difference is about 1 hour', () => {
    const timestamp = now - 60 * 60 * 1000
    expect(timeAgo(timestamp)).toBe('há 1 hora')
  })

  it('returns "há X horas" for multiple hours', () => {
    const timestamp = now - 5 * 60 * 60 * 1000
    expect(timeAgo(timestamp)).toBe('há 5 horas')
  })

  it('returns "há 1 dia" when difference is about 1 day', () => {
    const timestamp = now - 24 * 60 * 60 * 1000
    expect(timeAgo(timestamp)).toBe('há 1 dia')
  })

  it('returns "há X dias" for multiple days', () => {
    const timestamp = now - 3 * 24 * 60 * 60 * 1000
    expect(timeAgo(timestamp)).toBe('há 3 dias')
  })

  it('handles timestamps in the future gracefully (still says "agora mesmo")', () => {
    const timestamp = now + 10 * 1000 // 10s no futuro
    expect(timeAgo(timestamp)).toBe('agora mesmo')
  })
})
