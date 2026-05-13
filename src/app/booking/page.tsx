import React from 'react';
import BookingsWidget from '@/components/BookingsWidget';

export const metadata = {
  title: 'Book an Appointment | V-Force Tax',
};

export default function BookingPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-48 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> Schedule Your Session
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase mb-6 font-heading">
          Book <span className="text-[#39d237]">Online.</span>
        </h1>
        <p className="text-slate-400 font-medium max-w-xl mx-auto">
          Skip the back-and-forth. Select a time that works for you directly on our calendar.
        </p>
      </div>
      <BookingsWidget />
    </div>
  );
}
