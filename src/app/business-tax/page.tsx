import React from 'react';
import Link from 'next/link';
import { Building, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Townsville Business Tax Services | CPA & ASIC Registered Agents',
  description: 'Expert business tax returns, GST, BAS, and ABN registration for Townsville SMEs. TPB registered agents specializing in tax compliance and optimization.',
};

export default function BusinessTaxPage() {
  const services = [
    {
      title: "Income Tax Returns",
      desc: "Preparation by CPA Certified & ASIC Registered Accountants for Partnerships, Companies, and Trusts.",
      summary: "Precision-engineered returns that ensure full compliance while maximizing your legal tax position.",
      path: "/business-tax/income-tax-returns"
    },
    {
      title: "GST & BAS Preparation",
      desc: "Expert preparation and lodgement. Avoid penalties and manage cash flow with precision oversight.",
      summary: "Stay ahead of the ATO with quarterly reviews that keep your cash flow healthy and audit-proof.",
      path: "/business-tax/gst-bas-preparation"
    },
    {
      title: "ABN & GST Registration",
      desc: "Streamlined application services to get your Townsville business up and running quickly.",
      summary: "Complete setup for new ventures, including TFN, ABN, and GST registration with local expert advice.",
      path: "/business-tax/abn-registration"
    },
    {
      title: "Payroll & Returns",
      desc: "Accurate, timely payroll returns that keep your business compliant and your employees happy.",
      summary: "Full STP 2.0 and superannuation management to keep your team protected and your records perfect.",
      path: "/business-tax/payroll-services"
    }
  ];

  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-24">
          <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> Specialist Services
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-white italic tracking-tighter mb-8 uppercase leading-none font-heading">
            Business <span className="text-[#39d237]">Tax.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed">
            Navigate complex tax regulations with Townsville's trusted CPA accountants. We ensure your business stays compliant while identifying every opportunity for tax optimisation.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {services.map((s, i) => (
            <Link key={i} href={s.path} className="group relative">
              {/* Hover Summary Box */}
              <div className="absolute inset-0 bg-[#39d237] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[2.5rem] z-20 flex flex-col justify-center p-12 translate-y-4 group-hover:translate-y-0 pointer-events-none">
                <h4 className="text-[#0a0f1e] font-black text-2xl uppercase italic tracking-tighter mb-4">Expert Oversight</h4>
                <p className="text-[#0a0f1e] font-bold leading-relaxed">{s.summary}</p>
                <div className="mt-8 flex items-center text-[10px] font-black text-[#0a0f1e] uppercase tracking-widest">
                  View Detail <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:border-[#39d237] transition-all duration-500 h-full flex flex-col">
                <div className="w-12 h-12 bg-[#39d237]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#39d237] transition-colors duration-500">
                  <ShieldCheck className="w-6 h-6 text-[#39d237] group-hover:text-[#0a0f1e]" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">{s.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed mb-8 flex-grow">{s.desc}</p>
                <div className="flex items-center text-[11px] font-black tracking-widest text-[#39d237] uppercase">
                  Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#39d237]/10 blur-[80px] rounded-full"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-[#0a0f1e] italic tracking-tighter uppercase mb-8">The Benefits of Working with Us</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-10">
                Managing accounts is a specialised skill. Outsourcing your tax obligations to V-Force Tax Townsville ensures precision and peace of mind.
              </p>
              <ul className="space-y-4">
                {[
                  "Avoid Costly Late Lodgement Penalties",
                  "Expert Oversight on BAS & ATO Reminders",
                  "Manage Cash Flow Effectively",
                  "Save Time to Focus on Growth",
                  "Reduce Stress with Professional Compliance"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm font-bold text-[#0a0f1e] uppercase tracking-wider">
                    <CheckCircle2 className="w-5 h-5 text-[#39d237] mr-4 drop-shadow-[0_0_8px_rgba(57,210,55,0.6)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0a0f1e] p-10 rounded-[2.5rem] text-center">
              <Zap className="w-12 h-12 text-[#39d237] mx-auto mb-6" />
              <h3 className="text-white text-2xl font-black italic uppercase tracking-tighter mb-4">Ready to Optimise?</h3>
              <p className="text-slate-400 text-sm mb-8">Book a free consultation with our Townsville experts today.</p>
              <Link href="/contact" className="inline-block bg-[#39d237] text-[#0a0f1e] px-10 py-4 rounded-xl font-black text-[12px] tracking-widest uppercase hover:scale-105 transition-transform">
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
