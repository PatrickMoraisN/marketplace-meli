'use client'

import { SearchHeader } from '@/shared/ui'
import { Paper } from '@/shared/ui/Paper/Paper'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import styles from './page.module.scss'
import skeletonStyles from './page-skeleton.module.scss'

export function ProductListPageSkeleton() {
  return (
    <>
      <SearchHeader />
      <main className={styles.itemsPage}>
        <div className={styles.container}>
          <Paper className={styles.paperContent}>
            <div className={skeletonStyles.list}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={skeletonStyles.item}>
                  <div className={skeletonStyles.imageWrapper}>
                    <Skeleton width={180} height={180} radius={8} />
                  </div>
                  <div className={skeletonStyles.content}>
                    <Skeleton width="80%" height={20} style={{ marginBottom: '12px' }} />
                    <Skeleton width="60%" height={20} style={{ marginBottom: '16px' }} />
                    <Skeleton width={140} height={32} style={{ marginBottom: '8px' }} />
                    <Skeleton width={200} height={16} />
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        </div>
      </main>
    </>
  )
}
