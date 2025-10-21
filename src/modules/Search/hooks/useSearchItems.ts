import { SearchResponseDTO } from '@/app/api/types/dto'
import { useQuery } from '@tanstack/react-query'
import { searchService } from '../services/searchService'

const ITEMS_PER_PAGE = 10

export function useSearchItems(query: string, page = 1) {
  const offset = (page - 1) * ITEMS_PER_PAGE

  return useQuery<SearchResponseDTO>({
    queryKey: ['search', query, page],
    queryFn: () => searchService.getItems(query, offset),
    enabled: !!query,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  })
}
