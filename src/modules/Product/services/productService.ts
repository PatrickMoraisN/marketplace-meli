import { httpClient } from '@/shared/api/httpClient'

export const productsService = {
  async getItemById(id: string) {
    const response = await httpClient.request<{ item: any }>({
      url: `/items/${id}`,
      method: 'GET',
    })

    return response.data.item
  },
}
