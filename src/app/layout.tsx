import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MouseGlow from '@/components/MouseGlow';
import AiChatWidget from '@/components/AiChatWidget';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
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
  sameAs: [
    'https://vforcetax.com.au'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#0a0f1e] text-white antialiased selection:bg-[#39d237] selection:text-[#0a0f1e]`}>
        <MouseGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}