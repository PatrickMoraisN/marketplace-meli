'use client'

import { timeAgo } from '@/shared/utils/date'
import styles from './SearchHistory.module.scss'

interface SearchRecord {
  term: string
  timestamp: number
}

interface Props {
  history: SearchRecord[]
  onSelect: (term: string) => void
}

export const SearchHistory = ({ history, onSelect }: Props) => {
  return (
    <div className={styles.historyBox}>
      {history.map((item) => (
        <button
          key={item.timestamp}
          className={styles.historyItem}
          onMouseDown={() => onSelect(item.term)}
        >
          <span className={styles.term}>{item.term}</span>
          <span className={styles.time}>{timeAgo(item.timestamp)}</span>
        </button>
      ))}
    </div>
  )
}
