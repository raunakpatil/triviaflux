import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'TriviaFlux',
  description: 'Retro-Futuristic Knowledge Engine. Real-time data comparison game.',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'TriviaFlux' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#00E5A0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Rajdhani:wght@500;700&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
