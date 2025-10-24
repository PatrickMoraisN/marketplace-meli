import { env } from '@/shared/config/env'
import type { AxiosResponse } from 'axios'

export const loggerInterceptor = (response: AxiosResponse) => {
  if (env.NODE_ENV === 'development') {
    console.info(`[HTTP] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
      status: response.status,
      data: response.data,
    })
  }
  return response
}
