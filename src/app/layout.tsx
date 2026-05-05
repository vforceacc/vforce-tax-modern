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
  title: 'V-Force Tax | Townsville Tax Agent | CPA & ASIC Registered',
  description: 'Expert tax planning, business accounting, and financial advisory for Townsville. Registered CPA and ASIC agents specialising in GST, BAS, and SME tax strategies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
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