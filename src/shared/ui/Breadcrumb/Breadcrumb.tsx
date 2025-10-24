'use client'

import { cn } from '@/shared/utils/classNames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
  items: { label: string }[]
  className?: string
}

function BackToList({ url }: { url: string }) {
  return (
    <Link href={url} className={styles.backLink}>
      Voltar para lista
    </Link>
  )
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const backToListUrl = search ? `/items?search=${encodeURIComponent(search)}` : '/items'

  return (
    <nav aria-label="Navegação de categorias" className={cn(styles.breadcrumb, className)}>
      <div className={styles.inner}>
        <BackToList url={backToListUrl} />

        {items.length !== 0 && <span className={styles.divider}>|</span>}

        <ol className={styles.list}>
          {items.map((item, index) => (
            <li key={item.label} className={styles.item}>
              <span
                className={index === items.length - 1 ? styles.current : styles.link}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
              {index < items.length - 1 && <span className={styles.separator}>›</span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
