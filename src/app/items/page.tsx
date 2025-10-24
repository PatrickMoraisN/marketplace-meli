'use client'

import { useSearchItems } from '@/modules/Search/hooks/useSearchItems'
import { PAGINATION_CONFIG } from '@/shared/config'
import { SearchHeader } from '@/shared/ui'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { Paper } from '@/shared/ui/Paper/Paper'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ProductList } from '../../modules/Product/components/ProductList/ProductList'
import { ProductListPageSkeleton } from './page-skeleton'
import styles from './page.module.scss'

export default function ItemsPage() {
  const searchParams = useSearchParams()
  const searchTerm = useMemo(
    () => decodeURIComponent(searchParams.get('search') || ''),
    [searchParams]
  )
  const page = useMemo(() => Number(searchParams.get('page') || 1), [searchParams])

  const { data, isLoading, isError } = useSearchItems(searchTerm, page)
  const totalItems = Number(data?.data.total_items)
  const totalPages = Math.ceil(totalItems / PAGINATION_CONFIG.searchItems.itemsPerPage) || 1
  const products = data?.data.items
  const hasProducts = products && products.length > 0

  if (isLoading) {
    return <ProductListPageSkeleton />
  }

  return (
    <>
      <SearchHeader />
      <main className={styles.itemsPage}>
        <div className={styles.container}>
          <Paper className={styles.paperContent}>
            {isError && <p>Ocorreu um erro ao buscar os itens.</p>}

            <ProductList products={products} />
          </Paper>
        </div>
        {hasProducts && (
          <footer className={styles.paginationFooter}>
            <Pagination totalPages={totalPages} basePath="/items" />
          </footer>
        )}
      </main>
    </>
  )
}
