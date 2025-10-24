'use client'

import { ProductGallery } from '@/modules/Product/components/ProductGallery/ProductGallery'
import { useProductItem } from '@/modules/Product/hooks/useProductItem'
import { SearchHeader } from '@/shared/ui'
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb'
import { Paper } from '@/shared/ui/Paper/Paper'
import { useParams } from 'next/navigation'
import { ProductPageSkeleton } from './page-skeleton'
import styles from './page.module.scss'

export default function ProductPage() {
  const { id } = useParams()
  const { data, isLoading, isNotFound, error } = useProductItem(id as string)
  const showInstallments =
    data?.installments && data?.installments_amount && data?.installments_rate === 0

  if (isLoading) {
    return <ProductPageSkeleton />
  }

  if (isNotFound || error || !data) {
    return (
      <div className={styles.centered}>
        <p className="text-muted-foreground">Produto não encontrado.</p>
      </div>
    )
  }

  const images =
    data.pictures?.map((src: string, index: number) => ({
      id: String(index + 1),
      src,
      alt: `${data.title} - imagem ${index + 1}`,
      thumbnail: src,
    })) ?? []

  const breadcrumbItems = data.category_path_from_root?.map((label: string) => ({ label })) || []

  return (
    <div className={styles.page}>
      <SearchHeader />
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
        <Paper className={styles.paper}>
          <div className={styles.productSection}>
            {images.length > 0 && (
              <div className={styles.galleryWrapper}>
                <ProductGallery images={images} />
              </div>
            )}

            <div className={styles.details}>
              <p className={styles.condition}>
                {data.condition === 'new' ? 'Novo' : 'Usado'} | +{data.sold_quantity} vendidos
              </p>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.seller}>Por {data.seller || 'OCEANGREEN ARGENTINA'}</p>

              <div className={styles.priceBlock}>
                <h2 className={styles.price}>
                  {new Intl.NumberFormat('es-AR', {
                    style: 'currency',
                    currency: data.price.currency,
                    maximumFractionDigits: 0,
                  }).format(data.price.amount)}
                </h2>

                {showInstallments && (
                  <p className={styles.installments}>
                    Mesmo preço em {data.installments} sem juros de{' '}
                    {data.installments_amount.toLocaleString()}
                  </p>
                )}

                {data.free_shipping && <p className={styles.freeShipping}>Envío gratis</p>}

                {data.attributes?.some((a: any) => a.name === 'Color') && (
                  <p className={styles.color}>
                    Color:{' '}
                    <span className={styles.colorValue}>
                      {data.attributes.find((a: any) => a.name === 'Color')?.value_name}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3>Descrição</h3>
            <p>{data.description || 'Sem descrição disponível.'}</p>
          </div>

          {data.attributes?.length > 0 && (
            <div className={styles.characteristicsSection}>
              <h3>Características</h3>
              <ul>
                {data.attributes.map((attr: any) => (
                  <li key={attr.id}>
                    {attr.name}
                    <span>{attr.value_name || '—'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}
