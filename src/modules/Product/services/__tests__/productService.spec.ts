import { httpClient } from '@/shared/api/httpClient'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { productsService } from '../productService'

vi.mock('@/shared/api/httpClient', () => ({
  httpClient: {
    request: vi.fn(),
  },
}))

describe('productsService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('call httpClient.request with correct params', async () => {
    const fakeResponse = { data: { item: { id: 'MLA123', title: 'Notebook Lenovo' } } }
    ;(httpClient.request as any).mockResolvedValue(fakeResponse)

    const id = 'MLA123'
    const result = await productsService.getItemById(id)

    expect(httpClient.request).toHaveBeenCalledWith({
      url: `/items/${id}`,
      method: 'GET',
    })

    expect(result).toEqual(fakeResponse.data.item)
  })

  it('return the item field from response data', async () => {
    const mockItem = { id: 'MLA999', title: 'Celular Samsung' }
    ;(httpClient.request as any).mockResolvedValue({ data: { item: mockItem } })

    const result = await productsService.getItemById('MLA999')
    expect(result).toBe(mockItem)
  })

  it('handle missing item gracefully', async () => {
    ;(httpClient.request as any).mockResolvedValue({ data: {} })

    const result = await productsService.getItemById('MLA000')
    expect(result).toBeUndefined()
  })

  it('propagate httpClient.request errors', async () => {
    const error = new Error('Network Error')
    ;(httpClient.request as any).mockRejectedValue(error)

    await expect(productsService.getItemById('MLA404')).rejects.toThrow('Network Error')
  })
})
