import { HttpClientFactory } from './httpClientFactory'

export const httpClient = HttpClientFactory.createAxiosClient({
  baseURL: '/api',
})
