'use client'

import { TextInput } from '@/shared/ui'
import Image from 'next/image'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch?: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ onSearch, placeholder }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <TextInput
        variant="search"
        placeholder={placeholder || 'Buscar produtos, marcas e mais...'}
        aria-label="Buscar produtos"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            const target = e.target as HTMLInputElement
            onSearch(target.value)
          }
        }}
      />

      <div className={styles.separator} />

      <button
        type="button"
        className={styles.iconButton}
        aria-label="Buscar"
        onClick={() => {
          const input = document.querySelector<HTMLInputElement>(
            'input[aria-label="Buscar produtos"]'
          )
          if (input && onSearch) onSearch(input.value)
        }}
      >
        <Image src="/search-icon.png" alt="Ícone de busca" width={18} height={18} priority />
      </button>
    </div>
  )
}
