import axios, { AxiosInstance } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AxiosAdapter } from '../adapters/axiosAdapter'

vi.mock('axios')

describe('AxiosAdapter', () => {
  let mockAxiosInstance: AxiosInstance
  let mockCreate: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockAxiosInstance = {
      request: vi.fn(),
      interceptors: { request: { use: vi.fn() }, response: { use: vi.fn() } },
    } as unknown as AxiosInstance

    mockCreate = vi.fn().mockReturnValue(mockAxiosInstance)
    ;(axios.create as any) = mockCreate
  })

  it('create an axios instance with default baseURL and headers', () => {
    new AxiosAdapter('https://api.example.com')

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://api.example.com',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    )
  })

  it('apply interceptors if provided', () => {
    const interceptor = vi.fn()
    new AxiosAdapter('https://api.example.com', interceptor)

    expect(interceptor).toHaveBeenCalledWith(mockAxiosInstance)
  })

  it('return a properly formatted response when request succeeds', async () => {
    const adapter = new AxiosAdapter('https://api.example.com')
    const mockResponse = {
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
    }

    mockAxiosInstance.request = vi.fn().mockResolvedValue(mockResponse)

    const result = await adapter.request({
      url: '/test',
      method: 'GET',
    })

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/test', method: 'GET' })
    )

    expect(result).toEqual({
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
    })
  })

  it('throw a formatted error when response is present (HTTP error)', async () => {
    const adapter = new AxiosAdapter('https://api.example.com')

    const mockError = {
      response: { status: 404, statusText: 'Not Found' },
    }

    mockAxiosInstance.request = vi.fn().mockRejectedValue(mockError)

    await expect(adapter.request({ url: '/error', method: 'GET' })).rejects.toThrow(
      'HTTP 404: Not Found'
    )
  })

  it('throw a network error when request exists but no response is received', async () => {
    const adapter = new AxiosAdapter('https://api.example.com')

    const mockError = { request: {}, message: '' }

    mockAxiosInstance.request = vi.fn().mockRejectedValue(mockError)

    await expect(adapter.request({ url: '/network', method: 'GET' })).rejects.toThrow(
      'Network Error: No response received'
    )
  })

  it('throw a generic error when neither request nor response exist', async () => {
    const adapter = new AxiosAdapter('https://api.example.com')

    const mockError = { message: 'Unknown error' }

    mockAxiosInstance.request = vi.fn().mockRejectedValue(mockError)

    await expect(adapter.request({ url: '/generic', method: 'GET' })).rejects.toThrow(
      'Unknown error'
    )
  })
})
