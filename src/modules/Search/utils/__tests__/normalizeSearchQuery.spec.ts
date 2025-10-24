import { describe, expect, it } from 'vitest'
import { normalizeSearchQuery } from '../normalizeSearchQuery'

describe('normalizeSearchQuery', () => {
  it('return an empty string if the input is empty', () => {
    expect(normalizeSearchQuery('')).toBe('')
  })

  it('trim leading and trailing spaces', () => {
    expect(normalizeSearchQuery('  iphone  ')).toBe('iphone')
  })

  it('replace multiple spaces with a single space', () => {
    expect(normalizeSearchQuery('iphone   16   pro')).toBe('iphone%2016%20pro')
  })

  it('convert the string to lowercase', () => {
    expect(normalizeSearchQuery('IPHONE PRO MAX')).toBe('iphone%20pro%20max')
  })

  it('properly encode special characters using encodeURIComponent', () => {
    expect(normalizeSearchQuery('iphone + case')).toBe('iphone%20%2B%20case')
    expect(normalizeSearchQuery('café com leite')).toBe('caf%C3%A9%20com%20leite')
  })

  it('handle complex strings correctly', () => {
    expect(normalizeSearchQuery('   Galaxy   S24 Ultra 5G   ')).toBe('galaxy%20s24%20ultra%205g')
  })
})
