import React from 'react';
import Link from 'next/link';
import { Building, Users, TrendingUp, ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Accounting Services | V-Force Tax Townsville',
  description: 'Explore our full range of CPA-certified tax and accounting services. From business tax and advisory to individual returns, we are your Townsville allies.',
};

export default function ServicesHub() {
  const categories = [
    {
      title: "Business Tax",
      path: "/business-tax",
      icon: Building,
      summary: "Precision-engineered tax solutions for Townsville companies, partnerships, and trusts.",
      color: "#39d237"
    },
    {
      title: "Individual Tax",
      path: "/individual-tax",
      icon: Users,
      summary: "Maximise your personal return with local experts who know the North Queensland industry.",
      color: "#39d237"
    },
    {
      title: "Business Advisory",
      path: "/business-services",
      icon: TrendingUp,
      summary: "Strategic guidance beyond compliance to drive profit and long-term financial stability.",
      color: "#fed03a"
    }
  ];

  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> Expert Solutions
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter mb-8 uppercase leading-none font-heading">
            Our <span className="text-[#39d237]">Services.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose a category to explore our specialised accounting and advisory solutions tailored for the Townsville community.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.path} className="group relative">
              {/* Hover Summary Box */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[3rem] z-20 flex flex-col justify-center p-12 translate-y-4 group-hover:translate-y-0 pointer-events-none"
                style={{ backgroundColor: cat.color }}
              >
                <h4 className="text-[#0a0f1e] font-black text-2xl uppercase italic tracking-tighter mb-4">Expert Oversight</h4>
                <p className="text-[#0a0f1e] font-bold leading-relaxed">{cat.summary}</p>
                <div className="mt-8 flex items-center text-[10px] font-black text-[#0a0f1e] uppercase tracking-widest">
                  View Category <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] hover:border-[#39d237] transition-all duration-500 h-full flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 border border-white/10 group-hover:bg-[#39d237] transition-colors duration-500">
                  <cat.icon className="w-10 h-10 text-[#39d237] group-hover:text-[#0a0f1e]" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6">{cat.title}</h3>
                <div className="w-12 h-[2px] bg-[#39d237]/30 mb-8 group-hover:w-full transition-all duration-700"></div>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  Explore Specialized Services
                </p>
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-[0_0_100px_rgba(57,210,55,0.15)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#39d237]/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="w-16 h-16 bg-[#0a0f1e] rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="w-8 h-8 text-[#39d237]" />
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-[#0a0f1e] italic tracking-tighter uppercase mb-8 leading-[0.9]">
                Why Partner <br/> with <span className="text-[#39d237]">V-Force?</span>
              </h2>
              <p className="text-slate-600 font-medium text-lg leading-relaxed mb-10">
                We combine technical CPA excellence with a deep commitment to the Townsville business community. Our goal is to see you succeed.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "CPA Certified", icon: CheckCircle2 },
                  { name: "ASIC Registered", icon: CheckCircle2 },
                  { name: "TPB Agent", icon: CheckCircle2 }
                ].map((badge, idx) => (
                  <span key={idx} className="px-6 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0a0f1e] flex items-center">
                    <badge.icon className="w-3 h-3 text-[#39d237] mr-2 drop-shadow-[0_0_5px_rgba(57,210,55,0.8)]" /> {badge.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-[#0a0f1e] p-12 rounded-[3rem] text-center shadow-2xl transform lg:rotate-2">
              <Zap className="w-12 h-12 text-[#39d237] mx-auto mb-8" />
              <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter mb-6">Need a Strategy?</h3>
              <p className="text-slate-400 font-medium mb-10">Let's map out your financial future with a free consultation.</p>
              <Link href="/contact" className="inline-block w-full bg-[#39d237] text-[#0a0f1e] py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:scale-105 transition-all shadow-[0_10px_30px_rgba(57,210,55,0.3)]">
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
