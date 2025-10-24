export interface ItemDTO {
  id: string
  title: string
  price:
    | {
        currency: string
        amount: number | string
        decimals: number
        regular_amount: number
      }
    | any
  picture: string
  condition: string
  free_shipping: boolean
  installments: string
  installments_amount: number
  installments_rate: number
  seller: string
  type: string
}

export interface SearchResultItemMockDTO {
  id: string
  title: string
  condition: string
  thumbnail: string
  currency_id: string
  price: number | { amount?: number; currency_id?: string; regular_amount?: number | null }
  original_price?: number | null
  sale_price?: {
    price_id?: string
    amount: number | string
    conditions?: {
      eligible?: boolean
      context_restrictions?: string[]
      start_time?: string
      end_time?: string
    }
    currency_id: number | string
    regular_amount?: number | string
    type?: string
  }
  shipping?: {
    free_shipping?: boolean
    mode?: string
    logistic_type?: string
  }
  installments?: {
    quantity?: number
    amount?: number
    rate?: number
    currency_id?: string
  }
  seller?: {
    id?: number
    nickname?: string
  }
  sold_quantity?: number
  pictures?: Array<{ url: string } | string>
  attributes?: any[]
  category_path_from_root?: Array<{ name: string }>
}

export interface SearchDataDTO {
  total_items: number
  categories: string[]
  items: ItemDTO[]
}

export interface SearchResponseDTO {
  data: SearchDataDTO
}
