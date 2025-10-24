'use client'

import { ProductTexting } from '@/modules/Product/components/ProductTexting/ProductTexting'
import { cn } from '@/shared/utils/classNames'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductListItem.module.scss'

interface ProductListItemProps {
  id: string
  title: string
  picture: string
  price: { currency: string; amount: number; regular_amount?: number }
  condition: string
  free_shipping: boolean
  installments?: string
  installmentsAmount?: number
  installmentsRate?: number
  seller?: string
  discount?: string
  className?: string
  type?: string
}

export function ProductListItem({
  id,
  title,
  picture,
  price,
  condition,
  free_shipping,
  installments,
  installmentsAmount,
  installmentsRate,
  seller,
  type,
  discount,
  className,
}: ProductListItemProps) {
  const showInstallments = installments && installmentsAmount && installmentsRate === 0

  return (
    <Link
      href={`/items/${id}`}
      className={cn(styles.item, className)}
      aria-label={`Ver detalhes do produto: ${title}`}
      prefetch
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
          {price.regular_amount && type === 'promotion' && (
            <ProductTexting.OldPrice>
              ${price.regular_amount.toLocaleString()}
            </ProductTexting.OldPrice>
          )}
          <ProductTexting.Price>${price.amount.toLocaleString()}</ProductTexting.Price>
          {discount && <ProductTexting.Discount>{discount}</ProductTexting.Discount>}
        </div>

        {showInstallments && (
          <ProductTexting.Installments>
            Mesmo preço em {installments} sem juros de ${installmentsAmount?.toLocaleString()}
          </ProductTexting.Installments>
        )}

        {free_shipping && <ProductTexting.Shipping>Envio grátis</ProductTexting.Shipping>}

        <ProductTexting.Condition>
          {condition === 'new' ? 'Novo' : 'Reacondicionado'}
        </ProductTexting.Condition>
      </div>
    </Link>
  )
}
