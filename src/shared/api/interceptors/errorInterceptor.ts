import type { AxiosError } from 'axios'

export const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error(`[HTTP ERROR] ${error.response.status}`, error.response.data)
  } else {
    console.error('[HTTP ERROR] No response', error)
  }

  return Promise.reject(error)
}
