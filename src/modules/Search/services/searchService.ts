import { SearchResponseDTO } from '@/app/api/types/dto'
import { httpClient } from '@/shared/api/httpClient'

export const searchService = {
  async getItems(query: string, offset = 0): Promise<SearchResponseDTO> {
    const response = await httpClient.request<SearchResponseDTO>({
      url: `/items?q=${encodeURIComponent(query)}&offset=${offset}`,
      method: 'GET',
    })
    const items = response.data
    return items
  },
}
