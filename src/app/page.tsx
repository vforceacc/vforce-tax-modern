'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, ArrowRight, Building, Users, 
  CheckCircle2, ShieldCheck, Zap, Target, Activity
} from 'lucide-react';

const ProfitGraph = () => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setOffset(prev => (prev + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);
  const pathData = "M 0 80 Q 25 75, 50 50 T 100 20 T 150 40 T 200 10";
  return (
    <div className="relative group w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-[#39d237]/10 blur-[80px] rounded-full group-hover:bg-[#39d237]/20 transition-all duration-1000"></div>
      <div className="relative bg-[#0f1629]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-[#39d237] uppercase mb-1">VForce Analytics</div>
            <h3 className="text-white text-2xl font-black italic tracking-tighter">Profit Projection</h3>
          </div>
          <Activity className="w-6 h-6 text-[#39d237]" />
        </div>
        <div className="h-40 relative flex items-end justify-between px-2 mb-8">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            {[20, 50, 80].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="white" strokeOpacity={0.05} />)}
            <path d={pathData} fill="none" stroke="#39d237" strokeWidth={4} strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(57,210,55,0.4)]" strokeDasharray="400" strokeDashoffset={400 - (offset * 4)} />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-12 border-t border-white/5 pt-6">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</div>
            <div className="text-white text-xl font-black italic">OPTIMISED</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Projection</div>
            <div className="text-[#39d237] text-xl font-black italic">ASCENDING</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-40 pb-32 lg:pt-56 lg:pb-48 overflow-hidden bg-[#0a0f1e]">
    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#39d237]/20 blur-[150px] rounded-full"></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center bg-[#39d237]/10 border border-[#39d237]/20 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#39d237] mr-3 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#39d237] uppercase">Your Trusted Townsville Accounting Ally</span>
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black text-white leading-[0.85] tracking-tighter italic mb-10">
            Precision <br/> <span className="text-[#39d237]">Tax Agent</span><span className="text-[#fed03a]">.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
            Discover Financial Freedom with Townsville's expert CPA, ASIC, and TPB-registered specialists. We provide tailored tax planning and financial advice for North Queensland businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="https://meetings.hubspot.com/vforce-tax/intro" target="_blank" className="bg-white text-[#0a0f1e] px-10 py-5 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-[#39d237] transition-all shadow-xl">
              Free Consultation
            </Link>
            <Link href="/pricing-guide.pdf" target="_blank" className="border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-white/5 transition-all">
              Download Pricing Guide
            </Link>
          </div>
        </div>
        <ProfitGraph />
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="grid lg:grid-cols-3 gap-16">
        {[
          { icon: ShieldCheck, title: "CPA Certified", text: "Expert tax planning and financial analysis from registered CPA and ASIC agents you can trust." },
          { icon: Zap, title: "Townsville Local", text: "Proudly supporting businesses from Mount Louisa to North Ward with face-to-face local service." },
          { icon: Target, title: "TPB Registered", text: "Fully registered with the Tax Practitioners Board. We ensure 100% compliance with Australian tax law." }
        ].map((item, i) => (
          <div key={i} className="group">
            <div className="w-14 h-14 bg-[#0a0f1e] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#39d237] transition-colors duration-500">
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-black text-[#0a0f1e] uppercase tracking-tight mb-4 italic">{item.title}</h3>
            <p className="text-slate-600 font-medium leading-loose text-[15px]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SEOBlock = () => (
  <section className="py-32 bg-slate-50 border-y border-slate-200">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-[#0a0f1e] italic tracking-tighter mb-8 uppercase">Townsville Business Tax Solutions, Simplified</h2>
        <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
          <p>
            At VForce Tax, we support individuals and businesses across Townsville with expert tax planning, accounting, and financial advice. Our team of experienced <strong className="text-[#0a0f1e]">CPAs, ASIC agents, and Tax Practitioners Board–registered professionals</strong> deliver personalised solutions tailored to your unique needs.
          </p>
          <p>
            Generic accountants don't understand the specific logistical hurdles or the local community dynamics that drive Townsville's success. Whether you are in Mount Louisa, Kirwan, or the CBD, we are your <strong className="text-[#0a0f1e]">trusted Townsville tax specialists</strong>.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 mt-8">
            {["CPA Certified", "ASIC Registered", "TPB Registered Agent", "Tax Planning Experts", "BAS/GST Specialists", "Xero Gold Partners"].map(item => (
              <li key={item} className="flex items-center text-sm font-bold text-[#0a0f1e] uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-[#39d237] mr-3 drop-shadow-[0_0_8px_rgba(57,210,55,0.6)]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [active, setActive] = useState<number | null>(null);

  const faqs = [
    { q: "What documents do I need for my tax return?", a: "Generally, you'll need your PAYG summaries, bank interest statements, private health insurance details, and receipts for work-related expenses. For businesses, we'll need access to your cloud accounting software or a summary of income and expenses." },
    { q: "How long does a tax refund take?", a: "Once we lodge your return electronically with the ATO, most refunds are processed within 10 to 14 business days. We ensure all information is accurate to prevent any unnecessary delays." },
    { q: "Do I need to be in Townsville to work with you?", a: "While we love seeing our clients in our Townsville office, we are fully digital. We support businesses and individuals across Australia using secure cloud portals and video conferencing." }
  ];

  return (
    <section className="py-32 bg-[#0a0f1e]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-black text-white italic mb-12 uppercase text-center tracking-tighter">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/2 transition-all duration-300 hover:border-white/20">
              <button 
                onClick={() => setActive(active === i ? null : i)} 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-all duration-300"
              >
                <span className={`font-bold uppercase tracking-wide text-sm transition-colors duration-300 ${active === i ? 'text-[#39d237]' : 'text-white'}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#39d237] transition-transform duration-500 ${active === i ? 'rotate-180' : ''}`} />
              </button>
              
              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  active === i 
                    ? 'grid-rows-[1fr] opacity-100' 
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-slate-400 text-[15px] leading-relaxed font-medium border-t border-white/5">
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
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <section id="specialities" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h4 className="text-[12px] font-black tracking-[0.4em] text-[#39d237] uppercase mb-6">Expert Solutions</h4>
            <h2 className="text-5xl lg:text-7xl font-black text-[#0a0f1e] italic tracking-tighter uppercase leading-none">Our Specialities</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Building, 
                title: "Business Tax", 
                path: "/business-tax", 
                items: ["ABN Setup", "GST/BAS", "Payroll"],
                summary: "Expert tax returns and compliance for Townsville companies and partnerships."
              },
              { 
                icon: Users, 
                title: "Individual Tax", 
                path: "/individual-tax", 
                items: ["PAYG Returns", "Investments", "Tax Planning"],
                summary: "Maximise your personal refund with local specialists who know your industry."
              },
              { 
                icon: Target, 
                title: "Advisory", 
                path: "/business-services", 
                items: ["Financial Analysis", "Budgets", "Audit Support"],
                summary: "Strategic guidance to scale your business and protect your financial future."
              }
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 p-12 rounded-[3rem] hover:border-[#39d237] transition-all duration-500 group flex flex-col relative overflow-hidden">
                {/* Hover Summary Overlay */}
                <div className="absolute inset-0 bg-[#0a0f1e] opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 p-12 flex flex-col justify-center translate-y-4 group-hover:translate-y-0 pointer-events-none">
                  <div className="text-[10px] font-black text-[#39d237] tracking-[0.4em] uppercase mb-4 italic">V-Force Expert</div>
                  <h4 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-4">{s.title}</h4>
                  <p className="text-slate-400 font-bold leading-relaxed">{s.summary}</p>
                  <div className="mt-8 flex items-center text-[10px] font-black text-[#39d237] uppercase tracking-widest">
                    Explore Details <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>

                <s.icon className="w-10 h-10 text-[#39d237] mb-8" />
                <h3 className="text-3xl font-black text-[#0a0f1e] uppercase italic tracking-tighter mb-8">{s.title}</h3>
                <ul className="space-y-4 mb-10 flex-grow">
                  {s.items.map((item: string) => (
                    <li key={item} className="text-slate-500 font-bold uppercase tracking-widest text-[11px] flex items-center">
                      <ArrowRight className="w-3 h-3 mr-3 text-[#39d237]" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href={s.path} className="text-[11px] font-black tracking-widest text-[#0a0f1e] uppercase group-hover:text-[#39d237] transition-colors flex items-center mt-auto">
                  View All <ChevronDown className="ml-2 w-4 h-4 -rotate-90" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SEOBlock />
      <FAQ />
    </>
  );
}