import React from 'react';
import Link from 'next/link';
import { User, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Individual Tax Returns Townsville | Fast & Accurate Accountants',
  description: 'Simplify your personal finances with V-Force Tax. Fast, accurate, and reliable individual tax return preparation and planning in Townsville.',
};

export default function IndividualTaxPage() {
  const services = [
    {
      title: "PAYG Tax Returns",
      desc: "Fast and reliable preparation for employees, ensuring you maximise your legal deductions.",
      summary: "We know the Townsville industries. From tradies to port workers, we find every legal claim.",
      path: "/individual-tax/payg-services"
    },
    {
      title: "Investment Planning",
      desc: "Expert advice on capital gains, rental properties, and investment tax implications.",
      summary: "Protect your wealth with specialized CGT and rental property advice from local CPA experts.",
      path: "/individual-tax/investment-services"
    },
    {
      title: "Tax Time Strategy",
      desc: "Proactive tips and planning to ensure you are organised and compliant every financial year.",
      summary: "Stay organized year-round with our checklists and tools for stress-free tax lodgement.",
      path: "/individual-tax/tax-time-tips"
    }
  ];

  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-24">
          <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> Personal Finance
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter mb-8 uppercase leading-none font-heading">
            Individual <span className="text-[#39d237]">Tax.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
            Simplify your personal finances with our experienced Townsville tax accountants. We deliver fast, accurate, and reliable tax return preparation tailored to your situation.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {services.map((s, i) => (
            <Link key={i} href={s.path} className="group relative">
              {/* Hover Summary Box */}
              <div className="absolute inset-0 bg-[#39d237] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[3rem] z-20 flex flex-col justify-center p-12 translate-y-4 group-hover:translate-y-0 pointer-events-none">
                <h4 className="text-[#0a0f1e] font-black text-2xl uppercase italic tracking-tighter mb-4">Personal Success</h4>
                <p className="text-[#0a0f1e] font-bold leading-relaxed">{s.summary}</p>
                <div className="mt-8 flex items-center text-[10px] font-black text-[#0a0f1e] uppercase tracking-widest">
                  View Detail <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-[#39d237] transition-all duration-500 h-full flex flex-col">
                <div className="w-12 h-12 bg-[#39d237]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#39d237] transition-colors duration-500">
                  <User className="w-6 h-6 text-[#39d237] group-hover:text-[#0a0f1e]" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">{s.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-8 flex-grow text-sm">{s.desc}</p>
                <div className="flex items-center text-[10px] font-black tracking-[0.2em] text-[#39d237] uppercase">
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#39d237]/5 blur-[80px] rounded-full"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8">Why Choose V-Force for Your Returns?</h2>
              <p className="text-slate-400 font-medium leading-relaxed mb-10">
                Our Townsville-based team takes the stress out of tax time, ensuring you get the best possible outcome with zero compliance risk.
              </p>
              <ul className="space-y-4">
                {[
                  "Maximise Legal Tax Deductions",
                  "Fast & Accurate Electronic Lodgement",
                  "Direct Access to Qualified Accountants",
                  "Expert Rental & Investment Property Advice",
                  "Transparent & Affordable Pricing"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm font-bold text-white uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-[#39d237] mr-4 drop-shadow-[0_0_8px_rgba(57,210,55,0.6)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#39d237] p-10 rounded-[2.5rem] text-center text-[#0a0f1e]">
              <Zap className="w-12 h-12 text-[#0a0f1e] mx-auto mb-6" />
              <h3 className="text-[#0a0f1e] text-2xl font-black italic uppercase tracking-tighter mb-4">Fast Lodgement</h3>
              <p className="text-[#0a0f1e]/80 text-sm font-bold mb-8">Most refunds processed within 10-14 business days.</p>
              <Link href="/contact" className="inline-block bg-[#0a0f1e] text-white px-10 py-4 rounded-xl font-black text-[12px] tracking-widest uppercase hover:scale-105 transition-transform">
                Book Tax Return
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
