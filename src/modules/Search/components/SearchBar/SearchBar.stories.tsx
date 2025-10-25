import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Search/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'searched' },
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Buscar produtos, marcas e mais...',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Buscar produtos, marcas e mais...',
    defaultValue: 'iPhone 15',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'O que você está procurando hoje?',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}
