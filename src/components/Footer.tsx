import React from 'react';
import Link from 'next/link';
import { navigation } from '@/lib/data';

const Footer = () => {
  return (
    <footer className="bg-vforce-secondary border-t border-vforce-border pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-5 gap-16 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-8 group">
              <img 
                src="/vforce-logo.png" 
                alt="VForce Tax" 
                className="h-16 w-auto transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-vforce-charcoal text-[15px] font-medium leading-relaxed max-w-sm mb-8">
              Townsville's accounting ally. Registered CPA, ASIC, and TPB agents providing precision tax solutions for North Queensland.
            </p>
            <div className="space-y-2 text-[12px] font-bold text-vforce-charcoal uppercase tracking-widest">
              <p>43 Roosevelt Loop, Mount Louisa 4814</p>
              <p>07 3473 5556</p>
              <p>contact@vforcetax.com.au</p>
            </div>
          </div>
          {navigation.map(cat => (
            <div key={cat.title}>
              <h5 className="text-[10px] font-black tracking-[0.3em] text-vforce-emerald uppercase mb-8">{cat.title}</h5>
              <ul className="space-y-4">
                {cat.subRoutes.map(sub => (
                  <li key={sub.title}>
                    <Link href={sub.path} className="text-vforce-charcoal hover:text-vforce-navy font-bold text-xs uppercase tracking-widest transition-colors">
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-vforce-border pt-12 flex flex-col md:row justify-between items-center gap-6">
          <div className="text-[10px] font-bold text-vforce-charcoal tracking-[0.2em] uppercase">© {new Date().getFullYear()} VFORCE TAX. ALL RIGHTS RESERVED.</div>
          <div className="flex space-x-8">
            <Link href="/about" className="text-[10px] font-bold text-vforce-charcoal hover:text-vforce-navy uppercase tracking-widest transition-colors">About</Link>
            <Link href="/news" className="text-[10px] font-bold text-vforce-charcoal hover:text-vforce-navy uppercase tracking-widest transition-colors">News</Link>
            <Link href="/contact" className="text-[10px] font-bold text-vforce-charcoal hover:text-vforce-navy uppercase tracking-widest transition-colors">Contact</Link>
            <Link href="/privacy" className="text-[10px] font-bold text-vforce-charcoal hover:text-vforce-navy uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-bold text-vforce-charcoal hover:text-vforce-navy uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
