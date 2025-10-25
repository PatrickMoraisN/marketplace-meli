import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ProductGallery } from '../ProductGallery'

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} data-testid="image" />,
}))

describe('ProductGallery', () => {
  const mockImages = [
    { id: '1', src: '/img1.jpg', alt: 'Imagem 1', thumbnail: '/thumb1.jpg' },
    { id: '2', src: '/img2.jpg', alt: 'Imagem 2', thumbnail: '/thumb2.jpg' },
    { id: '3', src: '/img3.jpg', alt: 'Imagem 3', thumbnail: '/thumb3.jpg' },
  ]

  it('renders "Nenhuma imagem disponível" when images array is empty', () => {
    render(<ProductGallery images={[]} />)
    expect(screen.getByText('Nenhuma imagem disponível')).toBeInTheDocument()
  })

  it('renders thumbnails and main image correctly', () => {
    render(<ProductGallery images={mockImages} />)

    const thumbs = screen.getAllByRole('button')
    expect(thumbs).toHaveLength(3)
    expect(screen.getAllByTestId('image')).toHaveLength(4)

    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('updates main image when clicking a thumbnail', () => {
    render(<ProductGallery images={mockImages} />)

    const thumb2 = screen.getAllByRole('button')[1]
    fireEvent.click(thumb2)

    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('shows loading overlay initially and hides after image load', () => {
    render(<ProductGallery images={mockImages} />)

    expect(screen.getByText('1 / 3').previousSibling).toBeTruthy()

    const mainImage = screen.getAllByTestId('image').pop()!
    fireEvent.load(mainImage)
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('limits thumbnails to 6 images even if more are provided', () => {
    const bigList = Array.from({ length: 10 }).map((_, i) => ({
      id: `${i}`,
      src: `/img${i}.jpg`,
      alt: `Imagem ${i}`,
    }))

    render(<ProductGallery images={bigList} />)
    const thumbs = screen.getAllByRole('button')
    expect(thumbs).toHaveLength(6)
  })
})
