import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from '../debounce'

describe('debounce utility', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllTimers()
  })

  it('calls the function after the specified delay', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 500)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('resets the timer if called again before delay', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced()
    vi.advanceTimersByTime(200)
    debounced()
    vi.advanceTimersByTime(200)
    debounced()
    vi.advanceTimersByTime(300)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('passes arguments correctly to the function', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 200)

    debounced('hello', 42)
    vi.advanceTimersByTime(200)

    expect(fn).toHaveBeenCalledWith('hello', 42)
  })
})
