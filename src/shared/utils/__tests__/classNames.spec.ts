import { describe, expect, it } from 'vitest'
import { cn } from '../classNames'

describe('cn utility', () => {
  it('joins multiple class names correctly', () => {
    const result = cn('btn', 'btn-primary', 'active')
    expect(result).toBe('btn btn-primary active')
  })

  it('filters out falsy values (null, undefined, false, empty string)', () => {
    const result = cn('card', null, undefined, false, '', 'shadow')
    expect(result).toBe('card shadow')
  })

  it('merges conditional and object-based classnames', () => {
    const result = cn('input', { focused: true, disabled: false })
    expect(result).toBe('input focused')
  })

  it('returns an empty string when no valid input is provided', () => {
    const result = cn()
    expect(result).toBe('')
  })
})
