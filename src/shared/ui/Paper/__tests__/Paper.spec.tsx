import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Paper } from '../Paper'

vi.mock('../Paper.module.scss', () => ({
  default: { paper: 'paper_mock_class' },
}))

describe('Paper', () => {
  it('render children correctly', () => {
    render(<Paper>Conteúdo de teste</Paper>)
    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument()
  })

  it('apply default paper class', () => {
    render(<Paper>Teste</Paper>)
    const element = screen.getByText('Teste')
    expect(element).toHaveClass('paper_mock_class')
  })

  it('merge custom className with default', () => {
    render(<Paper className="custom-class">Custom</Paper>)
    const element = screen.getByText('Custom')
    expect(element).toHaveClass('paper_mock_class')
    expect(element).toHaveClass('custom-class')
  })

  it('render with a custom HTML tag', () => {
    render(<Paper as="section">Seção</Paper>)
    const element = screen.getByText('Seção')
    expect(element.tagName.toLowerCase()).toBe('section')
  })

  it('render as default div when `as` prop is not provided', () => {
    render(<Paper>Default tag</Paper>)
    const element = screen.getByText('Default tag')
    expect(element.tagName.toLowerCase()).toBe('div')
  })
})
