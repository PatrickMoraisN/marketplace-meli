import type { Meta, StoryObj } from '@storybook/react'
import { ProductListItem } from './ProductListItem'

const meta = {
  title: 'Product/ProductListItem',
  component: ProductListItem,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/items',
        query: { search: 'iphone' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'MLA1234567890',
    title: 'iPhone 15 Pro Max 256GB Azul Titânio',
    picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    price: {
      currency: 'ARS',
      amount: 1299999,
    },
    condition: 'new',
    free_shipping: true,
    installments: '12x',
    installmentsAmount: 108333,
    installmentsRate: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', backgroundColor: '#fff', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithPromotion: Story = {
  args: {
    id: 'MLA1234567891',
    title: 'Samsung Galaxy S24 Ultra 512GB Preto',
    picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    price: {
      currency: 'ARS',
      amount: 899999,
      regular_amount: 1099999,
    },
    condition: 'new',
    free_shipping: true,
    type: 'promotion',
    discount: '18% OFF',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', backgroundColor: '#fff', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithSeller: Story = {
  args: {
    id: 'MLA1234567892',
    title: 'MacBook Pro 16" M3 Max 64GB RAM 2TB SSD',
    picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    price: {
      currency: 'ARS',
      amount: 4599999,
    },
    condition: 'new',
    free_shipping: true,
    seller: 'Apple Store Oficial',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', backgroundColor: '#fff', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const FullFeatures: Story = {
  args: {
    id: 'MLA1234567895',
    title: 'Smart TV Samsung 75" QLED 4K QN90C 2024',
    picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    price: {
      currency: 'ARS',
      amount: 2499999,
      regular_amount: 2999999,
    },
    condition: 'new',
    free_shipping: true,
    installments: '12x',
    installmentsAmount: 208333,
    installmentsRate: 0,
    seller: 'Samsung Oficial',
    type: 'promotion',
    discount: '17% OFF',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', backgroundColor: '#fff', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const LongTitle: Story = {
  args: {
    id: 'MLA1234567896',
    title:
      'Console PlayStation 5 Slim Digital Edition + 2 Controles DualSense + Headset Pulse 3D + Cartão PSN Plus 12 Meses',
    picture: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA00000000000-000000-F.webp',
    price: {
      currency: 'ARS',
      amount: 799999,
    },
    condition: 'new',
    free_shipping: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '900px', backgroundColor: '#fff', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
}
