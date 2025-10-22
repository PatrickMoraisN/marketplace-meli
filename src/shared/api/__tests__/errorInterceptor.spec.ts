import type { AxiosError } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { errorInterceptor } from '../interceptors/errorInterceptor'

describe('errorInterceptor', () => {
  const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('log response status and data when error has a response', async () => {
    const mockError = {
      response: { status: 404, data: { message: 'Not Found' } },
    } as unknown as AxiosError

    await expect(errorInterceptor(mockError)).rejects.toEqual(mockError)

    expect(mockConsoleError).toHaveBeenCalledWith('[HTTP ERROR] 404', mockError?.response?.data)
  })

  it('log "No response" when error has no response', async () => {
    const mockError = { message: 'Network Error' } as unknown as AxiosError

    await expect(errorInterceptor(mockError)).rejects.toEqual(mockError)

    expect(mockConsoleError).toHaveBeenCalledWith('[HTTP ERROR] No response', mockError)
  })

  it('reject with the same error object', async () => {
    const mockError = { message: 'Something failed' } as unknown as AxiosError

    const result = errorInterceptor(mockError)

    await expect(result).rejects.toBe(mockError)
  })
})
