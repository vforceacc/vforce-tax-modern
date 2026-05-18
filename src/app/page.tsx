import React from 'react';
import Image from 'next/image';
import ProfitGraph from '@/components/ProfitGraph';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { 
  ChevronDown, ArrowRight, Building, Users, 
  CheckCircle2, ShieldCheck, Zap, Target, Activity, TrendingUp
} from 'lucide-react';



const Hero = () => (
  <section className="relative pt-12 pb-24 lg:pt-56 lg:pb-48 overflow-hidden bg-vforce-secondary">
    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vforce-emerald/20 blur-[150px] rounded-full"></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center bg-vforce-emerald/10 border border-vforce-emerald/20 rounded-full px-5 py-2 mb-8">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vforce-emerald opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vforce-emerald"></span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-vforce-emerald uppercase">Your Trusted Townsville Accounting Ally</span>
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black text-vforce-navy leading-[0.85] tracking-tighter italic mb-10">
            Precision <br/> <span className="text-vforce-emerald">Tax Agent</span><span className="text-vforce-gold">.</span>
          </h1>
          <p className="text-vforce-charcoal text-lg md:text-xl font-medium max-w-lg mb-12 leading-relaxed">
            Discover Financial Freedom with Townsville's expert CPA, ASIC, and TPB-registered specialists. We provide tailored tax planning and financial advice for North Queensland businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking" className="bg-vforce-navy-blue text-white px-10 py-5 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-xl">
              Free Consultation
            </Link>
            <Link href="/pricing" className="border border-vforce-border bg-white text-vforce-navy px-10 py-5 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-slate-50 transition-all">
              View Pricing Guide
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
            <div className="w-14 h-14 bg-vforce-secondary border border-vforce-border rounded-2xl flex items-center justify-center mb-8 group-hover:bg-vforce-emerald transition-colors duration-500">
              <item.icon className="w-7 h-7 text-vforce-emerald group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-black text-vforce-navy uppercase tracking-tight mb-4 italic">{item.title}</h3>
            <p className="text-vforce-charcoal font-medium leading-loose text-[15px]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SEOBlock = () => (
  <section className="py-32 bg-vforce-secondary border-y border-vforce-border">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black text-vforce-navy italic tracking-tighter mb-8 uppercase">Townsville Business Tax Solutions, Simplified</h2>
        <div className="space-y-6 text-vforce-charcoal leading-relaxed font-medium">
          <p>
            At VForce Tax, we support individuals and businesses across Townsville with expert tax planning, accounting, and financial advice. Our team of experienced <strong className="text-vforce-navy">CPAs, ASIC agents, and Tax Practitioners Board–registered professionals</strong> deliver personalised solutions tailored to your unique needs.
          </p>
          <p>
            Generic accountants don't understand the specific logistical hurdles or the local community dynamics that drive Townsville's success. Whether you are in Mount Louisa, Kirwan, or the CBD, we are your <strong className="text-vforce-navy">trusted Townsville tax specialists</strong>.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 mt-8">
            {["CPA Certified", "ASIC Registered", "TPB Registered Agent", "Tax Planning Experts", "BAS/GST Specialists", "Xero Certified Advisor"].map(item => (
              <li key={item} className="flex items-center text-sm font-bold text-vforce-navy uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-vforce-emerald mr-3 drop-shadow-[0_0_8px_rgba(5,150,105,0.3)]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);



export default function Home() {
  return (
    <>
      <Hero />
      <Features />

      {/* ACCREDITATION STRIP */}
      <section className="py-12 bg-vforce-primary border-y border-vforce-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[10px] font-black text-vforce-charcoal tracking-[0.3em] uppercase text-center mb-8">Registered & Certified With</p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {/* CPA Australia */}
            <Image
              src="/badge-cpa.png"
              alt="CPA Australia"
              width={180}
              height={90}
              className="h-12 md:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            {/* Tax Practitioners Board + Xero Certified */}
            <Image
              src="/badge-tpb-xero.png"
              alt="TPB Registered & Xero Certified Advisor"
              width={330}
              height={90}
              className="h-12 md:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      <section id="specialities" className="py-40 bg-vforce-secondary border-t border-vforce-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <header className="mb-24 text-center">
            <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
              <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Expert Solutions
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-vforce-navy italic tracking-tighter mb-8 uppercase leading-none font-heading">
              Our <span className="text-vforce-emerald">Services.</span>
            </h2>
            <p className="text-xl text-vforce-charcoal font-medium max-w-2xl mx-auto leading-relaxed">
              Choose a category to explore our specialised accounting and advisory solutions tailored for the Townsville community.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
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
            ].map((cat, i) => (
              <Link key={i} href={cat.path} className="group relative block h-full">
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

                <div className="bg-white border border-vforce-border p-12 rounded-[3rem] hover:border-vforce-emerald transition-all duration-500 h-full flex flex-col items-center text-center shadow-sm min-h-[380px] justify-center">
                  <div className="w-20 h-20 bg-vforce-secondary rounded-3xl flex items-center justify-center mb-10 border border-vforce-border group-hover:bg-vforce-emerald transition-colors duration-500">
                    <cat.icon className="w-10 h-10 text-vforce-emerald group-hover:text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-vforce-navy uppercase italic tracking-tighter mb-6 font-heading">{cat.title}</h3>
                  <div className="w-12 h-[2px] bg-vforce-emerald/30 mb-8 group-hover:w-full transition-all duration-700"></div>
                  <p className="text-vforce-charcoal font-bold uppercase tracking-widest text-[10px]">
                    Explore Specialized Services
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-40 bg-vforce-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
                <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> The V-Force Method
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-vforce-navy italic tracking-tighter uppercase leading-[0.9] mb-12">
                Simplicity in <br/><span className="text-vforce-emerald">Complexity.</span>
              </h2>
              <p className="text-vforce-charcoal text-lg font-medium leading-relaxed mb-10">
                The CPA guide for accounting firms is clear: simplicity is key. While tax law is daunting, your experience shouldn't be. We translate complex legislation into clear, actionable financial health for your business.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Clear Communication", desc: "No jargon. Just plain English advice that helps you make decisions." },
                  { title: "Strategic Growth", desc: "We don't just count numbers; we engineer pathways for your business to scale." },
                  { title: "Absolute Reliability", desc: "Townsville-owned and operated. We are here when you need us." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-vforce-emerald/10 flex items-center justify-center mr-4 mt-1">
                      <div className="w-2 h-2 rounded-full bg-vforce-emerald"></div>
                    </div>
                    <div>
                      <h4 className="text-vforce-navy font-black uppercase tracking-tight italic text-lg">{item.title}</h4>
                      <p className="text-vforce-charcoal text-sm font-bold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-vforce-emerald/5 blur-[100px] rounded-full"></div>
              <div className="relative bg-white border border-vforce-border rounded-[3rem] p-12 shadow-lg">
                <h4 className="text-vforce-navy font-black text-2xl italic tracking-tighter uppercase mb-8">Ready to start?</h4>
                <div className="space-y-4">
                  <Link href="/booking" className="block w-full bg-vforce-navy-blue text-white text-center py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md">
                    Book My Strategy Session
                  </Link>
                  <Link href="/pricing" className="block w-full border border-vforce-border bg-vforce-secondary text-vforce-navy text-center py-6 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:bg-white transition-all">
                    View Pricing Structure
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SEOBlock />
      <FAQ />
    </>
  );
}