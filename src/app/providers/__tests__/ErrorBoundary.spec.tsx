import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DefaultFallback, ErrorBoundary } from '../ErrorBoundary'

const Boom = () => {
  throw new Error('Boom!')
}

const defaultFallbackTexts = {
  title: 'Ocorreu um erro inesperado 😢',
  description: 'Tente recarregar a página.',
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without errors', () => {
    render(
      <ErrorBoundary>
        <p>Page without errors</p>
      </ErrorBoundary>
    )

    expect(screen.getByText('Page without errors')).toBeInTheDocument()
  })

  it('renders default fallback on error', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )

    expect(screen.getByText(defaultFallbackTexts.title)).toBeInTheDocument()
    expect(screen.getByText(defaultFallbackTexts.description)).toBeInTheDocument()
  })

  it('uses custom fallback when it passed by props', () => {
    const CustomFallback = <div>Custom Fallback!</div>

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <Boom />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom Fallback!')).toBeInTheDocument()
  })

  it('shows error message on development mode', () => {
    const originalEnv = process.env.NODE_ENV
    vi.stubEnv('NODE_ENV', 'development')

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )

    vi.stubEnv('NODE_ENV', originalEnv)

    expect(screen.getByText('Boom!')).toBeInTheDocument()
  })
})

describe('DefaultFallback', () => {
  it('renders error message correctly', () => {
    render(<DefaultFallback error={new Error('Error test')} />)

    expect(screen.getByText(defaultFallbackTexts.title)).toBeInTheDocument()
    expect(screen.getByText(defaultFallbackTexts.description)).toBeInTheDocument()
  })

  it('shows error message on development mode', () => {
    const originalEnv = process.env.NODE_ENV
    vi.stubEnv('NODE_ENV', 'development')

    render(<DefaultFallback error={new Error('Development mode')} />)

    expect(screen.getByText('Development mode')).toBeInTheDocument()

    vi.stubEnv('NODE_ENV', originalEnv)
  })
})
