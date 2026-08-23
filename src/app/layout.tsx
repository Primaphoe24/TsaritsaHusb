import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { PageWrapper } from '@/components/layout/PageWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Tsaritsa | Tsaritsa Husband',
  description:
    'High-performance real-time 3D WebGL winter experience powered by Next.js 16, React Three Fiber, GSAP, and Framer Motion.',
  keywords: [
    'Next.js 16',
    'React Three Fiber',
    'Three.js',
    'GSAP',
    'Framer Motion',
    'WebGL 3D',
    'Particle System',
    'Interactive Website',
  ],
  authors: [{ name: 'Aethelgard Studio' }],
  openGraph: {
    title: 'Aethelgard | 3D Interactive Winter Experience',
    description: 'Immersive WebGL particle snow scene with complex 2D timeline animations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Aethelgard 3D Engine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aethelgard 3D Winter Experience',
    description: 'Real-time WebGL snowfall physics & GSAP animations.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} dark scroll-smooth`}>
      <body className="bg-[#090d16] text-slate-100 font-sans antialiased min-h-screen">
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
