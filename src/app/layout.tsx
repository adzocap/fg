import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import type { ReactNode } from 'react';
import { Providers } from '@/components/Providers';
import { siteConfig } from '@/data/site';
import { languageBootstrapScript } from '@/lib/i18n';
import './globals.css';

// Geometric, Futura-like sans for interface and body copy.
const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jost',
  display: 'swap',
});

// Sharp Didone display face for headlines, titles and prices.
// The optical-size axis gives hairline contrast at large sizes.
const bodoni = Bodoni_Moda({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
});

const title = 'VANTA EDITIONS — Limited-edition 3D shadowbox art, Istanbul';
const description =
  'Numbered, hand-assembled 3D shadowbox art from Istanbul. Five pieces per edition, never restocked. İstanbul’da elle hazırlanan, numaralı ve sınırlı sayıda shadowbox tablolar.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    'shadowbox',
    'shadowbox tablo',
    '3D wall art',
    'limited edition art',
    'Istanbul',
    'money laundering art',
    'in case of emergency break glass',
    'VANTA EDITIONS',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    title,
    description,
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VANTA EDITIONS — Drop 01, limited to 5 pieces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.defaultLanguage}
      data-lang={siteConfig.defaultLanguage}
      className={`${jost.variable} ${bodoni.variable}`}
      // The bootstrap script below rewrites lang/data-lang before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageBootstrapScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
