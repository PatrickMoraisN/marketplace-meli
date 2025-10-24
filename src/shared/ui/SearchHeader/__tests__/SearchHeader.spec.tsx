import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchHeader } from '../SearchHeader'

const pushMock = vi.fn()
const mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => mockSearchParams,
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} alt={props.alt || 'image'} />,
}))

const onSearchMock = vi.fn()
vi.mock('@/modules/Search/components/SearchBar/SearchBar', () => ({
  SearchBar: ({ onSearch, defaultValue }: any) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        defaultValue={defaultValue}
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <button onClick={() => onSearch?.('iphone 14')} data-testid="search-button">
        Buscar
      </button>
    </div>
  ),
}))

vi.mock('@/modules/Search/utils/normalizeSearchQuery', () => ({
  normalizeSearchQuery: (v: string) => v.trim().toLowerCase().replace(/\s+/g, '+'),
}))

vi.mock('../SearchHeader.module.scss', () => ({
  default: {
    searchHeader: 'searchHeader_mock',
    container: 'container_mock',
    logoWrapper: 'logoWrapper_mock',
    searchWrapper: 'searchWrapper_mock',
  },
}))

describe('<SearchHeader />', () => {
  beforeEach(() => {
    pushMock.mockClear()
    onSearchMock.mockClear()
    mockSearchParams.delete('search')
  })

  it('render logo with correct link and alt text', () => {
    render(<SearchHeader />)
    const logo = screen.getByAltText('Mercado Livre Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/meli-logo.png')
    const link = screen.getByRole('link', { name: /Ir para a página inicial/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('render SearchBar with empty defaultValue when no search param', () => {
    render(<SearchHeader />)
    const input = screen.getByTestId('search-input')
    expect(input).toHaveValue('')
  })

  it('render SearchBar with defaultValue from search param', () => {
    mockSearchParams.set('search', 'iphone+14')
    render(<SearchHeader />)
    const input = screen.getByTestId('search-input')
    expect(input).toHaveValue('iphone+14')
  })

  it('call router.push with normalized query when searching', () => {
    render(<SearchHeader />)
    const button = screen.getByTestId('search-button')
    fireEvent.click(button)
    expect(pushMock).toHaveBeenCalledWith('/items?search=iphone+14')
  })

  it('not call router.push when normalized query is empty', () => {
    render(<SearchHeader />)
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: ' ' } })
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('apply correct structure and wrapper classes', () => {
    const { container } = render(<SearchHeader />)
    expect(container.firstChild).toHaveClass('searchHeader_mock')
    expect(container.querySelector(`.${'container_mock'}`)).toBeInTheDocument()
  })
})
