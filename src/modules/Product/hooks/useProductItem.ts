import { useQuery } from '@tanstack/react-query'
import { productsService } from '../services/productService'

export function useProductItem(id?: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getItemById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  })
}
