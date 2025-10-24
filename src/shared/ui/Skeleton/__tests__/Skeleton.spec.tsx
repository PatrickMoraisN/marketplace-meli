import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Skeleton } from '../Skeleton'

vi.mock('../Skeleton.module.scss', () => ({
  default: { skeleton: 'skeleton_mock_class' },
}))

describe('<Skeleton />', () => {
  const getSkeleton = () => document.querySelector('.skeleton_mock_class') as HTMLDivElement

  it('render a div with default styles', () => {
    render(<Skeleton />)
    const element = getSkeleton()
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('skeleton_mock_class')
    expect(element.style.borderRadius).toBe('6px')
  })

  it('apply custom width and height (number)', () => {
    render(<Skeleton width={100} height={50} />)
    const element = getSkeleton()
    expect(element.style.width).toBe('100px')
    expect(element.style.height).toBe('50px')
  })

  it('apply custom width and height (string)', () => {
    render(<Skeleton width="80%" height="2rem" />)
    const element = getSkeleton()
    expect(element.style.width).toBe('80%')
    expect(element.style.height).toBe('2rem')
  })

  it('accept custom className merged with default', () => {
    render(<Skeleton className="custom-class" />)
    const element = getSkeleton()
    expect(element).toHaveClass('skeleton_mock_class')
    expect(element).toHaveClass('custom-class')
  })

  it('use numeric radius and convert to px', () => {
    render(<Skeleton radius={12} />)
    const element = getSkeleton()
    expect(element.style.borderRadius).toBe('12px')
  })

  it('accept string radius directly', () => {
    render(<Skeleton radius="50%" />)
    const element = getSkeleton()
    expect(element.style.borderRadius).toBe('50%')
  })
})
