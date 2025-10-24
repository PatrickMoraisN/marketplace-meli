import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from '../Pagination'

const pushMock = vi.fn()
const searchParamsMock = new URLSearchParams()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => searchParamsMock,
}))

vi.mock('../Pagination.module.scss', () => ({
  default: {
    pagination: 'pagination_mock',
    list: 'list_mock',
    pageButton: 'pageButton_mock',
    navButton: 'navButton_mock',
    prevButton: 'prevButton_mock',
    nextButton: 'nextButton_mock',
    disabled: 'disabled_mock',
    active: 'active_mock',
    ellipsis: 'ellipsis_mock',
    ellipsisText: 'ellipsisText_mock',
    navText: 'navText_mock',
    srOnly: 'srOnly_mock',
  },
}))

describe('Pagination', () => {
  beforeEach(() => {
    pushMock.mockClear()
    searchParamsMock.delete('page')
  })

  it('render null when totalPages <= 0', () => {
    const { container } = render(<Pagination totalPages={0} basePath="/items" />)
    expect(container.firstChild).toBeNull()
  })

  it('render correct number of pages when totalPages small', () => {
    render(<Pagination totalPages={3} basePath="/items" />)
    expect(screen.getAllByRole('button')).toHaveLength(5) // 3 pages + prev + next
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('disable previous button on first page', () => {
    render(<Pagination totalPages={5} basePath="/items" />)
    const prevButton = screen.getByLabelText('Página anterior')
    expect(prevButton).toBeDisabled()
  })

  it('disable next button on last page', () => {
    searchParamsMock.set('page', '5')
    render(<Pagination totalPages={5} basePath="/items" />)
    const nextButton = screen.getByLabelText('Próxima página')
    expect(nextButton).toBeDisabled()
  })

  it('call router.push when clicking a page button', () => {
    render(<Pagination totalPages={5} basePath="/items" />)
    const page2 = screen.getByText('2')
    fireEvent.click(page2)
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock.mock.calls[0][0]).toContain('/items?page=2')
  })

  it('call router.push when clicking next', () => {
    render(<Pagination totalPages={5} basePath="/items" />)
    const nextButton = screen.getByLabelText('Próxima página')
    fireEvent.click(nextButton)
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('/items?page=2'))
  })

  it('not call router.push when disabled', () => {
    render(<Pagination totalPages={5} basePath="/items" disabled />)
    const page2 = screen.getByText('2')
    fireEvent.click(page2)
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('render without navigation buttons when showNavigationButtons=false', () => {
    render(<Pagination totalPages={5} basePath="/items" showNavigationButtons={false} />)
    const prev = screen.queryByLabelText('Página anterior')
    const next = screen.queryByLabelText('Próxima página')
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })

  it('show ellipsis for large totalPages', () => {
    render(<Pagination totalPages={10} basePath="/items" />)
    expect(screen.getAllByText('...').length).toBeGreaterThan(0)
  })
})
