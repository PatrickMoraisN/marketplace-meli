import type { AxiosResponse } from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loggerInterceptor } from '../interceptors/loggerInterceptor'

describe('loggerInterceptor', () => {
  const mockConsoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {})

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('log request info when in development mode', () => {
    vi.stubEnv('NODE_ENV', 'development')

    const mockResponse = {
      config: { method: 'get', url: '/api/products' },
      status: 200,
      data: { message: 'success' },
    } as unknown as AxiosResponse

    const result = loggerInterceptor(mockResponse)

    expect(mockConsoleInfo).toHaveBeenCalledWith('[HTTP] GET /api/products', {
      status: 200,
      data: { message: 'success' },
    })

    expect(result).toBe(mockResponse)
  })

  it('not log anything when not in development mode', () => {
    vi.stubEnv('NODE_ENV', 'production')

    const mockResponse = {
      config: { method: 'post', url: '/api/users' },
      status: 201,
      data: { user: 'John' },
    } as unknown as AxiosResponse

    const result = loggerInterceptor(mockResponse)

    expect(mockConsoleInfo).not.toHaveBeenCalled()
    expect(result).toBe(mockResponse)
  })

  it('handle missing method gracefully', () => {
    vi.stubEnv('NODE_ENV', 'development')

    const mockResponse = {
      config: { url: '/api/unknown' },
      status: 500,
      data: { error: 'Something failed' },
    } as unknown as AxiosResponse

    const result = loggerInterceptor(mockResponse)

    expect(mockConsoleInfo).toHaveBeenCalledWith('[HTTP] undefined /api/unknown', {
      status: 500,
      data: { error: 'Something failed' },
    })

    expect(result).toBe(mockResponse)
  })
})
