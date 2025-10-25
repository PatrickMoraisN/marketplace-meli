import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Pagination } from './Pagination'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/items',
        query: { page: '1', search: 'iphone' },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
    },
    maxVisiblePages: {
      control: { type: 'number', min: 1, max: 10 },
    },
    showNavigationButtons: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalPages: 10,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const FewPages: Story = {
  args: {
    totalPages: 3,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const ManyPages: Story = {
  args: {
    totalPages: 50,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const SinglePage: Story = {
  args: {
    totalPages: 1,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithoutNavigationButtons: Story = {
  args: {
    totalPages: 10,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: false,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    totalPages: 10,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const MoreVisiblePages: Story = {
  args: {
    totalPages: 20,
    basePath: '/items',
    maxVisiblePages: 7,
    showNavigationButtons: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}

export const Mobile: Story = {
  args: {
    totalPages: 10,
    basePath: '/items',
    maxVisiblePages: 3,
    showNavigationButtons: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', backgroundColor: '#fff' }}>
        <Story />
      </div>
    ),
  ],
}
