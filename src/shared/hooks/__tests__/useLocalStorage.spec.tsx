import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useLocalStorage } from '../useLocalStorage'

describe('useLocalStorage', () => {
  const key = 'test-key'
  const initialValue = 'initial'
  let getItemMock: ReturnType<typeof vi.fn>
  let setItemMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    getItemMock = vi.fn()
    setItemMock = vi.fn()

    vi.stubGlobal('window', {
      localStorage: {
        getItem: getItemMock,
        setItem: setItemMock,
      },
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('initializes with stored value if available', () => {
    getItemMock.mockReturnValue(JSON.stringify('stored-value'))

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(getItemMock).toHaveBeenCalledWith(key)
    expect(result.current[0]).toBe('stored-value')
  })

  it('initializes with initial value if no stored value exists', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(result.current[0]).toBe(initialValue)
  })

  it('initializes with initial value if JSON.parse throws', () => {
    getItemMock.mockImplementation(() => '{bad json')

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(result.current[0]).toBe(initialValue)
  })

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    act(() => {
      result.current[1]('new-value')
    })

    expect(setItemMock).toHaveBeenCalledWith(key, JSON.stringify('new-value'))
  })

  it('logs error if setItem throws', () => {
    setItemMock.mockImplementation(() => {
      throw new Error('QuotaExceeded')
    })

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    act(() => {
      result.current[1]('boom')
    })

    expect(errorSpy).toHaveBeenCalledWith(
      `Error setting localStorage key "${key}"`,
      'QuotaExceeded'
    )

    errorSpy.mockRestore()
  })

  it('returns initial value when window is undefined (SSR)', () => {
    vi.unstubAllGlobals()

    const { result } = renderHook(() => useLocalStorage(key, initialValue))

    expect(result.current[0]).toBe(initialValue)
  })
})
