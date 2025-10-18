import { render, screen } from '@testing-library/react'
import HomePage from './page'

describe('HomePage', () => {
  it('renders without crashing', () => {
    const homePage = <HomePage />
    expect(homePage).toBeDefined()
  })

  it('shows "bem vindo" text', () => {
    render(<HomePage />)
    expect(screen.getByText(/bem vindo/i)).toBeInTheDocument()
  })
})
