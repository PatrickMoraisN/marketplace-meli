import { SearchResponseDTO } from '@/app/api/types/dto'
import { HttpClientFactory } from '@/shared/api/httpClientFactory'

const http = HttpClientFactory.createAxiosClient({
  baseURL: '/api',
})

export const searchService = {
  async getItems(query: string): Promise<SearchResponseDTO> {
    const response = await http.request<SearchResponseDTO>({
      url: `/items?q=${encodeURIComponent(query)}`,
      method: 'GET',
    })
    const items = response.data
    return items
  },
}
