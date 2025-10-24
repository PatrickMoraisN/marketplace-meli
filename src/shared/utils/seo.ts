import type { Metadata } from 'next'
import { env } from '../config/env'

interface CreateMetadataOptions {
  title?: string
  description?: string
  image?: string
  path?: string
  noIndex?: boolean
}

const BASE_URL = env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const DEFAULT_TITLE = 'Market place Livre'
const DEFAULT_DESCRIPTION = 'Projeto para praticar desenvolvimento.'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

export function createMetadata({
  title,
  description,
  image,
  path,
  noIndex,
}: CreateMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE
  const fullDescription = description || DEFAULT_DESCRIPTION
  const url = path ? `${BASE_URL}${path}` : BASE_URL
  const ogImage = image || DEFAULT_IMAGE

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: DEFAULT_TITLE,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
