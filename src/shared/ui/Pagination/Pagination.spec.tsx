import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter, useSearchParams } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

describe('Pagination', () => {
  const mockPush = vi.fn()
  let mockSearchParams: URLSearchParams

  beforeEach(() => {
    vi.clearAllMocks()
    mockSearchParams = new URLSearchParams()

    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    } as any)

    vi.mocked(useSearchParams).mockReturnValue(mockSearchParams as any)
  })

  describe('Rendering', () => {
    it('should render pagination with correct number of pages', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByRole('navigation', { name: /navegação de páginas/i })).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should not render when totalPages is 0', () => {
      const { container } = render(<Pagination totalPages={0} basePath="/test" />)

      expect(container).toBeEmptyDOMElement()
    })

    it('should not render when totalPages is negative', () => {
      const { container } = render(<Pagination totalPages={-5} basePath="/test" />)

      expect(container).toBeEmptyDOMElement()
    })

    it('should render navigation buttons by default', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByLabelText(/página anterior/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/próxima página/i)).toBeInTheDocument()
    })

    it('should not render navigation buttons when showNavigationButtons is false', () => {
      render(<Pagination totalPages={5} basePath="/test" showNavigationButtons={false} />)

      expect(screen.queryByLabelText(/página anterior/i)).not.toBeInTheDocument()
      expect(screen.queryByLabelText(/próxima página/i)).not.toBeInTheDocument()
    })

    it('should highlight the current page', () => {
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      const currentPageButton = screen.getByRole('button', { name: /página 3, página atual/i })
      expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    })

    it('should show page 1 as current when no page param is provided', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      const currentPageButton = screen.getByRole('button', { name: /página 1, página atual/i })
      expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    })

    it('should render current page information for screen readers', () => {
      mockSearchParams.set('page', '2')
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByText('Página 2 de 5')).toBeInTheDocument()
    })
  })

  describe('Page Range Display', () => {
    it('should render all pages when totalPages is less than or equal to maxVisiblePages + 2', () => {
      render(<Pagination totalPages={5} basePath="/test" maxVisiblePages={3} />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should render ellipsis when there are many pages', () => {
      render(<Pagination totalPages={20} basePath="/test" maxVisiblePages={3} />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
      expect(screen.getAllByText('...').length).toBeGreaterThan(0)
    })

    it('should show pages around current page', () => {
      mockSearchParams.set('page', '10')
      render(<Pagination totalPages={20} basePath="/test" maxVisiblePages={3} />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('9')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('11')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
    })

    it('should respect maxVisiblePages prop', () => {
      mockSearchParams.set('page', '10')
      render(<Pagination totalPages={20} basePath="/test" maxVisiblePages={5} />)

      // Should show current page +/- delta
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('9')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('11')).toBeInTheDocument()
      expect(screen.getByText('12')).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should navigate to clicked page', async () => {
      const user = userEvent.setup()
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByRole('button', { name: /ir para página 3/i }))

      expect(mockPush).toHaveBeenCalledWith('/test?page=3')
    })

    it('should navigate to previous page when clicking previous button', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByLabelText(/página anterior/i))

      expect(mockPush).toHaveBeenCalledWith('/test?page=2')
    })

    it('should navigate to next page when clicking next button', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByLabelText(/próxima página/i))

      expect(mockPush).toHaveBeenCalledWith('/test?page=4')
    })

    it('should preserve existing search params when navigating', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('filter', 'active')
      mockSearchParams.set('sort', 'name')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByRole('button', { name: /ir para página 2/i }))

      expect(mockPush).toHaveBeenCalledWith('/test?filter=active&sort=name&page=2')
    })

    it('should not navigate when clicking current page', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByRole('button', { name: /página 3, página atual/i }))

      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should not navigate to page less than 1', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '1')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByLabelText(/página anterior/i))

      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should not navigate to page greater than totalPages', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '5')
      render(<Pagination totalPages={5} basePath="/test" />)

      await user.click(screen.getByLabelText(/próxima página/i))

      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('should disable all buttons when disabled prop is true', () => {
      render(<Pagination totalPages={5} basePath="/test" disabled />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        expect(button).toBeDisabled()
      })
    })

    it('should not navigate when disabled', async () => {
      const user = userEvent.setup()
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" disabled />)

      await user.click(screen.getByRole('button', { name: /ir para página 2/i }))

      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should disable previous button on first page', () => {
      mockSearchParams.set('page', '1')
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByLabelText(/página anterior/i)).toBeDisabled()
    })

    it('should disable next button on last page', () => {
      mockSearchParams.set('page', '5')
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByLabelText(/próxima página/i)).toBeDisabled()
    })

    it('should enable previous button when not on first page', () => {
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByLabelText(/página anterior/i)).toBeEnabled()
    })

    it('should enable next button when not on last page', () => {
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByLabelText(/próxima página/i)).toBeEnabled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for navigation', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Navegação de páginas')
    })

    it('should have proper ARIA labels for page buttons', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      expect(screen.getByRole('button', { name: /ir para página 2/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /ir para página 3/i })).toBeInTheDocument()
    })

    it('should mark current page with aria-current', () => {
      mockSearchParams.set('page', '3')
      render(<Pagination totalPages={5} basePath="/test" />)

      const currentPage = screen.getByRole('button', { name: /página 3, página atual/i })
      expect(currentPage).toHaveAttribute('aria-current', 'page')
    })

    it('should hide ellipsis from screen readers', () => {
      render(<Pagination totalPages={20} basePath="/test" maxVisiblePages={3} />)

      const ellipsisList = screen.getAllByText('...')[0].closest('li')
      expect(ellipsisList).toHaveAttribute('aria-hidden', 'true')
    })

    it('should hide navigation arrow symbols from screen readers', () => {
      render(<Pagination totalPages={5} basePath="/test" />)

      const prevArrow = screen.getByText('<')
      const nextArrow = screen.getByText('>')

      expect(prevArrow).toHaveAttribute('aria-hidden', 'true')
      expect(nextArrow).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Edge Cases', () => {
    it('should handle single page', () => {
      render(<Pagination totalPages={1} basePath="/test" />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByLabelText(/página anterior/i)).toBeDisabled()
      expect(screen.getByLabelText(/próxima página/i)).toBeDisabled()
    })

    it('should handle two pages', () => {
      render(<Pagination totalPages={2} basePath="/test" />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('should handle invalid page param defaulting to page 1', () => {
      mockSearchParams.set('page', 'invalid')
      render(<Pagination totalPages={5} basePath="/test" />)

      const currentPageButton = screen.getByRole('button', { name: /página 1, página atual/i })
      expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    })

    it('should handle very large page numbers', () => {
      render(<Pagination totalPages={1000} basePath="/test" maxVisiblePages={3} />)

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('1000')).toBeInTheDocument()
    })

    it('should handle basePath with trailing slash', async () => {
      const user = userEvent.setup()
      render(<Pagination totalPages={5} basePath="/test/" />)

      await user.click(screen.getByRole('button', { name: /ir para página 2/i }))

      expect(mockPush).toHaveBeenCalledWith('/test/?page=2')
    })
  })
})
