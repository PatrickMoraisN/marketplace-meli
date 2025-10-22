'use client'

import { useSearchItems } from '@/modules/Search/hooks/useSearchItems'
import { PAGINATION_CONFIG } from '@/shared/config'
import { SearchHeader } from '@/shared/ui'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { ProductList } from '../../modules/Product/components/ProductList/ProductList'
import { Breadcrumb } from '../../shared/ui/Breadcrumb/Breadcrumb'
import styles from './page.module.scss'

export default function ItemsPage() {
  const searchParams = useSearchParams()
  const searchTerm = useMemo(() => {
    const param = searchParams.get('search') || ''
    return decodeURIComponent(param)
  }, [searchParams])

  const page = useMemo(() => {
    const param = searchParams.get('page')
    return param ? Number(param) : 1
  }, [searchParams])

  const { data, isLoading, isError } = useSearchItems(searchTerm, page)
  const totalItems = Number(data?.data.total_items)
  const totalPages = Math.ceil(totalItems / PAGINATION_CONFIG.searchItems.itemsPerPage) || 1

  const products = data?.data.items

  const hasProducts = products && products.length > 0

  return (
    <>
      <SearchHeader />
      <main className={styles.itemsPage}>
        <div className={styles.container}>
          <Breadcrumb
            className={styles.breadcrumb}
            items={[
              { label: 'Celulares e Telefones', href: '/celulares' },
              { label: 'Celulares e Smartphones', href: '/celulares/smartphones' },
              { label: 'Apple iPhone' },
            ]}
          />

          {isLoading && <p>Carregando...</p>}
          {isError && <p>Ocorreu um erro ao buscar os itens.</p>}

          <ProductList products={products} />

          <footer className={styles.paginationFooter}>
            {hasProducts && <Pagination totalPages={totalPages} basePath="/items" />}
          </footer>
        </div>
      </main>
    </>
  )
}
