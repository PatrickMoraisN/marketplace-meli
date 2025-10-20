'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error | null
}

export const DefaultFallback = ({ error }: { error: Error | null }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Ocorreu um erro inesperado 😢</h2>
      <p>Tente recarregar a página.</p>
      {process.env.NODE_ENV === 'development' && (
        <pre style={{ color: 'red', marginTop: '1rem' }}>{error?.message}</pre>
      )}
    </div>
  )
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error })
    console.error('[Global ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultFallback error={this.state.error || null} />
    }
    return this.props.children
  }
}
