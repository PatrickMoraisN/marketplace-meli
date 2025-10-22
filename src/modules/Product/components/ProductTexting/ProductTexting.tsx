'use client'

import { cn } from '@/shared/utils/classNames'
import { ReactNode } from 'react'
import styles from './ProductTexting.module.scss'

interface ProductTextingBaseProps {
  children: ReactNode
  className?: string
  as?: React.ElementType
  'aria-label'?: string
}

function BaseText({ children, className, as: Tag = 'span', ...props }: ProductTextingBaseProps) {
  return (
    <Tag className={cn(styles.base, className)} {...props}>
      {children}
    </Tag>
  )
}

export const ProductTexting = {
  Title: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="h2"
      className={cn(styles.title, className)}
      aria-label="Título do produto"
      {...props}
    >
      {children}
    </BaseText>
  ),

  Price: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.price, className)}
      aria-label="Preço do produto"
      {...props}
    >
      {children}
    </BaseText>
  ),

  OldPrice: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.oldPrice, className)}
      aria-label="Preço anterior"
      {...props}
    >
      {children}
    </BaseText>
  ),

  Discount: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.discount, className)}
      aria-label="Desconto aplicado"
      {...props}
    >
      {children}
    </BaseText>
  ),

  Installments: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.installments, className)}
      aria-label="Informações de parcelamento"
      {...props}
    >
      {children}
    </BaseText>
  ),

  Shipping: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.shipping, className)}
      aria-label="Informações de envio"
      {...props}
    >
      {children}
    </BaseText>
  ),

  Seller: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText as="span" className={cn(styles.seller, className)} aria-label="Vendedor" {...props}>
      {children}
    </BaseText>
  ),

  Condition: ({ children, className, ...props }: ProductTextingBaseProps) => (
    <BaseText
      as="span"
      className={cn(styles.condition, className)}
      aria-label="Condição do produto"
      {...props}
    >
      {children}
    </BaseText>
  ),
}
