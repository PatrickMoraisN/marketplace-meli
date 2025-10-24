import { HttpClientFactory } from '@/shared/api/httpClientFactory'

const http = HttpClientFactory.createAxiosClient({
  baseURL: '/api',
})

export const productsService = {
  async getItemById(id: string) {
    const response = await http.request<{ item: any }>({
      url: `/items/${id}`,
      method: 'GET',
    })

    return response.data.item
  },
}
