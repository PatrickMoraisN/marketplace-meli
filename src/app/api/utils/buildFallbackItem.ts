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
        currency: found.currency_id || found.price?.currency_id || 'BRL',
        amount: found.price?.amount || found.price || 0,
        decimals: 0,
        regular_amount: found.original_price || found.price?.regular_amount || null,
      },
      pictures: found.thumbnail
        ? [found.thumbnail]
        : found.pictures
        ? found.pictures.map((pic: any) => pic.url)
        : [],
      condition: found.condition || 'new',
      free_shipping: found.shipping?.free_shipping ?? false,
      sold_quantity: found.sold_quantity ?? 0,
      installments:
        found.installments && found.installments.quantity
          ? `${found.installments.quantity}x de $${found.installments.amount}`
          : null,
      description: 'Descrição não disponível.',
      attributes: found.attributes || [],
      category_path_from_root: found.category_path_from_root?.map((cat: any) => cat.name) || [],
    },
  }
}
