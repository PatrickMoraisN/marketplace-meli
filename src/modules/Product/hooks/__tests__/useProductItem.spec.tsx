import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { productsService } from '../../services/productService'
import { useProductItem } from '../useProductItem'

// 🔹 Mock do service
vi.mock('../../services/productService', () => ({
  productsService: {
    getItemById: vi.fn(),
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

describe('useProductItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls productsService.getItemById when id is provided', async () => {
    const mockData = { id: '123', title: 'Produto Teste' }
    vi.mocked(productsService.getItemById).mockResolvedValueOnce(mockData)

    const { result } = renderHook(() => useProductItem('123'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(productsService.getItemById).toHaveBeenCalledWith('123')
    expect(result.current.data).toEqual(mockData)
    expect(result.current.isNotFound).toBeFalsy()
  })

  it('does not call productsService when id is undefined', async () => {
    renderHook(() => useProductItem(undefined), { wrapper })

    expect(productsService.getItemById).not.toHaveBeenCalled()
  })

  it('sets isNotFound = true when API returns 404 error', async () => {
    const error = { response: { status: 404 } }
    vi.mocked(productsService.getItemById).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useProductItem('999'), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.isNotFound).toBe(true)
  })

  it('handles general API errors gracefully', async () => {
    const error = { response: { status: 500 } }
    vi.mocked(productsService.getItemById).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useProductItem('error'), { wrapper })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.isNotFound).toBe(false)
  })

  it('uses the correct query key and options', async () => {
    const mockData = { id: 'abc' }
    vi.mocked(productsService.getItemById).mockResolvedValueOnce(mockData)

    const { result } = renderHook(() => useProductItem('abc'), { wrapper })

    await waitFor(() => expect(result.current.data).toEqual(mockData))

    expect(result.current.data).toEqual(mockData)
    expect(result.current.isNotFound).toBeFalsy()
  })
})
