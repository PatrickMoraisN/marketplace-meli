import { httpClient } from '@/shared/api/httpClient'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { searchService } from '../searchService'

vi.mock('@/shared/api/httpClient', () => ({
  httpClient: {
    request: vi.fn(),
  },
}))

describe('searchService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('call httpClient.request with correct params', async () => {
    const fakeResponse = { data: { results: [{ id: 'MLA123' }] } }
    ;(httpClient.request as any).mockResolvedValue(fakeResponse)

    const query = 'notebook'
    const offset = 10

    const result = await searchService.getItems(query, offset)

    expect(httpClient.request).toHaveBeenCalledWith({
      url: `/items?q=${encodeURIComponent(query)}&offset=${offset}`,
      method: 'GET',
    })
    expect(result).toEqual(fakeResponse.data)
  })

  it('encode query correctly', async () => {
    const fakeResponse = { data: { results: [] } }
    ;(httpClient.request as any).mockResolvedValue(fakeResponse)

    const query = 'smart tv 50"'
    await searchService.getItems(query)

    expect(httpClient.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `/items?q=${encodeURIComponent(query)}&offset=0`,
      })
    )
  })

  it('default offset to 0 if not provided', async () => {
    const fakeResponse = { data: { results: [] } }
    ;(httpClient.request as any).mockResolvedValue(fakeResponse)

    await searchService.getItems('celular')

    const calledArgs = (httpClient.request as any).mock.calls[0][0]
    expect(calledArgs.url).toContain('&offset=0')
  })

  it('return response.data directly', async () => {
    const mockData = { results: [{ id: 'MLA321' }] }
    ;(httpClient.request as any).mockResolvedValue({ data: mockData })

    const result = await searchService.getItems('pc gamer')

    expect(result).toBe(mockData)
  })
})
