import { useSearchHistory } from '@/modules/Search/hooks/useSearchHistory'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchBar } from '../SearchBar'

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}))

vi.mock('@/modules/Search/hooks/useSearchHistory', () => ({
  useSearchHistory: vi.fn(),
}))

vi.mock('../SearchHistory/SearchHistory', () => ({
  SearchHistory: ({ history, onSelect }: any) => (
    <div role="list">
      {history.map((item: any, i: number) => (
        <button role="listitem" key={i} onClick={() => onSelect(item.term)}>
          {item.term}
        </button>
      ))}
    </div>
  ),
}))

vi.mock('../WelcomeMessage/WelcomeMessage', () => ({
  WelcomeMessage: () => null,
}))

describe('SearchBar', () => {
  const addSearchMock = vi.fn()
  const onSearchMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSearchHistory).mockReturnValue({
      history: [
        { term: 'iphone', timestamp: 1 },
        { term: 'macbook', timestamp: 2 },
      ],
      addSearch: addSearchMock,
    } as any)
  })

  it('renders correctly', () => {
    render(<SearchBar />)
    expect(screen.getByLabelText('Buscar produtos')).toBeInTheDocument()
  })

  it('shows search history on focus', async () => {
    render(<SearchBar />)
    const welcomeCloseBtn = screen.queryByTestId('welcome-close')
    expect(welcomeCloseBtn).toBeInTheDocument()
    fireEvent.click(welcomeCloseBtn!)
    const input = screen.getByLabelText('Buscar produtos')
    fireEvent.focus(input)
    expect(screen.getByText('iphone')).toBeInTheDocument()
    expect(screen.getByText('macbook')).toBeInTheDocument()
  })

  it('hides search history on blur', async () => {
    render(<SearchBar />)
    const input = screen.getByLabelText('Buscar produtos')
    fireEvent.focus(input)
    fireEvent.blur(input)
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })
  })

  it('calls addSearch and onSearch when submitting with button', () => {
    render(<SearchBar onSearch={onSearchMock} />)
    const input = screen.getByLabelText('Buscar produtos')
    const button = screen.getByRole('button', { name: 'Buscar' })
    fireEvent.change(input, { target: { value: 'notebook' } })
    fireEvent.click(button)
    expect(addSearchMock).toHaveBeenCalledWith('notebook')
    expect(onSearchMock).toHaveBeenCalledWith('notebook')
  })

  it('calls addSearch and onSearch when pressing Enter', () => {
    render(<SearchBar onSearch={onSearchMock} />)
    const input = screen.getByLabelText('Buscar produtos')
    fireEvent.change(input, { target: { value: 'ipad' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(addSearchMock).toHaveBeenCalledWith('ipad')
    expect(onSearchMock).toHaveBeenCalledWith('ipad')
  })

  it('does not search if value is empty', () => {
    render(<SearchBar onSearch={onSearchMock} />)
    const button = screen.getByRole('button', { name: 'Buscar' })
    fireEvent.click(button)
    expect(addSearchMock).not.toHaveBeenCalled()
    expect(onSearchMock).not.toHaveBeenCalled()
  })
})
