'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null);

  const faqs = [
    { q: "What documents do I need for my tax return?", a: "Generally, you'll need your PAYG summaries, bank interest statements, private health insurance details, and receipts for work-related expenses. For businesses, we'll need access to your cloud accounting software or a summary of income and expenses." },
    { q: "How long does a tax refund take?", a: "Once we lodge your return electronically with the ATO, most refunds are processed within 10 to 14 business days. We ensure all information is accurate to prevent any unnecessary delays." },
    { q: "Do I need to be in Townsville to work with you?", a: "While we love seeing our clients in our Townsville office, we are fully digital. We support businesses and individuals across Australia using secure cloud portals and video conferencing." }
  ];

  return (
    <section className="py-32 bg-vforce-primary border-t border-vforce-border">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black text-vforce-navy italic mb-12 uppercase text-center tracking-tighter">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-vforce-border rounded-2xl overflow-hidden bg-vforce-secondary transition-all duration-300 hover:border-vforce-emerald/50">
              <button 
                onClick={() => setActive(active === i ? null : i)} 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white transition-all duration-300"
              >
                <span className={`font-bold uppercase tracking-wide text-sm transition-colors duration-300 ${active === i ? 'text-vforce-emerald' : 'text-vforce-navy'}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-vforce-emerald transition-transform duration-500 ${active === i ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  active === i 
                    ? 'grid-rows-[1fr] opacity-100' 
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-vforce-charcoal text-[15px] leading-relaxed font-medium border-t border-vforce-border">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
