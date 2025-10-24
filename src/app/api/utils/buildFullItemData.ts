export function buildFullItemData(item: any, description: any, category: any) {
  return {
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: 0,
        regular_amount: item.original_price || null,
      },
      pictures: item.pictures?.map((p: any) => p.secure_url || p.url) || [],
      condition: item.condition,
      free_shipping: item.shipping?.free_shipping ?? true,
      sold_quantity: item.initial_quantity ?? 0,
      installments: item.installments?.quantity ? `${item.installments.quantity}x` : '',
      installments_amount: item.installments?.amount ?? 0,
      installments_rate: item.installments?.rate ?? 0,
      description: description.plain_text ?? '',
      attributes:
        item.attributes
          ?.map((attr: any) => ({
            id: attr.id,
            name: attr.name,
            value_name: attr.value_name,
          }))
          .slice(0, 8) ?? [],
      category_path_from_root: category?.path_from_root?.map((c: any) => c.name) ?? [],
    },
  }
}
