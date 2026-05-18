import React from 'react';
import BookingsWidget from '@/components/BookingsWidget';

export const metadata = {
  title: 'Book an Appointment | V-Force Tax',
};

export default function BookingPage() {
  return (
    <div className="bg-vforce-primary min-h-screen pt-28 md:pt-40 pb-16 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Schedule Your Session
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter uppercase mb-6 font-heading">
          Book <span className="text-vforce-emerald">Online.</span>
        </h1>
        <p className="text-vforce-charcoal font-medium max-w-xl mx-auto">
          Skip the back-and-forth. Select a time that works for you directly on our calendar.
        </p>
      </div>
      <div className="px-4 md:px-6">
        <BookingsWidget />
      </div>
    </div>
  );
}
