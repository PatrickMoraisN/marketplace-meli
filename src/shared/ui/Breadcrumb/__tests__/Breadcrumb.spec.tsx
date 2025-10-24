import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Breadcrumb } from '../Breadcrumb'

vi.mock('../Breadcrumb.module.scss', () => ({
  default: {
    breadcrumb: 'breadcrumb_mock',
    inner: 'inner_mock',
    backLink: 'backLink_mock',
    divider: 'divider_mock',
    list: 'list_mock',
    item: 'item_mock',
    current: 'current_mock',
    link: 'link_mock',
    separator: 'separator_mock',
  },
}))

const mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}))

describe('Breadcrumb', () => {
  beforeEach(() => {
    mockSearchParams.delete('search')
  })

  it('render "Voltar para lista" link with default /items URL when no search param', () => {
    render(<Breadcrumb items={[]} />)
    const backLink = screen.getByText('Voltar para lista')
    expect(backLink).toHaveAttribute('href', '/items')
    expect(backLink).toHaveClass('backLink_mock')
  })

  it('render "Voltar para lista" link with search param when present', () => {
    mockSearchParams.set('search', 'iphone 14')
    render(<Breadcrumb items={[]} />)
    const backLink = screen.getByText('Voltar para lista')
    expect(backLink).toHaveAttribute('href', '/items?search=iphone%2014')
  })

  it('render divider "|" when there are items', () => {
    render(<Breadcrumb items={[{ label: 'Celulares' }]} />)
    const divider = screen.getByText('|')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('divider_mock')
  })

  it('render breadcrumb items correctly', () => {
    const items = [{ label: 'Celulares' }, { label: 'iPhone' }]
    render(<Breadcrumb items={items} />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
    expect(screen.getByText('Celulares')).toBeInTheDocument()
    expect(screen.getByText('iPhone')).toBeInTheDocument()
  })

  it('mark last breadcrumb item as current page', () => {
    const items = [{ label: 'Celulares' }, { label: 'iPhone' }]
    render(<Breadcrumb items={items} />)
    const last = screen.getByText('iPhone')
    expect(last).toHaveAttribute('aria-current', 'page')
    expect(last).toHaveClass('current_mock')
  })

  it('render separators (›) between breadcrumb items', () => {
    const items = [{ label: 'Celulares' }, { label: 'iPhone' }]
    render(<Breadcrumb items={items} />)
    const separators = screen.getAllByText('›')
    expect(separators).toHaveLength(1)
  })

  it('merge custom className with base breadcrumb class', () => {
    render(<Breadcrumb items={[]} className="extra-class" />)
    const nav = screen.getByRole('navigation', { name: /Navegação de categorias/i })
    expect(nav).toHaveClass('breadcrumb_mock')
    expect(nav).toHaveClass('extra-class')
  })
})
