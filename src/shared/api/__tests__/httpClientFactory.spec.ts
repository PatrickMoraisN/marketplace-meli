import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { AxiosAdapter } from '../adapters/axiosAdapter'
import { HttpClientFactory } from '../httpClientFactory'
import { attachInterceptors } from '../interceptors'

vi.mock('../adapters/axiosAdapter')
vi.mock('../interceptors')

describe('HttpClientFactory', () => {
  const MockAxiosAdapter = AxiosAdapter as unknown as Mock
  const mockAttachInterceptors = attachInterceptors as unknown as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create an AxiosAdapter instance with default baseURL', () => {
    const mockInstance = { request: vi.fn() }
    MockAxiosAdapter.mockImplementation(() => mockInstance)

    const client = HttpClientFactory.createAxiosClient()

    expect(MockAxiosAdapter).toHaveBeenCalledWith(
      '/api',
      expect.any(Function) // interceptor function
    )

    expect(client).toBe(mockInstance)
  })

  it('should create an AxiosAdapter instance with a custom baseURL', () => {
    const mockInstance = { request: vi.fn() }
    MockAxiosAdapter.mockImplementation(() => mockInstance)

    const client = HttpClientFactory.createAxiosClient({ baseURL: 'https://test-api.com' })

    expect(MockAxiosAdapter).toHaveBeenCalledWith('https://test-api.com', expect.any(Function))

    expect(client).toBe(mockInstance)
  })

  it('should call attachInterceptors when creating the adapter', () => {
    const mockInstance = { interceptors: {} }
    let interceptorCallback: any

    MockAxiosAdapter.mockImplementation((_baseURL: string, callback: any) => {
      interceptorCallback = callback
      return { request: vi.fn() }
    })

    HttpClientFactory.createAxiosClient({ baseURL: '/custom' })

    // Simulate calling the passed callback with a fake axios instance
    const fakeAxiosInstance = { interceptors: {} }
    interceptorCallback(fakeAxiosInstance)

    expect(mockAttachInterceptors).toHaveBeenCalledWith(fakeAxiosInstance)
  })

  it('should return an object compatible with HttpAdapter interface', () => {
    const mockRequest = vi.fn()
    const mockInstance = { request: mockRequest }
    MockAxiosAdapter.mockImplementation(() => mockInstance)

    const client = HttpClientFactory.createAxiosClient()

    expect(typeof client.request).toBe('function')
  })
})
