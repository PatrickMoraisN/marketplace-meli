'use client'

import { SearchBar } from '@/modules/Search/components/SearchBar/SearchBar'
import { normalizeSearchQuery } from '@/modules/Search/utils/normalizeSearchQuery'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './SearchHeader.module.scss'

export const SearchHeader = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchParam = searchParams.get('search')
  const currentSearch = searchParam ? decodeURIComponent(searchParam) : ''

  const handleSearch = (value: string) => {
    const normalized = normalizeSearchQuery(value)
    if (!normalized) return
    router.push(`/items?search=${normalized}`)
  }

  return (
    <header className={styles.searchHeader}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link href="/" aria-label="Ir para a página inicial">
            <Image src="/meli-logo.png" alt="Mercado Livre Logo" width={140} height={40} priority />
          </Link>
        </div>

        <div className={styles.searchWrapper}>
          <SearchBar onSearch={handleSearch} defaultValue={currentSearch} />
        </div>
      </div>
    </header>
  )
}
