'use client'

interface ProductListEmptyProps {
  message?: string
  className?: string
}

export function ProductListEmpty({
  message = 'Nenhum resultado encontrado.',
}: ProductListEmptyProps) {
  return (
    <div
      style={{ padding: '2rem', textAlign: 'center' }}
      role="status"
      aria-live="polite"
      aria-label="Lista de produtos vazia"
    >
      <p>{message}</p>
    </div>
  )
}
