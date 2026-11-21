'use client';
import React, { useEffect, useState, useRef } from 'react';
import { BOOKINGS_URL } from '@/lib/booking';

export default function BookingsWidget() {
  const [srcUrl, setSrcUrl] = useState('');
  const [isRedirectingMobile, setIsRedirectingMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Client-side mobile viewport fallback: replace history entry so the Back button works cleanly
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
      setIsRedirectingMobile(true);
      window.location.replace(BOOKINGS_URL);
      return;
    }

    // Desktop / tablet: only set the iframe src once it scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrcUrl(BOOKINGS_URL);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  if (isRedirectingMobile) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20 flex flex-col items-center justify-center gap-4 text-center text-vforce-charcoal">
        <div className="w-8 h-8 border-4 border-vforce-emerald border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium">Opening our booking calendar&hellip;</p>
        <a
          href={BOOKINGS_URL}
          className="text-xs font-bold text-vforce-emerald underline hover:text-vforce-navy transition-colors"
        >
          Tap here if you aren&apos;t redirected automatically
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Embedded Iframe Container (Desktop & Tablet) */}
      <div
        ref={wrapperRef}
        className="w-full rounded-2xl overflow-hidden shadow-xl border border-vforce-border bg-white min-h-[850px] flex items-center justify-center"
      >
        {srcUrl ? (
          <iframe
            src={srcUrl}
            width="100%"
            loading="lazy"
            className="border-none w-full min-h-[850px]"
            title="Book an appointment with V-Force Tax"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-vforce-charcoal">
            <div className="w-8 h-8 border-4 border-vforce-emerald border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Loading booking calendar&hellip;</p>
          </div>
        )}
      </div>
    </div>
  );
}
