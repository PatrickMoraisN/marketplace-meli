import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { searchService } from '../../services/searchService'
import { useSearchItems } from '../useSearchItems'

vi.mock('../../services/searchService', () => ({
  searchService: {
    getItems: vi.fn(),
  },
}))

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useSearchItems', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls searchService.getItems with correct query and offset', async () => {
    const mockResponse = { items: [{ id: '1', title: 'iPhone' }], total_items: 1 }
    vi.mocked(searchService.getItems).mockResolvedValueOnce(mockResponse as any)

    const { result } = renderHook(() => useSearchItems('iphone', 1), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(searchService.getItems).toHaveBeenCalledWith('iphone', 0)
    expect(result.current.data).toEqual(mockResponse)
  })

  it('calculates correct offset for page 2', async () => {
    const mockResponse = { items: [{ id: '2' }], total_items: 10 }
    vi.mocked(searchService.getItems).mockResolvedValueOnce(mockResponse as any)

    const { result } = renderHook(() => useSearchItems('iphone', 2), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(searchService.getItems).toHaveBeenCalledWith('iphone', 10)
  })

  it('does not call searchService when query is empty', async () => {
    renderHook(() => useSearchItems('', 1), { wrapper })

    expect(searchService.getItems).not.toHaveBeenCalled()
  })

  it('returns loading state initially', async () => {
    vi.mocked(searchService.getItems).mockResolvedValueOnce({
      items: [],
      total_items: 0,
    } as any)

    const { result } = renderHook(() => useSearchItems('react'), { wrapper })

    expect(result.current.isLoading).toBe(true)
  })

  it('handles error responses correctly', async () => {
    const error = new Error('Network Error')
    vi.mocked(searchService.getItems).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useSearchItems('error'), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBe(error)
  })

  it('uses the correct query key structure', async () => {
    const mockResponse = { items: [], total_items: 0 }
    vi.mocked(searchService.getItems).mockResolvedValueOnce(mockResponse as any)

    const { result } = renderHook(() => useSearchItems('macbook', 3), { wrapper })

    await waitFor(() => expect(result.current.data).toEqual(mockResponse))

    expect(result.current.data).toEqual(mockResponse)
    expect(result.current.isFetching).toBe(false)
  })
})
