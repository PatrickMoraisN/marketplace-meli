import { timeAgo } from '@/shared/utils/date'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchHistory } from '../SearchHistory'

vi.mock('@/shared/utils/date', () => ({
  timeAgo: vi.fn(),
}))

describe('SearchHistory', () => {
  const onSelectMock = vi.fn()
  const mockHistory = [
    { term: 'iphone', timestamp: 1000 },
    { term: 'macbook', timestamp: 2000 },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(timeAgo).mockImplementation((t) => `há ${t} dias`)
  })

  it('renders all history items', () => {
    render(<SearchHistory history={mockHistory} onSelect={onSelectMock} />)
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByText('iphone')).toBeInTheDocument()
    expect(screen.getByText('macbook')).toBeInTheDocument()
  })

  it('displays relative time using timeAgo', () => {
    render(<SearchHistory history={mockHistory} onSelect={onSelectMock} />)
    expect(timeAgo).toHaveBeenCalledWith(1000)
    expect(timeAgo).toHaveBeenCalledWith(2000)
    expect(screen.getByText('há 1000 dias')).toBeInTheDocument()
    expect(screen.getByText('há 2000 dias')).toBeInTheDocument()
  })

  it('calls onSelect when a history item is clicked', () => {
    render(<SearchHistory history={mockHistory} onSelect={onSelectMock} />)
    const firstButton = screen.getAllByRole('button', {
      name: 'Selecionar termo de pesquisa do histórico',
    })[0]
    fireEvent.mouseDown(firstButton)
    expect(onSelectMock).toHaveBeenCalledWith('iphone')
  })

  it('renders an image icon and term text inside each button', () => {
    render(<SearchHistory history={mockHistory} onSelect={onSelectMock} />)
    const icons = screen.getAllByAltText('ícone de pesquisa')
    expect(icons).toHaveLength(2)
    expect(screen.getByText('iphone')).toBeInTheDocument()
  })
})
