'use client'

import { cn } from '@/shared/utils/classNames'
import Link from 'next/link'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Navegação de categorias" className={cn(styles.breadcrumb, className)}>
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              )}

              {!isLast && <span className={styles.separator}>›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
