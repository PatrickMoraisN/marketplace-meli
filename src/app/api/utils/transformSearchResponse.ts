import { SearchResponseDTO } from '@/app/api/types/dto'

export function transformSearchResponse(
  results: any[],
  query: string,
  offset = 0
): SearchResponseDTO {
  const filtered = results.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))

  return {
    categories: [query],
    items: filtered.slice(offset, offset + 10).map((r: any) => ({
      id: r.id,
      title: r.title,
      price: {
        currency: r.currency_id,
        amount: r.price,
        decimals: 0,
        regular_amount: r.original_price ?? r.price,
      },
      picture: r.thumbnail,
      condition: r.condition,
      free_shipping: r.shipping?.free_shipping ?? false,
      installments: r.installments?.quantity ? `${r.installments.quantity}x` : '',
    })),
  }
}
