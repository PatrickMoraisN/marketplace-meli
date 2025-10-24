'use client'

import { cn } from '@/shared/utils/classNames'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  radius?: string | number
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ width, height, radius = 6, className, style }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
      }}
    />
  )
}
