import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SOCIAL_IMAGE } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "MD Razikul Islam Joni",
  alternateName: "Razikul Joni",
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  image: `${SITE_URL}/joni-portrait-new.webp`,
  email: "mailto:razikuljoni@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: ["https://github.com/razikuljoni", "https://www.linkedin.com/in/razikuljoni"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Enterprise dashboards",
  ],
};

// Escaping `<` prevents an injected closing script tag if this data becomes dynamic.
const safePersonStructuredData = JSON.stringify(personStructuredData).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MD Razikul Islam Joni | Full Stack Developer",
    template: "%s | Razikul Joni",
  },
  description:
    "Product-minded full-stack developer in Dhaka building enterprise dashboards, scalable APIs, commerce platforms, and polished React and Next.js experiences.",
  keywords: [
    "MD Razikul Islam Joni",
    "Razikul Joni",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "MERN Developer",
    "Bangladesh",
  ],
  authors: [{ name: "MD Razikul Islam Joni", url: "https://github.com/razikuljoni" }],
  creator: "MD Razikul Islam Joni",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MD Razikul Islam Joni — Portfolio",
    title: "MD Razikul Islam Joni | Full Stack Developer",
    description:
      "Engineering thoughtful interfaces and dependable full-stack systems for real operational products.",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "MD Razikul Islam Joni | Full Stack Developer",
    description: "Engineering thoughtful interfaces and dependable full-stack systems.",
    images: [SOCIAL_IMAGE.url],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json">{safePersonStructuredData}</script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
