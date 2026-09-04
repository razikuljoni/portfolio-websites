import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MD Razikul Islam Joni | Full Stack (MERN) Developer · React / Next.js / Node.js',
  description: 'Personal portfolio of MD Razikul Islam Joni — Full Stack Developer with 2+ years of professional experience delivering scalable, high-performance web apps using React.js, Next.js, Redux Toolkit, and Node.js.',
  keywords: [
    'MD Razikul Islam Joni',
    'Razikul Islam Joni',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Redux Toolkit',
    'Node.js Developer',
    'HawkEyes Digital Monitoring',
    'Web Developer Portfolio'
  ],
  authors: [{ name: 'MD Razikul Islam Joni' }],
  creator: 'MD Razikul Islam Joni',
  openGraph: {
    title: 'MD Razikul Islam Joni | Full Stack (MERN) Developer',
    description: 'Product-minded full-stack developer specializing in React.js, Next.js, TypeScript, Redux Toolkit, and enterprise dashboards.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MD Razikul Islam Joni Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD Razikul Islam Joni | Full Stack Developer',
    description: 'Portfolio of MD Razikul Islam Joni in graphite and copper aesthetic.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#b87333]/30 selection:text-[#f5f0e8]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
