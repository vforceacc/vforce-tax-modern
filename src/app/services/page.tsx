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
      color: "#1e3a8a" // vforce-navy-blue
    },
    {
      title: "Individual Tax",
      path: "/individual-tax",
      icon: Users,
      summary: "Maximise your personal return with local experts who know the North Queensland industry.",
      color: "#059669" // vforce-emerald
    },
    {
      title: "Business Advisory",
      path: "/business-services",
      icon: TrendingUp,
      summary: "Strategic guidance beyond compliance to drive profit and long-term financial stability.",
      color: "#d97706" // vforce-gold
    }
  ];

  return (
    <div className="bg-vforce-primary min-h-screen pt-28 md:pt-40 pb-16 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Expert Solutions
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-vforce-navy italic tracking-tighter mb-8 uppercase leading-none font-heading">
            Our <span className="text-vforce-emerald">Services.</span>
          </h1>
          <p className="text-xl text-vforce-charcoal font-medium max-w-2xl mx-auto leading-relaxed">
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
                <h4 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-4">Expert Oversight</h4>
                <p className="text-white/90 font-bold leading-relaxed">{cat.summary}</p>
                <div className="mt-8 flex items-center text-[10px] font-black text-white uppercase tracking-widest">
                  View Category <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div className="bg-vforce-secondary border border-vforce-border p-12 rounded-[3rem] hover:border-vforce-emerald transition-all duration-500 h-full flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 border border-vforce-border group-hover:bg-vforce-emerald transition-colors duration-500">
                  <cat.icon className="w-10 h-10 text-vforce-emerald group-hover:text-white" />
                </div>
                <h3 className="text-3xl font-black text-vforce-navy uppercase italic tracking-tighter mb-6">{cat.title}</h3>
                <div className="w-12 h-[2px] bg-vforce-emerald/30 mb-8 group-hover:w-full transition-all duration-700"></div>
                <p className="text-vforce-charcoal font-bold uppercase tracking-widest text-[10px]">
                  Explore Specialized Services
                </p>
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-[4rem] p-12 lg:p-24 overflow-hidden relative shadow-xl border border-vforce-border">
          <div className="absolute top-0 right-0 w-96 h-96 bg-vforce-emerald/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="w-16 h-16 bg-vforce-secondary rounded-2xl flex items-center justify-center mb-8 border border-vforce-border">
                <ShieldCheck className="w-8 h-8 text-vforce-emerald" />
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter uppercase mb-8 leading-[0.9]">
                Why Partner <br/> with <span className="text-vforce-emerald">V-Force?</span>
              </h2>
              <p className="text-vforce-charcoal font-medium text-lg leading-relaxed mb-10">
                We combine technical CPA excellence with a deep commitment to the Townsville business community. Our goal is to see you succeed.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "CPA Certified", icon: CheckCircle2 },
                  { name: "ASIC Registered", icon: CheckCircle2 },
                  { name: "TPB Agent", icon: CheckCircle2 }
                ].map((badge, idx) => (
                  <span key={idx} className="px-6 py-2 bg-vforce-secondary border border-vforce-border rounded-full text-[10px] font-black uppercase tracking-widest text-vforce-navy flex items-center">
                    <badge.icon className="w-3 h-3 text-vforce-emerald mr-2 drop-shadow-[0_0_5px_rgba(5,150,105,0.3)]" /> {badge.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-vforce-secondary border border-vforce-border p-12 rounded-[3rem] text-center shadow-lg transform lg:rotate-2">
              <Zap className="w-12 h-12 text-vforce-emerald mx-auto mb-8" />
              <h3 className="text-vforce-navy text-3xl font-black italic uppercase tracking-tighter mb-6">Need a Strategy?</h3>
              <p className="text-vforce-charcoal font-medium mb-10">Let's map out your financial future with a free consultation.</p>
              <Link href="/booking" className="inline-block w-full bg-vforce-navy-blue text-white py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:scale-105 transition-all shadow-md">
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
