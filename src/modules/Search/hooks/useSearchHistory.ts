import { LOCAL_STORAGE_KEYS } from '@/shared/constants'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'

export interface SearchRecord {
  term: string
  timestamp: number
}

export function useSearchHistory(limit = 2) {
  const [history, setHistory] = useLocalStorage<SearchRecord[]>(
    LOCAL_STORAGE_KEYS.LAST_SEARCHED_ITEMS,
    []
  )

  const addSearch = (term: string) => {
    const newRecord: SearchRecord = { term: term.trim(), timestamp: Date.now() }
    const updatedHistory = [newRecord, ...history.filter((h) => h.term !== term)].slice(0, limit)
    setHistory(updatedHistory)
  }

  const clearHistory = () => setHistory([])

  return { history, addSearch, clearHistory }
}
