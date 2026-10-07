import type { Metadata, Viewport } from 'next';
import { Baloo_2, Figtree } from 'next/font/google';
import './globals.css';
import { ExperienceProvider } from '@/store/experience';

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-baloo',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-figtree',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#02050f',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Doraemon: Castle of the Undersea Devil - Deep Sea Dive Experience',
  description:
    'An immersive deep-sea dive fan experience celebrating the movie Doraemon: New Nobita and the Castle of the Undersea Devil, featuring interactive Canvas 2D ocean simulation, procedural Web Audio, and voiced story mode.',
  keywords: [
    'Doraemon',
    'Nobita',
    'Castle of the Undersea Devil',
    'Underwater Buggy',
    'Tekio Light',
    'Shin-Ei Animation',
    'Fujiko F. Fujio',
    'Deep Sea Dive',
  ],
  authors: [{ name: 'Deep Sea Fan Project' }],
  openGraph: {
    title: 'Doraemon: Castle of the Undersea Devil - Deep Sea Dive Experience',
    description:
      'An immersive deep-sea dive fan experience celebrating the movie Doraemon: New Nobita and the Castle of the Undersea Devil, featuring interactive Canvas 2D ocean simulation, procedural Web Audio, and voiced story mode.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Castle of the Undersea Devil Fan Experience',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doraemon: Castle of the Undersea Devil - Deep Sea Dive Experience',
    description:
      'Dive from the sunlit surface to 10,928 meters down into the Castle of the Undersea Devil. Unofficial fan tribute.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${baloo.variable} ${figtree.variable}`}>
      <body className="antialiased bg-[#02050f] text-[#eaf6ff] selection:bg-[#ffd84d]/30 selection:text-white">
        <ExperienceProvider>
          {/* Red Vignette element for Quake effect (z-index: 3) */}
          <div id="red-vignette" aria-hidden="true" />
          {children}
        </ExperienceProvider>
      </body>
    </html>
  );
}
