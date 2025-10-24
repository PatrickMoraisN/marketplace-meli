import { productsService } from '@/modules/Product/services/productService'
import { createMetadata } from '@/shared/utils/seo'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props) {
  const product = await productsService.getItemById(params.id)

  return createMetadata({
    title: product.title,
    description: product.description,
    image: product.pictures?.[0],
    path: `/items/${params.id}`,
  })
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
