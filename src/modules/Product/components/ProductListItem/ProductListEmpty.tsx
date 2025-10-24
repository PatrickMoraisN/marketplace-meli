'use client'

import { useSearchHistory } from '@/modules/Search/hooks/useSearchHistory'
import { timeAgo } from '@/shared/utils/date'
import { useRouter } from 'next/navigation'
import styles from './ProductListEmpty.module.scss'

interface ProductListEmptyProps {
  message?: string
  className?: string
}

export function ProductListEmpty({
  message = 'Nenhum resultado encontrado.',
}: ProductListEmptyProps) {
  const { history } = useSearchHistory()
  const router = useRouter()

  const handleSearchClick = (term: string) => {
    router.push(`/items?search=${encodeURIComponent(term)}`)
  }

  return (
    <div className={styles.empty} role="status" aria-live="polite" aria-label="Lista de produtos vazia">
      <div className={styles.icon}>🔍</div>
      <h2 className={styles.title}>Nenhum resultado encontrado</h2>
      <p className={styles.message}>{message}</p>

      {history.length > 0 && (
        <div className={styles.historySection}>
          <p className={styles.historyTitle}>Você já pesquisou por</p>
          <div className={styles.historyList}>
            {history.map((item, index) => (
              <div
                key={index}
                className={styles.historyItem}
                onClick={() => handleSearchClick(item.term)}
              >
                <span className={styles.searchTerm}>{item.term}</span>
                <span className={styles.timestamp}>{timeAgo(item.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
