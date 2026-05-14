'use client';
import React, { useEffect, useState } from 'react';

export default function BookingsWidget() {
  const [srcUrl, setSrcUrl] = useState("https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get('name');
      const email = urlParams.get('email');
      
      if (name || email) {
        // MS Bookings uses these query parameters for prefilling
        const params = new URLSearchParams();
        if (name) params.append('name', name);
        if (email) params.append('email', email);
        
        setSrcUrl(`https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/?${params.toString()}`);
      }
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-vforce-border bg-white">
      <iframe 
        src={srcUrl} 
        width="100%" 
        className="border-none w-full min-h-[700px] md:min-h-[850px]"
      ></iframe>
    </div>
  );
}
