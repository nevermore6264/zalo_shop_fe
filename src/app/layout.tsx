import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Zalo Shop - Dịch vụ Zalo uy tín",
    template: "%s | Zalo Shop"
  },
  description: "Cung cấp các dịch vụ Zalo, tài khoản, proxy chất lượng cao. Mua bán tài khoản Zalo, dịch vụ Zalo chính hãng, uy tín, giá rẻ.",
  keywords: [
    "Zalo Shop",
    "dịch vụ Zalo",
    "tài khoản Zalo",
    "proxy Zalo",
    "mua bán Zalo",
    "Zalo uy tín",
    "Zalo giá rẻ",
    "dịch vụ Zalo chính hãng"
  ],
  authors: [{ name: "Zalo Shop Team" }],
  creator: "Zalo Shop",
  publisher: "Zalo Shop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zaloshop.com'),
  alternates: {
    canonical: '/',
    languages: {
      'vi': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://zaloshop.com',
    siteName: 'Zalo Shop',
    title: 'Zalo Shop - Dịch vụ Zalo uy tín',
    description: 'Cung cấp các dịch vụ Zalo, tài khoản, proxy chất lượng cao. Mua bán tài khoản Zalo, dịch vụ Zalo chính hãng, uy tín, giá rẻ.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zalo Shop - Dịch vụ Zalo uy tín',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zalo Shop - Dịch vụ Zalo uy tín',
    description: 'Cung cấp các dịch vụ Zalo, tài khoản, proxy chất lượng cao. Mua bán tài khoản Zalo, dịch vụ Zalo chính hãng, uy tín, giá rẻ.',
    images: ['/og-image.jpg'],
    creator: '@zaloshop',
    site: '@zaloshop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'business',
  classification: 'Business',
  other: {
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#3B82F6',
    'color-scheme': 'light',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//api.qrserver.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zalo Shop",
              "url": "https://zaloshop.com",
              "logo": "https://zaloshop.com/icon.svg",
              "description": "Cung cấp các dịch vụ Zalo, tài khoản, proxy chất lượng cao",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Vietnamese"
              },
              "sameAs": [
                "https://facebook.com/zaloshop",
                "https://twitter.com/zaloshop"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
