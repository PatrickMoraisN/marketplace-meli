'use client'

import { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { ReactQueryProvider } from './ReactQueryProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ErrorBoundary>
  )
}
