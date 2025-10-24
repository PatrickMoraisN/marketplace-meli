import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HttpClientFactory } from '../httpClientFactory'

vi.mock('../httpClientFactory', () => ({
  HttpClientFactory: {
    createAxiosClient: vi.fn(),
  },
}))

describe('httpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('call HttpClientFactory.createAxiosClient with correct config', async () => {
    const fakeClient = { request: vi.fn() }
    ;(HttpClientFactory.createAxiosClient as any).mockReturnValue(fakeClient)

    const { httpClient: importedClient } = await import('../httpClient')

    expect(HttpClientFactory.createAxiosClient).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: '/api',
      })
    )

    expect(importedClient).toBe(fakeClient)
  })

  it('should export the same instance returned by factory', async () => {
    const fakeClient = { request: vi.fn() }
    ;(HttpClientFactory.createAxiosClient as any).mockReturnValue(fakeClient)

    const module = await import('../httpClient')
    const moduleAgain = await import('../httpClient')

    expect(module.httpClient).toBe(moduleAgain.httpClient)
  })
})
