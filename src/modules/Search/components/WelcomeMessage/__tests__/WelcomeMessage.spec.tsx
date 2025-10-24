import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { WelcomeMessage } from '../WelcomeMessage'

vi.mock('@/shared/hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}))

describe('WelcomeMessage', () => {
  const setHasSeenMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal(
      'ResizeObserver',
      vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
      }))
    )

    const icon = document.createElement('button')
    icon.setAttribute('aria-label', 'Buscar')
    document.body.appendChild(icon)
  })

  it('renders the welcome message when not seen before', () => {
    vi.mocked(useLocalStorage).mockReturnValue([false, setHasSeenMock])
    render(<WelcomeMessage />)
    act(() => {
      const icon = document.querySelector('[aria-label="Buscar"]') as HTMLElement
      const rect = icon.getBoundingClientRect
      vi.spyOn(icon, 'getBoundingClientRect').mockReturnValue({
        bottom: 10,
        left: 10,
        right: 0,
        top: 0,
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      } as DOMRect)
    })
    expect(screen.getByText('Bem-vindo!!')).toBeInTheDocument()
    expect(
      screen.getByText('Utilize a barra de busca para encontrar produtos, marcas e muito mais!')
    ).toBeInTheDocument()
  })

  it('does not render when already seen', () => {
    vi.mocked(useLocalStorage).mockReturnValue([true, setHasSeenMock])
    render(<WelcomeMessage />)
    expect(screen.queryByText('Bem-vindo!!')).not.toBeInTheDocument()
  })

  it('closes the welcome message when clicking the close button', () => {
    vi.mocked(useLocalStorage).mockReturnValue([false, setHasSeenMock])
    render(<WelcomeMessage />)
    const closeButton = screen.getByTestId('welcome-close')
    fireEvent.click(closeButton)
    expect(setHasSeenMock).toHaveBeenCalledWith(true)
  })
})
