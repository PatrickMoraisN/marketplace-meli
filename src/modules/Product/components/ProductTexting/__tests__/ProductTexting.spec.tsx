import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductTexting } from '../ProductTexting'

vi.mock('../ProductTexting.module.scss', () => ({
  default: {
    base: 'base',
    title: 'title',
    price: 'price',
    oldPrice: 'oldPrice',
    discount: 'discount',
    installments: 'installments',
    shipping: 'shipping',
    seller: 'seller',
    condition: 'condition',
  },
}))

describe('ProductTexting', () => {
  const text = 'Conteúdo de teste'

  it('renders Title correctly with default tag and aria-label', () => {
    render(<ProductTexting.Title>{text}</ProductTexting.Title>)

    const el = screen.getByLabelText('Título do produto')
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent(text)
    expect(el.tagName).toBe('H2')
    expect(el.className).toContain('title')
    expect(el.className).toContain('base')
  })

  it('renders Price correctly', () => {
    render(<ProductTexting.Price>{text}</ProductTexting.Price>)
    const el = screen.getByLabelText('Preço do produto')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('price')
  })

  it('renders OldPrice correctly', () => {
    render(<ProductTexting.OldPrice>{text}</ProductTexting.OldPrice>)
    const el = screen.getByLabelText('Preço anterior')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('oldPrice')
  })

  it('renders Discount correctly', () => {
    render(<ProductTexting.Discount>{text}</ProductTexting.Discount>)
    const el = screen.getByLabelText('Desconto aplicado')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('discount')
  })

  it('renders Installments correctly', () => {
    render(<ProductTexting.Installments>{text}</ProductTexting.Installments>)
    const el = screen.getByLabelText('Informações de parcelamento')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('installments')
  })

  it('renders Shipping correctly', () => {
    render(<ProductTexting.Shipping>{text}</ProductTexting.Shipping>)
    const el = screen.getByLabelText('Informações de envio')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('shipping')
  })

  it('renders Seller correctly', () => {
    render(<ProductTexting.Seller>{text}</ProductTexting.Seller>)
    const el = screen.getByLabelText('Vendedor')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('seller')
  })

  it('renders Condition correctly', () => {
    render(<ProductTexting.Condition>{text}</ProductTexting.Condition>)
    const el = screen.getByLabelText('Condição do produto')
    expect(el).toHaveTextContent(text)
    expect(el.className).toContain('condition')
  })

  it('respects the `as` prop when passed manually', () => {
    render(
      <ProductTexting.Discount as="strong" aria-label="Custom tag">
        Negrito
      </ProductTexting.Discount>
    )
    const el = screen.getByLabelText('Custom tag')
    expect(el.tagName).toBe('STRONG')
    expect(el).toHaveTextContent('Negrito')
  })
})
