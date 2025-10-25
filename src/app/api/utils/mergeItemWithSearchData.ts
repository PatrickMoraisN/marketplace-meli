import { SearchResultItemMockDTO } from '../types/dto'

export function mergeItemWithSearchData(item: any, searchResult: SearchResultItemMockDTO | undefined): any {
  if (!searchResult) return item

  const searchInstallments = searchResult.installments

  if (searchInstallments && typeof searchInstallments === 'object') {
    item.installments = {
      quantity: searchInstallments.quantity ?? 0,
      amount: searchInstallments.amount ?? 0,
      rate: searchInstallments.rate ?? 0,
      currency_id: searchInstallments.currency_id ?? 'ARS',
    }
  }

  item.sold_quantity = searchResult.sold_quantity ?? item.sold_quantity ?? 0

  item.shipping = {
    ...(item.shipping || {}),
    ...(searchResult.shipping || {}),
  }

  item.original_price = item.original_price ?? searchResult.original_price ?? item.price

  if (searchResult.price) {
    item.price = searchResult.price
  }

  if (!item.condition && searchResult.condition) {
    item.condition = searchResult.condition
  }

  return item
}
