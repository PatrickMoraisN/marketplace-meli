import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearchHistory } from '../useSearchHistory'
import { LOCAL_STORAGE_KEYS } from '@/shared/constants'

describe('useSearchHistory', () => {
  let getItemMock: ReturnType<typeof vi.fn>
  let setItemMock: ReturnType<typeof vi.fn>
  let dateNowSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    getItemMock = vi.fn()
    setItemMock = vi.fn()

    vi.stubGlobal('window', {
      localStorage: {
        getItem: getItemMock,
        setItem: setItemMock,
      },
    })

    dateNowSpy = vi.spyOn(Date, 'now').mockReturnValue(1000000)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
    dateNowSpy.mockRestore()
  })

  it('initializes with empty history when localStorage is empty', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory())

    expect(result.current.history).toEqual([])
  })

  it('initializes with stored history from localStorage', () => {
    const storedHistory = [
      { term: 'react', timestamp: 900000 },
      { term: 'typescript', timestamp: 800000 },
    ]
    getItemMock.mockReturnValue(JSON.stringify(storedHistory))

    const { result } = renderHook(() => useSearchHistory())

    expect(result.current.history).toEqual(storedHistory)
    expect(getItemMock).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.LAST_SEARCHED_ITEMS)
  })

  it('adds a new search term to history', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.addSearch('vitest')
    })

    expect(result.current.history).toEqual([{ term: 'vitest', timestamp: 1000000 }])
    expect(setItemMock).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LAST_SEARCHED_ITEMS,
      JSON.stringify([{ term: 'vitest', timestamp: 1000000 }])
    )
  })

  it('trims whitespace from search terms', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.addSearch('  react  ')
    })

    expect(result.current.history).toEqual([{ term: 'react', timestamp: 1000000 }])
  })

  it('respects the default limit of 2 items', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.addSearch('first')
    })

    dateNowSpy.mockReturnValue(2000000)
    act(() => {
      result.current.addSearch('second')
    })

    dateNowSpy.mockReturnValue(3000000)
    act(() => {
      result.current.addSearch('third')
    })

    expect(result.current.history).toHaveLength(2)
    expect(result.current.history).toEqual([
      { term: 'third', timestamp: 3000000 },
      { term: 'second', timestamp: 2000000 },
    ])
  })

  it('respects a custom limit', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory(5))

    act(() => {
      result.current.addSearch('first')
    })

    dateNowSpy.mockReturnValue(2000000)
    act(() => {
      result.current.addSearch('second')
    })

    dateNowSpy.mockReturnValue(3000000)
    act(() => {
      result.current.addSearch('third')
    })

    expect(result.current.history).toHaveLength(3)
    expect(result.current.history).toEqual([
      { term: 'third', timestamp: 3000000 },
      { term: 'second', timestamp: 2000000 },
      { term: 'first', timestamp: 1000000 },
    ])
  })

  it('removes duplicate terms and moves them to the front', () => {
    const existingHistory = [
      { term: 'react', timestamp: 900000 },
      { term: 'typescript', timestamp: 800000 },
    ]
    getItemMock.mockReturnValue(JSON.stringify(existingHistory))

    const { result } = renderHook(() => useSearchHistory(3))

    act(() => {
      result.current.addSearch('react')
    })

    expect(result.current.history).toEqual([
      { term: 'react', timestamp: 1000000 },
      { term: 'typescript', timestamp: 800000 },
    ])
  })

  it('clears all history', () => {
    const existingHistory = [
      { term: 'react', timestamp: 900000 },
      { term: 'typescript', timestamp: 800000 },
    ]
    getItemMock.mockReturnValue(JSON.stringify(existingHistory))

    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.clearHistory()
    })

    expect(result.current.history).toEqual([])
    expect(setItemMock).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.LAST_SEARCHED_ITEMS,
      JSON.stringify([])
    )
  })

  it('adds newest searches to the beginning of the array', () => {
    getItemMock.mockReturnValue(null)

    const { result } = renderHook(() => useSearchHistory(5))

    act(() => {
      result.current.addSearch('oldest')
    })

    dateNowSpy.mockReturnValue(2000000)
    act(() => {
      result.current.addSearch('middle')
    })

    dateNowSpy.mockReturnValue(3000000)
    act(() => {
      result.current.addSearch('newest')
    })

    expect(result.current.history[0].term).toBe('newest')
    expect(result.current.history[2].term).toBe('oldest')
  })
})
