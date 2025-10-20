import { AxiosInstance } from 'axios'
import { errorInterceptor } from './errorInterceptor'
import { loggerInterceptor } from './loggerInterceptor'

export const attachInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(loggerInterceptor, errorInterceptor)
}
