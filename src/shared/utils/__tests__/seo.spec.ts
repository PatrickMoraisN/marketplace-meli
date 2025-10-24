import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../config/env', () => ({
  env: { NEXT_PUBLIC_SITE_URL: 'https://example.com' },
}))

import { createMetadata } from '../seo'

describe('createMetadata', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('return default metadata when no params are provided', () => {
    const metadata = createMetadata()

    expect(metadata.title).toBe('Market place Livre')
    expect(metadata.description).toBe('Projeto para praticar desenvolvimento.')
    expect(metadata.alternates?.canonical).toBe('https://example.com')
    const ogImage = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images[0]
      : undefined
    expect(
      typeof ogImage === 'string' ? ogImage : ogImage && 'url' in ogImage ? ogImage.url : undefined
    ).toBe('https://example.com/og-image.png')
    expect(metadata.robots).toEqual({ index: true, follow: true })
  })

  it('include provided title and description', () => {
    const metadata = createMetadata({
      title: 'Página de Teste',
      description: 'Descrição personalizada.',
    })

    expect(metadata.title).toBe('Página de Teste | Market place Livre')
    expect(metadata.description).toBe('Descrição personalizada.')
  })

  it('set canonical and openGraph URLs correctly when path is provided', () => {
    const metadata = createMetadata({ path: '/produtos/item123' })

    expect(metadata.alternates?.canonical).toBe('https://example.com/produtos/item123')
    expect(metadata.openGraph?.url).toBe('https://example.com/produtos/item123')
  })

  it('use custom image if provided', () => {
    const metadata = createMetadata({ image: 'https://cdn.com/img.jpg' })
    const ogImage = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images[0]
      : metadata.openGraph?.images

    expect(
      typeof ogImage === 'string' ? ogImage : ogImage && 'url' in ogImage ? ogImage.url : undefined
    ).toBe('https://cdn.com/img.jpg')
    const twitterImage = Array.isArray(metadata.twitter?.images)
      ? metadata.twitter.images[0]
      : metadata.twitter?.images
    expect(
      typeof twitterImage === 'string'
        ? twitterImage
        : twitterImage && 'url' in twitterImage
        ? twitterImage.url
        : undefined
    ).toBe('https://cdn.com/img.jpg')
  })

  it('disable indexing when noIndex is true', () => {
    const metadata = createMetadata({ noIndex: true })
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })

  it('include openGraph and twitter meta correctly', () => {
    const metadata = createMetadata({ title: 'Produto A', description: 'Item top.' })

    expect(metadata.openGraph?.title).toBe('Produto A | Market place Livre')
    expect(metadata.openGraph?.description).toBe('Item top.')
    expect(metadata.twitter?.title).toBe('Produto A | Market place Livre')
  })
})
