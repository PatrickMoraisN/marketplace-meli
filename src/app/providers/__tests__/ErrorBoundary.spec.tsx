import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// 🔹 Mock do env.ts (antes de importar os componentes que o usam)
vi.mock('@/shared/config/env', () => ({
  env: {
    NODE_ENV: 'development',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  },
}))

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

  it('uses custom fallback when passed by props', () => {
    const CustomFallback = <div>Custom Fallback!</div>

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <Boom />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom Fallback!')).toBeInTheDocument()
  })

  it('shows error message on development mode', async () => {
    // 🔹 Atualiza mock dinamicamente para development
    vi.doMock('@/shared/config/env', () => ({
      env: {
        NODE_ENV: 'development',
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      },
    }))

    const { ErrorBoundary: DevErrorBoundary } = await import('../ErrorBoundary')

    render(
      <DevErrorBoundary>
        <Boom />
      </DevErrorBoundary>
    )

    expect(screen.getByText('Boom!')).toBeInTheDocument()
  })
})

describe('DefaultFallback', () => {
  it('renders error message correctly', () => {
    render(<DefaultFallback error={new Error('Error test')} />)

    expect(screen.getByText(defaultFallbackTexts.title)).toBeInTheDocument()
    expect(screen.getByText(defaultFallbackTexts.description)).toBeInTheDocument()
  })

  it('shows error message on development mode', async () => {
    vi.doMock('@/shared/config/env', () => ({
      env: {
        NODE_ENV: 'development',
        NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
      },
    }))

    const { DefaultFallback: DevFallback } = await import('../ErrorBoundary')

    render(<DevFallback error={new Error('Development mode')} />)

    expect(screen.getByText('Development mode')).toBeInTheDocument()
  })
})
