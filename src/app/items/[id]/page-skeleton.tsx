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
          <Skeleton width={300} height={16} />
        </div>

        <Paper className={styles.paper}>
          <div className={styles.productSection}>
            <div className={styles.gallerySkeleton}>
              <Skeleton width="100%" height={400} radius={8} />
              <div className={styles.thumbnailRow}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width={64} height={64} radius={8} />
                ))}
              </div>
            </div>

            <div className={styles.detailsSkeleton}>
              <Skeleton width={160} height={14} />
              <Skeleton width="90%" height={32} />
              <Skeleton width="70%" height={28} />
              <Skeleton width={200} height={16} />
              <Skeleton width={220} height={44} />
              <Skeleton width="80%" height={16} />
            </div>
          </div>

          <div className={styles.descriptionSkeleton}>
            <Skeleton width={140} height={22} />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={`${95 - i * 3}%`} height={16} />
            ))}
          </div>

          <div className={styles.characteristicsSkeleton}>
            <Skeleton width={180} height={22} />
            <div className={styles.characteristicsGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.characteristicsItem}>
                  <Skeleton width="60%" height={14} />
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
