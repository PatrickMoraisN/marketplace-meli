import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { TextInput } from '../TextInput'

vi.mock('../TextInput.module.scss', () => ({
  default: {
    wrapper: 'wrapper_mock',
    label: 'label_mock',
    input: 'input_mock',
    'input--default': 'input--default_mock',
    'input--search': 'input--search_mock',
  },
}))

describe('TextInput', () => {
  it('render correctly with default props', () => {
    render(<TextInput id="test-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input_mock')
    expect(input).toHaveClass('input--default_mock')
  })

  it('render a label when provided', () => {
    render(<TextInput id="email" label="E-mail" />)
    const label = screen.getByText('E-mail')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('label_mock')
    expect(label).toHaveAttribute('for', 'email')
  })

  it('not render label when none provided', () => {
    render(<TextInput id="no-label" />)
    const label = screen.queryByText(/.+/)
    expect(label).toBeNull()
  })

  it('render with variant="search" applying correct modifier class', () => {
    render(<TextInput id="search" variant="search" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input--search_mock')
  })

  it('pass placeholder and type props correctly', () => {
    render(<TextInput id="name" placeholder="Digite seu nome" type="text" />)
    const input = screen.getByPlaceholderText('Digite seu nome')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('forward ref correctly to input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<TextInput ref={ref} id="my-input" />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
    expect(ref.current?.id).toBe('my-input')
  })

  it('merge custom className with wrapper class', () => {
    const { container } = render(<TextInput id="custom" className="extra-class" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('wrapper_mock')
    expect(wrapper).toHaveClass('extra-class')
  })

  it('spread extra props into input element', () => {
    render(<TextInput id="username" data-testid="custom-input" aria-label="Username" />)
    const input = screen.getByTestId('custom-input')
    expect(input).toHaveAttribute('aria-label', 'Username')
  })
})
