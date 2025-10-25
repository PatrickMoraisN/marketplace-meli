import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { TextInput } from './TextInput'

const meta = {
  title: 'UI/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Digite seu nome',
    variant: 'default',
    id: 'name-input',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const SearchVariant: Story = {
  args: {
    placeholder: 'Buscar produtos, marcas e mais...',
    variant: 'search',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Disabled: Story = {
  args: {
    placeholder: 'Campo desabilitado',
    variant: 'default',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Digite seu email',
    variant: 'default',
    defaultValue: 'usuario@exemplo.com',
    id: 'email-input',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Required: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    variant: 'default',
    type: 'password',
    required: true,
    id: 'password-input',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}
