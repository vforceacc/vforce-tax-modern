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
    <div
      ref={wrapperRef}
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-vforce-border bg-white min-h-[700px] md:min-h-[850px] flex items-center justify-center"
    >
      {srcUrl ? (
        <iframe
          src={srcUrl}
          width="100%"
          loading="lazy"
          className="border-none w-full min-h-[700px] md:min-h-[850px]"
          title="Book an appointment with V-Force Tax"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 text-vforce-charcoal">
          <div className="w-8 h-8 border-4 border-vforce-emerald border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium">Loading booking calendar&hellip;</p>
        </div>
      )}
    </div>
  );
}
