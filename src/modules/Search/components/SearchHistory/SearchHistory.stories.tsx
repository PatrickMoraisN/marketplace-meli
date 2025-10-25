import type { Meta, StoryObj } from '@storybook/react'
import { SearchHistory } from './SearchHistory'

const meta = {
  title: 'Search/SearchHistory',
  component: SearchHistory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: { action: 'selected' },
  },
} satisfies Meta<typeof SearchHistory>

export default meta
type Story = StoryObj<typeof meta>

const mockHistory = [
  { term: 'iPhone 15', timestamp: Date.now() - 1000 * 60 * 5 }, // 5 min ago
  { term: 'MacBook Pro', timestamp: Date.now() - 1000 * 60 * 60 }, // 1 hour ago
  { term: 'AirPods Pro', timestamp: Date.now() - 1000 * 60 * 60 * 24 }, // 1 day ago
]

export const Default: Story = {
  args: {
    history: mockHistory,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export const SingleItem: Story = {
  args: {
    history: [{ term: 'Nintendo Switch', timestamp: Date.now() - 1000 * 60 * 2 }],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}

export const LongTerms: Story = {
  args: {
    history: [
      {
        term: 'Smart TV 55 polegadas 4K HDR com controle por voz e Wi-Fi integrado',
        timestamp: Date.now() - 1000 * 60 * 10,
      },
      {
        term: 'Notebook Dell Inspiron 15 Intel Core i7 16GB RAM',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
}
