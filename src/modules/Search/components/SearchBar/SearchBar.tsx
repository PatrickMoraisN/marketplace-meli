'use client'

import { LOCAL_STORAGE_KEYS } from '@/shared/constants'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { TextInput } from '@/shared/ui'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { SearchHistory } from '../SearchHistory/SearchHistory'
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch?: (value: string) => void
  placeholder?: string
  defaultValue?: string
}

interface SearchRecord {
  term: string
  timestamp: number
}

export const SearchBar = ({ onSearch, placeholder, defaultValue = '' }: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useLocalStorage<SearchRecord[]>(
    LOCAL_STORAGE_KEYS.LAST_SEARCHED_ITEMS,
    []
  )

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSubmit = () => {
    if (!value.trim()) return

    const newRecord: SearchRecord = { term: value.trim(), timestamp: Date.now() }
    const updatedHistory = [newRecord, ...history.filter((h) => h.term !== value)].slice(0, 5)
    setHistory(updatedHistory)

    if (onSearch) onSearch(value)
    setShowHistory(false)
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar}>
        <TextInput
          variant="search"
          placeholder={placeholder || 'Buscar produtos, marcas e mais...'}
          aria-label="Buscar produtos"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
          }}
        />

        <div className={styles.separator} />

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Buscar"
          onClick={handleSubmit}
        >
          <Image src="/search-icon.png" alt="Ícone de busca" width={18} height={18} priority />
        </button>

        {showHistory && history.length > 0 && (
          <SearchHistory
            history={history.slice(0, 2)}
            onSelect={(term: string) => {
              setValue(term)
              if (onSearch) onSearch(term)
              setShowHistory(false)
            }}
          />
        )}
      </div>

      <WelcomeMessage />
    </div>
  )
}
