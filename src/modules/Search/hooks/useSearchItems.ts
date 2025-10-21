import { SearchResponseDTO } from '@/app/api/types/dto'
import { useQuery } from '@tanstack/react-query'
import { searchService } from '../services/searchService'

export function useSearchItems(query: string, offset = 0) {
  return useQuery<SearchResponseDTO>({
    queryKey: ['search', query, offset],
    queryFn: () => searchService.getItems(query, offset),
    enabled: !!query,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  })
}
