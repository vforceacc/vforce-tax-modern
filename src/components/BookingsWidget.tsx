'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function BookingsWidget() {
  const [srcUrl, setSrcUrl] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: only set the iframe src once it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before it's visible
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Once visible, build the src URL (with optional prefill params)
  useEffect(() => {
    if (!isVisible) return;
    const base = 'https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/';
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');

    if (name || email || phone) {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (email) params.append('email', email);
      if (phone) params.append('phone', phone);
      setSrcUrl(`${base}?${params.toString()}`);
    } else {
      setSrcUrl(base);
    }
  }, [isVisible]);

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
