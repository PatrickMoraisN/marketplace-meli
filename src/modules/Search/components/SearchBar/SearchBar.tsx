'use client'

import { TextInput } from '@/shared/ui'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { WelcomeMessage } from '../WelcomeMessage/WelcomeMessage'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  onSearch?: (value: string) => void
  placeholder?: string
  defaultValue?: string
}

export const SearchBar = ({ onSearch, placeholder, defaultValue = '' }: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSubmit = () => {
    if (onSearch) onSearch(value)
  }

  return (
    <div className={styles.searchBar}>
      <TextInput
        variant="search"
        placeholder={placeholder || 'Buscar produtos, marcas e mais...'}
        aria-label="Buscar produtos"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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

      <WelcomeMessage />
    </div>
  )
}
