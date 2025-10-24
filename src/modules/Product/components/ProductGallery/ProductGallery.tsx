'use client'

import { cn } from '@/shared/utils/classNames'
import Image from 'next/image'
import { useState } from 'react'
import styles from './ProductGallery.module.scss'

interface GalleryImage {
  id: string
  src: string
  alt: string
  thumbnail?: string
}

interface ProductGalleryProps {
  images: GalleryImage[]
  className?: string
}

export function ProductGallery({ images, className }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(true)

  if (!images?.length)
    return (
      <div className={cn(styles.gallery, styles.empty, className)}>
        <p>Nenhuma imagem disponível</p>
      </div>
    )

  const visible = images.slice(0, 6)
  const total = images.length
  const current = visible[selected]

  return (
    <div className={cn(styles.gallery, className)}>
      <div className={styles.thumbnails}>
        {visible.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => {
              setSelected(index)
              setLoading(true)
            }}
            className={cn(styles.thumb, { [styles.active]: index === selected })}
          >
            <Image src={img.thumbnail || img.src} alt="" fill className={styles.thumbImg} />
          </button>
        ))}
      </div>

      <div className={styles.mainImageContainer}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        )}
        <Image
          key={current.id}
          src={current.src}
          alt={current.alt}
          fill
          priority
          className={cn(styles.mainImage, { [styles.loading]: loading })}
          onLoad={() => setLoading(false)}
        />
        <div className={styles.badge}>
          {selected + 1} / {total}
        </div>
      </div>
    </div>
  )
}
