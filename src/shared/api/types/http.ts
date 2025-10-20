export interface HttpAdapter {
  request<T = any>(config: RequestConfig): Promise<HttpResponse<T>>
}

export interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
  headers?: Record<string, string>
  timeout?: number
  retries?: number
  cache?: boolean
}

export interface HttpResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface HttpAdapter {
  request<T = any>(config: RequestConfig): Promise<HttpResponse<T>>
}
