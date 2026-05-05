
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div className="text-2xl font-bold text-navy cursor-pointer">V-Force</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/"><div className="text-slate-600 hover:text-navy cursor-pointer">Home</div></Link>
            <Link href="/about"><div className="text-slate-600 hover:text-navy cursor-pointer">About</div></Link>
            <div className="relative group">
              <Link href="/services">
                <div className="text-slate-600 hover:text-navy cursor-pointer">Services</div>
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                <Link href="/individual-tax">
                  <div className="block px-4 py-2 text-slate-600 hover:bg-slate-100 cursor-pointer">Individual Tax</div>
                </Link>
                <Link href="/business-services">
                  <div className="block px-4 py-2 text-slate-600 hover:bg-slate-100 cursor-pointer">Business Services</div>
                </Link>
              </div>
            </div>
            <Link href="/contact"><div className="text-slate-600 hover:text-navy cursor-pointer">Contact</div></Link>
          </nav>
          <button className="md:hidden">
            <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
