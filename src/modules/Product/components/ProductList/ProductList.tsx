import { ItemDTO } from '@/app/api/types/dto'
import { ProductListEmpty } from '../ProductListItem/ProductListEmpty'
import { ProductListItem } from '../ProductListItem/ProductListItem'
import styles from './ProductList.module.scss'

interface ProductListProps {
  products: ItemDTO[] | undefined
}

export function ProductList({ products }: ProductListProps) {
  const hasProducts = products && products.length > 0

  return (
    <div className={styles.wrapper}>
      {hasProducts ? (
        <div className={styles.list}>
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              id={item.id}
              title={item.title}
              picture={item.picture}
              price={item.price}
              condition={item.condition}
              free_shipping={item.free_shipping}
              installments={item.installments}
              installmentsAmount={item.installments_amount}
              installmentsRate={item.installments_rate}
              type={item.type}
              seller={item.seller}
            />
          ))}
        </div>
      ) : (
        <ProductListEmpty />
      )}
    </div>
  )
}
