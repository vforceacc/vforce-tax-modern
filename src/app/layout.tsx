import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MouseGlow from '@/components/MouseGlow';
import LazyAiChatWidget from '@/components/LazyAiChatWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

export const metadata = {
  metadataBase: new URL('https://vforcetax.com.au'),
  title: 'V-Force Tax | Townsville Tax Agent | CPA & ASIC Registered',
  description: 'Expert tax planning, business accounting, and financial advisory for Townsville. Registered CPA and ASIC agents specialising in GST, BAS, and SME tax strategies.',
  keywords: [
    'Tax Agent Townsville', 'Townsville Tax Agent', 'Accountant Townsville',
    'Tax Return Townsville', 'CPA Townsville', 'Business Accountant Townsville',
    'BAS Agent Townsville', 'Tax Advice Townsville', 'VForce Tax'
  ],
  openGraph: {
    title: 'V-Force Tax | Townsville Tax Agent | CPA & ASIC Registered',
    description: 'Expert tax planning, business accounting, and financial advisory for Townsville.',
    url: 'https://vforcetax.com.au',
    siteName: 'V-Force Tax',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V-Force Tax | Townsville Tax Agent',
    description: 'Expert tax planning, business accounting, and financial advisory for Townsville.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: 'V-Force Tax',
  image: 'https://vforcetax.com.au/vforce-logo-inverted.png',
  '@id': 'https://vforcetax.com.au',
  url: 'https://vforcetax.com.au',
  telephone: '0734735556',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Townsville',
    addressLocality: 'Townsville',
    addressRegion: 'QLD',
    postalCode: '4810',
    addressCountry: 'AU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -19.258965,
    longitude: 146.816948
  },
  areaServed: 'Townsville',
  priceRange: '$$',
  sameAs: ['https://vforcetax.com.au']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Resource hints for third-party origins */}
        <link rel="preconnect" href="https://outlook.office365.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://outlook.office365.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-vforce-primary text-vforce-charcoal antialiased selection:bg-vforce-emerald selection:text-white overflow-x-hidden w-full`}>
        <MouseGlow />
        <Navbar />
        {/* Spacer for fixed navbar */}
        <div className="h-32 md:h-48"></div>
        <main>{children}</main>
        <Footer />
        <LazyAiChatWidget />
      </body>
    </html>
  );
}