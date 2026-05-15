'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navigation } from '@/lib/data';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body scroll when mobile menu opens/closes
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(prev => prev === title ? null : title);
  };

  const toggleSection = (title: string) => {
    setOpenSection(prev => prev === title ? null : title);
  };

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? 'bg-vforce-primary/95 backdrop-blur-xl border-b border-vforce-border py-2 md:py-4 shadow-sm' : 'bg-vforce-primary/90 backdrop-blur-sm py-2 md:py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        
        {/* LOGO */}
        <div className="flex items-center group relative z-[80]">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/vforce-logo.png"
              alt="VForce Tax Logo"
              width={120}
              height={120}
              priority
              sizes="120px"
              className="h-14 md:h-20 w-auto object-contain group-hover:scale-105"
            />
          </Link>
        </div>

        {/* DESKTOP NAVIGATION (hidden below md breakpoint) */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <Link href="/about" className="text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading">
            About Us
          </Link>
          <Link href="/news" className="text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading">
            News
          </Link>
          
          {navigation.map((item) => (
            <div 
              key={item.title} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => toggleDropdown(item.title)}
                className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-vforce-charcoal hover:text-vforce-emerald transition-all py-2 font-heading"
              >
                {item.title} <ChevronDown className={`ml-2 w-3.5 h-3.5 transition-transform ${activeDropdown === item.title ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 w-80 transition-all duration-300 ${activeDropdown === item.title ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="bg-vforce-primary/95 backdrop-blur-2xl rounded-[2rem] shadow-3xl border border-vforce-border p-3 overflow-visible">
                  {item.subRoutes.map((sub) => (
                    <Link key={sub.title} href={sub.path} className="flex items-start gap-4 w-full text-left p-4 hover:bg-vforce-secondary rounded-2xl transition-all group/item" onClick={() => setActiveDropdown(null)}>
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

        {/* MOBILE TOGGLE (flex below md breakpoint) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="flex md:hidden text-vforce-navy py-3 px-4 min-h-[44px] items-center relative z-[80] pointer-events-auto"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      
      {/* MOBILE MENU PANEL */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-vforce-primary flex flex-col overflow-y-auto md:hidden animate-in fade-in duration-300 pt-20">
          {/* Menu items */}
          <div className="flex flex-col flex-1 p-6 pb-20">
            <div className="mb-4 border-b border-vforce-border pb-4">
              <Link 
                href="/about" 
                className="block w-full text-left text-vforce-navy text-2xl font-black py-3 px-4 min-h-[44px] hover:text-vforce-emerald transition-colors italic font-heading"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </Link>
              <Link 
                href="/news" 
                className="block w-full text-left text-vforce-navy text-2xl font-black py-3 px-4 min-h-[44px] hover:text-vforce-emerald transition-colors italic font-heading"
                onClick={() => setIsMenuOpen(false)}
              >
                NEWS
              </Link>
            </div>
          
            {navigation.map(cat => (
              <div key={cat.title} className="mb-2 border-b border-vforce-border pb-2 last:border-0">
                <button 
                  onClick={() => toggleSection(cat.title)}
                  className="flex justify-between items-center w-full text-left text-vforce-navy text-2xl font-black py-3 px-4 min-h-[44px] hover:text-vforce-emerald transition-colors italic font-heading uppercase"
                >
                  {cat.title}
                  <ChevronDown className={`w-6 h-6 transition-transform ${openSection === cat.title ? 'rotate-180' : ''}`} />
                </button>
                
                {openSection === cat.title && (
                  <div className="space-y-2 mt-2 bg-vforce-secondary/50 rounded-xl p-4">
                    {cat.subRoutes.map(sub => (
                      <Link 
                        key={sub.title} 
                        href={sub.path}
                        className="flex items-center gap-4 w-full text-left group py-3 px-4 min-h-[44px]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-vforce-secondary flex items-center justify-center border border-vforce-border shrink-0">
                           {sub.icon && <sub.icon className="w-5 h-5 text-vforce-emerald" />}
                        </div>
                        <div className="text-vforce-navy text-[15px] font-black italic hover:text-vforce-emerald transition-colors font-heading uppercase">
                          {sub.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              href="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="mt-8 bg-vforce-navy-blue text-white text-center w-full py-4 min-h-[44px] rounded-2xl font-black text-[14px] tracking-[0.2em] uppercase flex items-center justify-center font-heading hover:bg-vforce-navy transition-colors"
            >
              ENQUIRE NOW
            </Link>
          </div>
        </div>
      )}

    </header>
    </>
  );
};

export default Navbar;
