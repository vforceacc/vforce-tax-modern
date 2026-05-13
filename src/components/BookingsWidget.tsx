import React from 'react';

export default function BookingsWidget() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
      {/* 
        Replace the src URL with your actual Microsoft Bookings publish URL.
      */}
      <iframe 
        src="https://outlook.office365.com/owa/calendar/placeholder@domain.com/bookings/" 
        width="100%" 
        height="800" 
        scrolling="yes" 
        className="border-none w-full"
        style={{ minHeight: '800px' }}
      ></iframe>
    </div>
  );
}
