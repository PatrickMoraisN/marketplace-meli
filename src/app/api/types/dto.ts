export interface ItemDTO {
  id: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
    regular_amount: number
  }
  picture: string
  condition: string
  free_shipping: boolean
  installments: string
}

export interface SearchDataDTO {
  categories: string[]
  items: ItemDTO[]
}

export interface SearchResponseDTO {
  data: SearchDataDTO
}
