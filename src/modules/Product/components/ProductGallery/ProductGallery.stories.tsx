import type { Meta, StoryObj } from '@storybook/react'
import { ProductGallery } from './ProductGallery'

const meta = {
  title: 'Product/ProductGallery',
  component: ProductGallery,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGallery>

export default meta
type Story = StoryObj<typeof meta>

const mockImages = [
  {
    id: '1',
    src: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    alt: 'Imagem principal do produto',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-T.webp',
  },
  {
    id: '2',
    src: 'https://http2.mlstatic.com/D_NQ_NP_2X_789012-MLA00000000000-000000-F.webp',
    alt: 'Produto - vista lateral',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_789012-MLA00000000000-000000-T.webp',
  },
  {
    id: '3',
    src: 'https://http2.mlstatic.com/D_NQ_NP_2X_345678-MLA00000000000-000000-F.webp',
    alt: 'Produto - vista traseira',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_345678-MLA00000000000-000000-T.webp',
  },
  {
    id: '4',
    src: 'https://http2.mlstatic.com/D_NQ_NP_2X_901234-MLA00000000000-000000-F.webp',
    alt: 'Detalhes do produto',
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_901234-MLA00000000000-000000-T.webp',
  },
]

export const Default: Story = {
  args: {
    images: mockImages,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '680px', padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const SingleImage: Story = {
  args: {
    images: [mockImages[0]],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '680px', padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const TwoImages: Story = {
  args: {
    images: mockImages.slice(0, 2),
  },
  decorators: [
    (Story) => (
      <div style={{ width: '680px', padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const SixImages: Story = {
  args: {
    images: [
      ...mockImages,
      {
        id: '5',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_567890-MLA00000000000-000000-F.webp',
        alt: 'Produto em uso',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_567890-MLA00000000000-000000-T.webp',
      },
      {
        id: '6',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLA00000000000-000000-F.webp',
        alt: 'Embalagem do produto',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLA00000000000-000000-T.webp',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '680px', padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const ManyImages: Story = {
  args: {
    images: [
      ...mockImages,
      {
        id: '5',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_567890-MLA00000000000-000000-F.webp',
        alt: 'Produto em uso',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_567890-MLA00000000000-000000-T.webp',
      },
      {
        id: '6',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLA00000000000-000000-F.webp',
        alt: 'Embalagem do produto',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_678901-MLA00000000000-000000-T.webp',
      },
      {
        id: '7',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_234567-MLA00000000000-000000-F.webp',
        alt: 'Acessórios inclusos',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_234567-MLA00000000000-000000-T.webp',
      },
      {
        id: '8',
        src: 'https://http2.mlstatic.com/D_NQ_NP_2X_890123-MLA00000000000-000000-F.webp',
        alt: 'Especificações técnicas',
        thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_2X_890123-MLA00000000000-000000-T.webp',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '680px', padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}
