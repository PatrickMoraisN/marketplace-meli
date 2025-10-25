import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProductListItem } from '../ProductListItem'

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue('iphone'),
  }),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === 'string' ? href : href.pathname} {...props}>
      {children}
    </a>
  ),
}))

describe('ProductListItem', () => {
  const defaultProps = {
    id: '123',
    title: 'iPhone 15 Pro Max',
    picture: '/iphone.jpg',
    price: { currency: 'USD', amount: 1299 },
    condition: 'new',
    free_shipping: false,
  }

  it('renders title, image and condition correctly', () => {
    render(<ProductListItem {...defaultProps} />)

    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
    expect(screen.getByAltText('iPhone 15 Pro Max')).toBeInTheDocument()
    expect(screen.getByText('Novo')).toBeInTheDocument()
  })

  it('renders link with correct href and query param', () => {
    render(<ProductListItem {...defaultProps} />)
    const link = screen.getByRole('link', { name: /Ver detalhes do produto/ })
    expect(link).toHaveAttribute('href', expect.stringContaining('/items/123'))
  })

  it('renders seller when provided', () => {
    render(<ProductListItem {...defaultProps} seller="Apple Store" />)
    expect(screen.getByText(/Por Apple Store/)).toBeInTheDocument()
  })

  it('renders free shipping text when free_shipping is true', () => {
    render(<ProductListItem {...defaultProps} free_shipping />)
    expect(screen.getByText(/Envio grátis/)).toBeInTheDocument()
  })

  it('renders discount and old price for promotion type', () => {
    render(
      <ProductListItem
        {...defaultProps}
        price={{ currency: 'USD', amount: 999, regular_amount: 1299 }}
        type="promotion"
        discount="20% OFF"
      />
    )

    expect(screen.getByText('$1.299')).toBeInTheDocument()
    expect(screen.getByText('$999')).toBeInTheDocument()
    expect(screen.getByText('20% OFF')).toBeInTheDocument()
  })

  it('renders installments info when available', () => {
    render(
      <ProductListItem
        {...defaultProps}
        installments="12x"
        installmentsAmount={108}
        installmentsRate={0}
      />
    )

    expect(screen.getByText(/12x/)).toBeInTheDocument()
    expect(screen.getByText(/sem juros/)).toBeInTheDocument()
  })

  it('does not render installments when rate is not zero', () => {
    render(
      <ProductListItem
        {...defaultProps}
        installments="10x"
        installmentsAmount={150}
        installmentsRate={5}
      />
    )

    expect(screen.queryByText(/10x/)).not.toBeInTheDocument()
  })

  it('renders reacondicionado condition for used products', () => {
    render(<ProductListItem {...defaultProps} condition="used" />)
    expect(screen.getByText('Reacondicionado')).toBeInTheDocument()
  })
})
