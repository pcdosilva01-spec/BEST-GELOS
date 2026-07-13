import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Best Gelo | Fábrica de Gelo em Mauá/SP - Entrega Rápida',
    template: '%s | Best Gelo',
  },
  description: 'Best Gelo Comércio de Gelo LTDA - Fábrica própria em Mauá/SP. Gelo em cubos, triturado, seco e personalizado. Entrega em até 2h na Grande SP. Atendemos eventos, bares, restaurantes e consumidor final.',
  keywords: ['gelo', 'fábrica de gelo', 'gelo em cubos', 'gelo triturado', 'gelo seco', 'gelo personalizado', 'entrega de gelo', 'Mauá', 'São Paulo', 'ABC paulista', 'eventos', 'bares', 'restaurantes'],
  authors: [{ name: 'Best Gelo Comércio de Gelo LTDA' }],
  creator: 'Best Gelo',
  publisher: 'Best Gelo Comércio de Gelo LTDA',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://bestgelo.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://bestgelo.com.br',
    title: 'Best Gelo | Fábrica de Gelo em Mauá/SP - Entrega Rápida',
    description: 'Gelo de qualidade superior direto da fábrica. Cubos, triturado, seco e personalizado. Entrega em até 2h na Grande SP.',
    siteName: 'Best Gelo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Gelo - Fábrica de Gelo em Mauá/SP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Gelo | Fábrica de Gelo em Mauá/SP',
    description: 'Gelo de qualidade superior direto da fábrica. Entrega em até 2h na Grande SP.',
    images: ['/og-image.jpg'],
    creator: '@bestgelo',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={`${inter.className} ${spaceGrotesk.className} ${jetbrainsMono.className} font-sans antialiased bg-background text-foreground`}>
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}