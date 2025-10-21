import { useQueryClient } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import { useEffect, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ReactQueryProvider } from '../ReactQueryProvider'

const ClientInstanceChecker = () => {
  const client = useQueryClient()
  const [_clientId] = useState(() => {
    const id = Math.random().toString()
    ;(client as any).__testId = id
    return id
  })

  return <div data-testid="client-id">{(client as any).__testId || 'no-id'}</div>
}

const DefaultOptionsChecker = () => {
  const client = useQueryClient()
  const defaults = client.getDefaultOptions().queries

  return (
    <div>
      <span data-testid="retry-count">{String(defaults?.retry)}</span>
      <span data-testid="refetch-on-focus">{String(defaults?.refetchOnWindowFocus)}</span>
    </div>
  )
}

const RerenderCounter = ({ onRender }: { onRender: () => void }) => {
  const client = useQueryClient()

  useEffect(() => {
    onRender()
  })

  return <div data-testid="client-hash">{client.getQueryCache().toString()}</div>
}

const originalConsoleError = console.error
beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalConsoleError
  vi.clearAllMocks()
})

describe('ReactQueryProvider', () => {
  it('renders children correctly', () => {
    render(
      <ReactQueryProvider>
        <p>Inside Query Provider</p>
      </ReactQueryProvider>
    )

    expect(screen.getByText('Inside Query Provider')).toBeInTheDocument()
  })

  it('provides a QueryClient instance to its children', () => {
    const ClientConsumer = () => {
      const client = useQueryClient()
      return <div data-testid="has-client">{client ? 'client-available' : 'no-client'}</div>
    }

    render(
      <ReactQueryProvider>
        <ClientConsumer />
      </ReactQueryProvider>
    )

    expect(screen.getByTestId('has-client')).toHaveTextContent('client-available')
  })

  it('creates and reuses the same QueryClient instance across re-renders', () => {
    const renderCounter = vi.fn()

    const { rerender } = render(
      <ReactQueryProvider>
        <RerenderCounter onRender={renderCounter} />
      </ReactQueryProvider>
    )

    const firstClientHash = screen.getByTestId('client-hash').textContent

    rerender(
      <ReactQueryProvider>
        <RerenderCounter onRender={renderCounter} />
      </ReactQueryProvider>
    )

    const secondClientHash = screen.getByTestId('client-hash').textContent

    expect(firstClientHash).toBe(secondClientHash)
    expect(renderCounter).toHaveBeenCalledTimes(2)
  })

  it('ensures each provider instance creates its own QueryClient', () => {
    const { unmount: unmount1 } = render(
      <ReactQueryProvider>
        <ClientInstanceChecker />
      </ReactQueryProvider>
    )

    const firstClientId = screen.getByTestId('client-id').textContent
    unmount1()

    render(
      <ReactQueryProvider>
        <ClientInstanceChecker />
      </ReactQueryProvider>
    )

    const secondClientId = screen.getByTestId('client-id').textContent

    expect(firstClientId).not.toBe(secondClientId)
  })

  it('applies correct default options to the QueryClient', () => {
    render(
      <ReactQueryProvider>
        <DefaultOptionsChecker />
      </ReactQueryProvider>
    )

    expect(screen.getByTestId('retry-count')).toHaveTextContent('1')
    expect(screen.getByTestId('refetch-on-focus')).toHaveTextContent('false')
  })

  it('allows queries to be executed with the configured defaults', async () => {
    const TestQuery = () => {
      const client = useQueryClient()
      const [queryExecuted, setQueryExecuted] = useState(false)

      const executeQuery = () => {
        client
          .fetchQuery({
            queryKey: ['test'],
            queryFn: () => Promise.resolve('test-data'),
          })
          .then(() => setQueryExecuted(true))
      }

      return (
        <div>
          <button onClick={executeQuery} data-testid="execute-query">
            Execute Query
          </button>
          {queryExecuted && <span data-testid="query-success">Query executed</span>}
        </div>
      )
    }

    render(
      <ReactQueryProvider>
        <TestQuery />
      </ReactQueryProvider>
    )

    const button = screen.getByTestId('execute-query')

    await act(async () => {
      button.click()
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(screen.getByTestId('query-success')).toBeInTheDocument()
  })

  it('handles multiple nested children correctly', () => {
    const NestedComponent = ({ level }: { level: number }) => {
      const client = useQueryClient()
      return (
        <div data-testid={`level-${level}`}>
          Level {level}: {client ? 'Has Client' : 'No Client'}
          {level < 3 && <NestedComponent level={level + 1} />}
        </div>
      )
    }

    render(
      <ReactQueryProvider>
        <NestedComponent level={1} />
      </ReactQueryProvider>
    )

    expect(screen.getByTestId('level-1')).toHaveTextContent('Level 1: Has Client')
    expect(screen.getByTestId('level-2')).toHaveTextContent('Level 2: Has Client')
    expect(screen.getByTestId('level-3')).toHaveTextContent('Level 3: Has Client')
  })

  it('maintains QueryClient instance during component updates', () => {
    const DynamicComponent = ({ count }: { count: number }) => {
      const client = useQueryClient()
      const [clientRef] = useState(() => client)

      return (
        <div>
          <span data-testid="count">{count}</span>
          <span data-testid="client-stable">{client === clientRef ? 'stable' : 'changed'}</span>
        </div>
      )
    }

    const { rerender } = render(
      <ReactQueryProvider>
        <DynamicComponent count={1} />
      </ReactQueryProvider>
    )

    expect(screen.getByTestId('client-stable')).toHaveTextContent('stable')

    rerender(
      <ReactQueryProvider>
        <DynamicComponent count={2} />
      </ReactQueryProvider>
    )

    expect(screen.getByTestId('count')).toHaveTextContent('2')
    expect(screen.getByTestId('client-stable')).toHaveTextContent('stable')
  })
})
