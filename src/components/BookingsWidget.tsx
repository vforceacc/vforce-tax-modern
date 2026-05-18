'use client';
import React, { useEffect, useState, useRef } from 'react';

const BOOKINGS_URL = 'https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/';

export default function BookingsWidget() {
  const [srcUrl, setSrcUrl] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: only set the iframe src once it scrolls into view
  useEffect(() => {
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mobile-only Fullscreen Helper Banner */}
      <div className="md:hidden w-full mb-6 bg-vforce-secondary border border-vforce-border p-5 rounded-2xl text-center">
        <p className="text-xs text-vforce-charcoal font-bold mb-3 uppercase tracking-wider">
          Best Mobile Experience
        </p>
        <a
          href={BOOKINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-vforce-navy-blue text-white py-4 px-6 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md"
        >
          Launch Calendar in Fullscreen ↗
        </a>
        <p className="text-[9px] text-vforce-charcoal mt-2 font-medium">
          Opens booking directly in native mobile browser mode for seamless dates & scheduling.
        </p>
      </div>

      {/* Embedded Iframe Container */}
      <div
        ref={wrapperRef}
        className="w-full rounded-2xl overflow-hidden shadow-xl border border-vforce-border bg-white min-h-[1250px] md:min-h-[850px] flex items-center justify-center"
      >
        {srcUrl ? (
          <iframe
            src={srcUrl}
            width="100%"
            loading="lazy"
            className="border-none w-full min-h-[1250px] md:min-h-[850px]"
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
