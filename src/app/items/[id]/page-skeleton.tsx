'use client'

import { SearchHeader } from '@/shared/ui'
import { Paper } from '@/shared/ui/Paper/Paper'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import styles from './page.module.scss'

export function ProductPageSkeleton() {
  return (
    <div className={styles.page}>
      <SearchHeader />

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Skeleton width={280} height={14} />
        </div>

        <Paper className={styles.paper}>
          <div className={styles.productSection}>
            <div className={styles.gallerySkeleton}>
              <Skeleton width="100%" height={400} radius={8} />
            </div>

            <div className={styles.detailsSkeleton}>
              <div className={styles.titleBlock}>
                <Skeleton width="80%" height={28} />
                <Skeleton width="60%" height={18} />
              </div>

              <div className={styles.priceBlock}>
                <Skeleton width={160} height={36} />
                <Skeleton width={220} height={44} />
              </div>

              <div className={styles.shippingBlock}>
                <Skeleton width={120} height={16} />
                <Skeleton width={160} height={16} />
              </div>

              <div className={styles.actionsBlock}>
                <Skeleton width="60%" height={44} radius={8} />
                <Skeleton width="40%" height={44} radius={8} />
              </div>

              <div className={styles.sellerBlock}>
                <Skeleton width="70%" height={14} />
                <Skeleton width="50%" height={14} />
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.descriptionSkeleton}>
            <Skeleton width={180} height={22} />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width={`${100 - i * 5}%`} height={16} />
            ))}
          </div>

          <div className={styles.characteristicsSkeleton}>
            <Skeleton width={200} height={22} />
            <div className={styles.characteristicsGrid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.characteristicsItem}>
                  <Skeleton width="50%" height={14} />
                  <Skeleton width="80%" height={14} />
                </div>
              ))}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  )
}
