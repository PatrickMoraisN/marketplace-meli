import { AxiosAdapter } from './adapters/axiosAdapter'
import { attachInterceptors } from './interceptors'
import { HttpAdapter } from './types/http'

type ClientOptions = {
  baseURL?: string
  withAuth?: boolean
  timeout?: number
}

export class HttpClientFactory {
  static createAxiosClient(options?: ClientOptions): HttpAdapter {
    const { baseURL = '/api' } = options || {}

    const adapter = new AxiosAdapter(baseURL, (instance) => {
      attachInterceptors(instance)
    })

    return adapter
  }
}
