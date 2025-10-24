import { useQuery } from '@tanstack/react-query'
import { productsService } from '../services/productService'

export function useProductItem(id?: string) {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getItemById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
    retry: false,
  })

  const isNotFound = query.error && (query.error as any)?.response?.status === 404

  return {
    ...query,
    isNotFound,
  }
}
