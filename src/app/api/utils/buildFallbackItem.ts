import { loadAllMockResults } from './loadMocks'

export function buildFallbackItem(id: string) {
  const allResults = loadAllMockResults()
  if (!allResults || allResults.length === 0) return null

  const found = allResults.find((item: any) => item.id === id)
  if (!found) return null
  return {
    item: {
      id: found.id,
      title: found.title,
      price: {
        currency: found.currency_id || 'BRL',
        amount: found.price || 0,
        decimals: 0,
        regular_amount: found.original_price || null,
      },
      pictures: found.thumbnail
        ? [found.thumbnail]
        : found.pictures
        ? found.pictures.map((pic: any) => pic.url)
        : [],
      condition: found.condition || 'new',
      free_shipping: found.shipping?.free_shipping ?? false,
      sold_quantity: found.sold_quantity ?? 0,
      installments: found.installments?.quantity ? `${found.installments.quantity}x` : '',
      installments_amount: found.installments?.amount ?? 0,
      installments_rate: found.installments?.rate ?? 0,
      description: 'Descrição não disponível.',
      attributes: found.attributes || [],
      category_path_from_root: found.category_path_from_root?.map((cat: any) => cat.name) || [],
    },
  }
}
