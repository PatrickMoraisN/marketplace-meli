import { SearchDataDTO } from '@/app/api/types/dto'

export function transformSearchResponse(results: any[], query: string, offset = 0): SearchDataDTO {
  const ITEMS_PER_PAGE = 10
  const filtered = results.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

  return {
    categories: [query],
    total_items: filtered.length,
    items: filtered.slice(offset, offset + ITEMS_PER_PAGE).map((r: any) => ({
      id: r.id,
      title: r.title,
      price: {
        currency: r.currency_id,
        amount: r.price,
        decimals: 0,
        regular_amount: r.original_price ?? r.price,
      },
      type: r.sale_price.type,
      picture: r.thumbnail,
      condition: r.condition,
      seller: r.seller?.nickname ?? '',
      free_shipping: r.shipping?.free_shipping ?? false,
      installments: r.installments?.quantity ? `${r.installments.quantity}x` : '',
      installments_amount: r.installments?.amount ?? 0,
      installments_rate: r.installments?.rate ?? 0,
    })),
  }
}
