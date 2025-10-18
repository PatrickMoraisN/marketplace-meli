'use client'

import { SearchBar } from '@/modules/Search/components/SearchBar/SearchBar'
import Image from 'next/image'
import styles from './SearchHeader.module.scss'

export const SearchHeader = () => {
  return (
    <header className={styles.searchHeader}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image src="/meli-logo.png" alt="Mercado Livre" width={140} height={40} priority />
        </div>

        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
