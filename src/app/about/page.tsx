import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | V-Force Tax | Townsville CPA & ASIC Agents',
  description: 'Learn more about V-Force Tax, Townsville\'s trusted team of CPA and ASIC-registered tax specialists.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen relative overflow-hidden">
      <section className="relative pt-64 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#39d237]/20 blur-[150px] rounded-full"></div>
          <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-[#39d237]/5 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-[#39d237] mr-4"></span> V-Force Tax Advisor
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black text-white italic tracking-tighter mb-12 uppercase leading-[0.85] max-w-4xl font-heading">
            Your Trusted Townsville <br/><span className="text-[#39d237]">Advisor.</span>
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-16 mt-20">
            <div className="space-y-8">
              <p className="text-2xl text-slate-300 font-light leading-relaxed">
                V-Force Tax supports individuals and businesses across Townsville with expert tax planning, accounting, and financial advice. 
              </p>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Our team of experienced <strong className="text-white">CPAs, ASIC agents, and Tax Practitioners Board–registered professionals</strong> deliver personalised solutions tailored to your needs. We believe that accounting shouldn't just be about looking backwards; it should be about looking forward, engineering outcomes, and building wealth. We combine deep local knowledge of the Townsville economy with modern, cloud-based accounting technology.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-sm">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">The V-Force Difference</h3>
              <ul className="space-y-6">
                {[
                  "Proactive tax planning instead of reactive filing",
                  "Deep understanding of NQ industries (Mining, Ag, Health)",
                  "Transparent, fixed-fee pricing structures",
                  "Modern cloud technology stack (Xero, MYOB, Quickbooks)",
                  "Jargon-free communication"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-slate-300 font-bold text-sm tracking-wide">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-[#39d237] mr-4 shrink-0 shadow-[0_0_8px_rgba(57,210,55,0.6)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-6xl font-black text-[#0a0f1e] italic tracking-tighter uppercase leading-none">Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Integrity", text: "We do the right thing, especially when no one is looking. Absolute compliance and ethical advice." },
              { icon: Target, title: "Precision", text: "Near enough isn't good enough. We engineer exact solutions tailored to your unique financial footprint." },
              { icon: Zap, title: "Velocity", text: "Speed matters in business. We utilize modern tech to give you real-time numbers so you can move fast." }
            ].map((value, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-[#0a0f1e] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#39d237] group-hover:-translate-y-2 transition-all duration-500 shadow-xl">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#0a0f1e] uppercase tracking-tight mb-4 italic">{value.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
