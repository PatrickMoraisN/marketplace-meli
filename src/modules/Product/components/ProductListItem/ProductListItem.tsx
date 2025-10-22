'use client'

import { ProductTexting } from '@/modules/Product/components/ProductTexting/ProductTexting'
import { cn } from '@/shared/utils/classNames'
import Image from 'next/image'
import styles from './ProductListItem.module.scss'

interface ProductListItemProps {
  id: string
  title: string
  picture: string
  price: { currency: string; amount: number }
  condition: string
  free_shipping: boolean
  installments?: string
  seller?: string
  oldPrice?: number
  discount?: string
  onClick?: () => void
  className?: string
}

export function ProductListItem({
  id,
  title,
  picture,
  price,
  condition,
  free_shipping,
  installments,
  seller,
  oldPrice,
  discount,
  onClick,
  className,
}: ProductListItemProps) {
  return (
    <article
      key={id}
      className={cn(styles.item, className)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Produto: ${title}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={picture}
          alt={title}
          width={250}
          height={259}
          className={styles.image}
          priority
          unoptimized
          quality={100}
        />
      </div>

      <div className={styles.info}>
        <ProductTexting.Title>{title}</ProductTexting.Title>

        {seller && <ProductTexting.Seller>Por {seller}</ProductTexting.Seller>}

        <div className={styles.priceBlock}>
          {oldPrice && (
            <ProductTexting.OldPrice>${oldPrice.toLocaleString()}</ProductTexting.OldPrice>
          )}
          <ProductTexting.Price>${price.amount.toLocaleString()}</ProductTexting.Price>
          {discount && <ProductTexting.Discount>{discount}</ProductTexting.Discount>}
        </div>

        {installments && <ProductTexting.Installments>{installments}</ProductTexting.Installments>}

        {free_shipping && <ProductTexting.Shipping>Envio gratis</ProductTexting.Shipping>}

        <ProductTexting.Condition>
          {condition === 'new' ? 'Novo' : 'Reacondicionado'}
        </ProductTexting.Condition>
      </div>
    </article>
  )
}
