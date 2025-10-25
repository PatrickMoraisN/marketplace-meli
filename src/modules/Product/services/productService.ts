import { httpClient } from '@/shared/api/httpClient'
import { ProductItemDTO, ProductResponseDTO } from '@/app/api/types/dto'

export const productsService = {
  async getItemById(id: string): Promise<ProductItemDTO> {
    const response = await httpClient.request<ProductResponseDTO>({
      url: `/items/${id}`,
      method: 'GET',
    })

    return response.data.item
  },
}
