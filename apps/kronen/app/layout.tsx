import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KRONEN • Swiss Architectural Real Estate & Landmark Properties',
  description:
    'Curating landmark modernist residences, lakefront villas, and alpine chalets across Switzerland and prime global capitals since 1974.',
  openGraph: {
    title: 'KRONEN • Swiss Architectural Real Estate & Landmark Properties',
    description:
      'Curating landmark modernist residences, lakefront villas, and alpine chalets across Switzerland and prime global capitals since 1974.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KRONEN • Swiss Architectural Real Estate',
    description:
      'Curating landmark modernist residences, lakefront villas, and alpine chalets across Switzerland and prime global capitals.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-stone-950 text-stone-100 font-sans antialiased min-h-screen selection:bg-amber-500 selection:text-stone-950" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

