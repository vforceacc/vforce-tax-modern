'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navigation } from '@/lib/data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${scrolled ? 'bg-vforce-primary/95 backdrop-blur-xl border-b border-vforce-border py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center relative">
        
        {/* LOGO */}
        <div className="flex items-center group">
          <Link href="/">
            <img 
              src="/vforce-logo.png" 
              alt="VForce Tax Logo" 
              className="h-20 md:h-24 w-auto object-contain transition-all duration-300 group-hover:scale-105" 
            />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center space-x-10">
          <Link href="/about" className="text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading">
            About Us
          </Link>
          <Link href="/news" className="text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading">
            News
          </Link>
          
          {navigation.map((item) => (
            <div key={item.title} className="group relative">
              <button className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading">
                {item.title} <ChevronDown className="ml-2 w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="bg-vforce-primary/95 backdrop-blur-2xl rounded-[2rem] shadow-3xl border border-vforce-border p-3 overflow-hidden">
                  {item.subRoutes.map((sub) => (
                    <Link key={sub.title} href={sub.path} className="flex items-start gap-4 w-full text-left p-4 hover:bg-vforce-secondary rounded-2xl transition-all group/item">
                      <div className="w-10 h-10 rounded-xl bg-vforce-secondary flex items-center justify-center shrink-0 border border-vforce-border group-hover/item:border-vforce-emerald/30 group-hover/item:bg-vforce-emerald/10 transition-all">
                        {sub.icon && <sub.icon className="w-5 h-5 text-vforce-emerald" />}
                      </div>
                      <div>
                        <div className="font-black text-[13px] text-vforce-navy uppercase italic tracking-tight group-hover/item:text-vforce-emerald transition-colors font-heading">{sub.title}</div>
                        <p className="text-[10px] text-vforce-charcoal mt-1 font-bold leading-tight uppercase tracking-wider">{sub.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Link 
            href="/booking"
            className="bg-vforce-navy-blue text-white px-8 py-3.5 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-vforce-navy transition-all transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(30,58,138,0.3)] inline-block font-heading"
          >
            ENQUIRE NOW
          </Link>
        </nav>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setMobileMenu(!mobileMenu)} 
          className="lg:hidden text-vforce-navy p-2 relative z-[80] pointer-events-auto"
        >
          {mobileMenu ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      
      {/* MOBILE MENU PANEL */}
      {mobileMenu && (
        <div className="fixed inset-0 top-0 h-[100dvh] w-full bg-vforce-primary z-50 flex flex-col overflow-y-auto animate-in fade-in duration-300">
          {/* Mobile menu header row */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-vforce-border shrink-0">
            <Link href="/" onClick={() => setMobileMenu(false)}>
              <img src="/vforce-logo.png" alt="VForce Tax Logo" className="h-14 w-auto object-contain" />
            </Link>
            <button onClick={() => setMobileMenu(false)} className="text-vforce-navy p-2">
              <X size={32} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col flex-1 p-6 pb-20">
            <div className="mb-8 border-b border-vforce-border pb-6">
              <Link 
                href="/about" 
                className="block w-full text-left text-vforce-navy text-3xl font-black py-3 hover:text-vforce-emerald transition-colors italic font-heading"
                onClick={() => setMobileMenu(false)}
              >
                ABOUT US
              </Link>
              <Link 
                href="/news" 
                className="block w-full text-left text-vforce-navy text-3xl font-black py-3 hover:text-vforce-emerald transition-colors italic font-heading"
                onClick={() => setMobileMenu(false)}
              >
                NEWS
              </Link>
            </div>
          
            {navigation.map(cat => (
              <div key={cat.title} className="mb-10">
                <div className="text-[10px] font-black text-vforce-emerald uppercase tracking-[0.3em] mb-6 font-heading">{cat.title}</div>
                <div className="space-y-6">
                  {cat.subRoutes.map(sub => (
                    <Link 
                      key={sub.title} 
                      href={sub.path}
                      className="flex items-center gap-6 w-full text-left group"
                      onClick={() => setMobileMenu(false)}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-vforce-secondary flex items-center justify-center border border-vforce-border">
                         {sub.icon && <sub.icon className="w-6 h-6 text-vforce-emerald" />}
                      </div>
                      <div className="text-vforce-navy text-2xl font-black italic hover:text-vforce-emerald transition-colors font-heading uppercase">
                        {sub.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link 
              href="/booking"
              onClick={() => setMobileMenu(false)}
              className="mt-8 bg-vforce-navy-blue text-white text-center w-full py-6 rounded-2xl font-black text-[14px] tracking-[0.2em] uppercase block font-heading hover:bg-vforce-navy transition-colors"
            >
              ENQUIRE NOW
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
