import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/items/MLA123',
        query: { search: 'iphone' },
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Eletrônicos' },
      { label: 'Celulares e Telefones' },
      { label: 'Celulares e Smartphones' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}

export const SingleCategory: Story = {
  args: {
    items: [{ label: 'Eletrônicos' }],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}

export const Empty: Story = {
  args: {
    items: [],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}

export const DeepHierarchy: Story = {
  args: {
    items: [
      { label: 'Eletrônicos' },
      { label: 'Audio' },
      { label: 'Fones de Ouvido' },
      { label: 'Fones Bluetooth' },
      { label: 'In-ear' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Eletrônicos, Áudio e Vídeo' },
      { label: 'Celulares e Telefones Fixos e Acessórios' },
      { label: 'Celulares e Smartphones de Alta Performance' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}

export const Mobile: Story = {
  args: {
    items: [
      { label: 'Eletrônicos' },
      { label: 'Celulares e Telefones' },
      { label: 'Celulares e Smartphones' },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ebebeb', padding: '1rem 0' }}>
        <Story />
      </div>
    ),
  ],
}
