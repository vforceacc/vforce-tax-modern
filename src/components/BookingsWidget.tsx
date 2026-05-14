import React from 'react';

export default function BookingsWidget() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
      {/* 
        Replace the src URL with your actual Microsoft Bookings publish URL.
      */}
      <iframe 
        src="https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/" 
        width="100%" 
        className="border-none w-full min-h-[700px] md:min-h-[850px]"
      ></iframe>
    </div>
  );
}
