'use client'

import { cn } from '@/shared/utils/classNames'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  totalPages: number
  basePath: string
  maxVisiblePages?: number
  showNavigationButtons?: boolean
  disabled?: boolean
}

export function Pagination({
  totalPages,
  basePath,
  maxVisiblePages = 3,
  showNavigationButtons = true,
  disabled = false,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1

  if (totalPages <= 0) return null

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || disabled || page === currentPage) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())

    router.push(`${basePath}?${params.toString()}`)
  }

  const renderPages = useMemo(() => {
    const pages: (number | string)[] = []
    const delta = Math.floor(maxVisiblePages / 2)

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    const leftRange = Math.max(2, currentPage - delta)
    const rightRange = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)

    if (leftRange > 2) pages.push('...')

    for (let i = leftRange; i <= rightRange; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    if (rightRange < totalPages - 1) pages.push('...')

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }, [currentPage, totalPages, maxVisiblePages])

  const canGoPrev = currentPage > 1 && !disabled
  const canGoNext = currentPage < totalPages && !disabled

  return (
    <nav className={styles.pagination} aria-label="Navegação de páginas">
      <ul className={styles.list}>
        {showNavigationButtons && (
          <li>
            <button
              className={cn(styles.pageButton, styles.navButton, styles.prevButton, {
                [styles.disabled]: !canGoPrev,
              })}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!canGoPrev}
              aria-label="Página anterior"
            >
              <span aria-hidden="true">&lt;</span>
              <span className={styles.navText}>Anterior</span>
            </button>
          </li>
        )}

        {renderPages.map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              <span className={styles.ellipsisText}>...</span>
            </li>
          ) : (
            <li key={page}>
              <button
                className={cn(styles.pageButton, {
                  [styles.active]: page === currentPage,
                  [styles.disabled]: disabled,
                })}
                onClick={() => handlePageChange(page as number)}
                disabled={disabled}
                aria-label={
                  page === currentPage ? `Página ${page}, página atual` : `Ir para página ${page}`
                }
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}

        {showNavigationButtons && (
          <li>
            <button
              className={cn(styles.pageButton, styles.navButton, styles.nextButton, {
                [styles.disabled]: !canGoNext,
              })}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!canGoNext}
              aria-label="Próxima página"
            >
              <span className={styles.navText}>Seguinte</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </li>
        )}
      </ul>

      <div className={styles.srOnly}>
        Página {currentPage} de {totalPages}
      </div>
    </nav>
  )
}
