import { createMetadata } from '@/shared/utils/seo'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.scss'
import { Providers } from './providers/Providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = createMetadata({
  title: 'Buscar produtos',
  path: '/items',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
      </Providers>
    </html>
  )
}
