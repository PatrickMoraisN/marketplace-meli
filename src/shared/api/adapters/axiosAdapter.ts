import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { HttpAdapter, HttpResponse, RequestConfig } from '../types/http'

export class AxiosAdapter implements HttpAdapter {
  private instance: AxiosInstance

  constructor(baseURL: string, interceptors?: (instance: AxiosInstance) => void) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    if (interceptors) interceptors(this.instance)
  }

  async request<T = any>(config: RequestConfig): Promise<HttpResponse<T>> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers,
        timeout: config.timeout,
      }

      const response = await this.instance.request<T>(axiosConfig)

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
      }
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      return new Error(`HTTP ${error.response.status}: ${error.response.statusText}`)
    }
    if (error.request) {
      return new Error('Network Error: No response received')
    }
    return new Error(error.message)
  }
}
