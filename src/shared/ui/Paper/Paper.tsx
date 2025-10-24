'use client'

import { cn } from '@/shared/utils/classNames'
import styles from './Paper.module.scss'

interface PaperProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Paper({ children, className, as: Tag = 'div' }: PaperProps) {
  return <Tag className={cn(styles.paper, className)}>{children}</Tag>
}
