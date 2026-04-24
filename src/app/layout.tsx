import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Global Café Business School | Diploma in Café Management & Barista Skills',
    template: '%s | Global Café Business School',
  },
  description:
    'Professional Diploma in Café Management & Barista Skills. Learn the art and science of cafe from industry professionals. Hands-on training for cafés, restaurants, hotels, and cafe businesses.',
  keywords: ['café management', 'barista training', 'cafe diploma', 'barista skills', 'café business school'],
  openGraph: {
    type: 'website',
    siteName: 'Global Café Business School',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '64x64' }],
    shortcut: ['/icon'],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
