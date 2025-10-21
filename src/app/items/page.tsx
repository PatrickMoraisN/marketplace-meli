'use client'

import { useSearchItems } from '@/modules/Search/hooks/useSearchItems'
import { SearchHeader } from '@/shared/ui'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './page.module.scss'

export default function ItemsPage() {
  const searchParams = useSearchParams()
  const searchTerm = useMemo(() => {
    const param = searchParams.get('search') || ''
    return decodeURIComponent(param)
  }, [searchParams])

  const page = useMemo(() => {
    const param = searchParams.get('page')
    return param ? Number(param) : 1
  }, [searchParams])

  const { data, isLoading, isError } = useSearchItems(searchTerm, page)
  const products = data?.data.items

  return (
    <>
      <SearchHeader />
      <main className={styles.itemsPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Resultados para: <span>{searchTerm}</span>
          </h1>

          {isLoading && <p>Carregando...</p>}
          {isError && <p>Ocorreu um erro ao buscar os itens.</p>}

          {products && (
            <>
              {products && products.length > 0 ? (
                <div>
                  {products.map((item) => (
                    <div key={item.id} style={{ marginBottom: '1rem' }}>
                      <img
                        src={item.picture}
                        alt={item.title}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <p>
                        <strong>{item.title}</strong>
                      </p>
                      <p>
                        💰 {item.price.currency} {item.price.amount.toLocaleString()}
                      </p>
                      <p>📦 Condição: {item.condition === 'new' ? 'Novo' : 'Usado'}</p>
                      <p>🚚 Frete grátis: {item.free_shipping ? 'Sim' : 'Não'}</p>
                      <p>💳 Parcelas: {item.installments || 'N/A'}</p>
                      <hr style={{ margin: '1rem 0' }} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>Nenhum resultado encontrado.</p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}
