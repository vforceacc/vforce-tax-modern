'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
// Removed client-side firebase imports to use server-side API route instead

interface Feature {
  name: string;
  summary: string;
}

interface ServiceDetails {
  title: string;
  content: string | string[];
  features: Feature[];
}

export default function ServiceContent({ details }: { details: ServiceDetails }) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill form from chat widget query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const prefillName = urlParams.get('name');
    const prefillEmail = urlParams.get('email');
    if (prefillName) setName(prefillName);
    if (prefillEmail) setEmail(prefillEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          service: details.title,
          source: 'Service Page',
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setErrorMsg('Failed to send enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-20 items-start">
      {/* Left column - content */}
      <div className="lg:col-span-8">
        <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Specialist Service
        </div>

        <h1 className="text-6xl lg:text-[85px] font-black text-vforce-navy italic tracking-tighter mb-12 leading-[0.9] uppercase font-heading">
          {details.title}<span className="text-vforce-emerald">.</span>
        </h1>

        <div className="max-w-3xl">
          <div className="text-2xl text-vforce-charcoal font-light leading-relaxed mb-16 border-l-4 border-vforce-emerald/20 pl-8 italic">
            {Array.isArray(details.content) ? (
              details.content.map((paragraph, i) => (
                <p key={i} className="mb-6 last:mb-0">{paragraph}</p>
              ))
            ) : (
              <p>{details.content}</p>
            )}
          </div>

          <div className="bg-vforce-secondary border border-vforce-border rounded-[3rem] p-10 md:p-16 mb-20 shadow-lg relative">
            <h3 className="text-2xl font-black text-vforce-navy uppercase italic tracking-tighter mb-10 flex items-center gap-4 font-heading">
              <span className="w-2 h-8 bg-vforce-emerald rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></span>
              What&apos;s Included
            </h3>

            <div className="grid md:grid-cols-2 gap-y-10 gap-x-12 relative">
              {details.features.map((f: Feature, idx: number) => (
                <div
                  key={idx}
                  className="relative group cursor-help"
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className="flex items-start text-vforce-charcoal font-bold uppercase tracking-widest text-[11px] transition-all duration-300 group-hover:text-vforce-navy">
                    <div className="w-6 h-6 rounded-lg bg-vforce-emerald/10 flex items-center justify-center mr-5 shrink-0 border border-vforce-emerald/20 group-hover:bg-vforce-emerald group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_0_10px_rgba(5,150,105,0.4)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-vforce-emerald group-hover:bg-white"></div>
                    </div>
                    <span className="pt-1.5">{f.name}</span>
                  </div>

                  {/* Hover Summary */}
                  <div className={`absolute z-20 left-0 top-full mt-4 w-64 p-6 bg-white rounded-2xl shadow-xl border border-vforce-border transition-all duration-500 pointer-events-none ${
                    hoveredFeature === idx ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}>
                    <div className="absolute top-0 left-8 w-4 h-4 bg-white border-l border-t border-vforce-border rotate-45 -translate-y-2"></div>
                    <p className="text-vforce-navy text-[12px] font-bold leading-relaxed lowercase first-letter:uppercase relative z-10">
                      {f.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-vforce-border flex items-center text-[9px] font-black text-vforce-emerald tracking-[0.2em] uppercase">
                      V-Force Strategy <Zap className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <Link href="/booking" className="bg-vforce-navy-blue text-white px-12 py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md transform hover:-translate-y-1 font-heading">
            Book Online Now
          </Link>
        </div>
      </div>

      {/* Right column - enquiry form */}
      <div id="contact-form" className="lg:col-span-4 sticky top-56 scroll-mt-32">
        <div className="bg-white border border-vforce-border p-12 rounded-[3rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-vforce-emerald/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <h4 className="text-vforce-navy font-black text-3xl italic tracking-tighter uppercase mb-10 font-heading">Enquire Now</h4>

          {isSuccess ? (
            <div className="bg-vforce-emerald/10 border border-vforce-emerald/30 p-8 rounded-2xl relative z-10 flex flex-col items-center text-center">
              <CheckCircle2 className="w-12 h-12 text-vforce-emerald mb-4" />
              <h5 className="text-vforce-navy font-black text-xl mb-2 font-heading">Enquiry Sent!</h5>
              <p className="text-vforce-charcoal text-sm font-medium">Thank you for reaching out. One of our Townsville experts will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium">{errorMsg}</div>
              )}
              <div>
                <label className="text-[10px] font-black text-vforce-charcoal uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-vforce-primary border border-vforce-border rounded-2xl p-5 text-[13px] font-bold text-vforce-navy focus:ring-2 focus:ring-vforce-emerald focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-vforce-charcoal uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-vforce-primary border border-vforce-border rounded-2xl p-5 text-[13px] font-bold text-vforce-navy focus:ring-2 focus:ring-vforce-emerald focus:bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-vforce-charcoal uppercase tracking-widest ml-1 mb-2 block">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full bg-vforce-primary border border-vforce-border rounded-2xl p-5 text-[13px] font-bold text-vforce-navy focus:ring-2 focus:ring-vforce-emerald focus:bg-white transition-all outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-vforce-navy-blue text-white py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:bg-vforce-navy transition-all duration-300 shadow-md font-heading flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
