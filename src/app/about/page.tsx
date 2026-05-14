import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'About Us | Expert Townsville Tax Agents & CPAs | V-Force Tax',
  description: 'V-Force Tax is your leading Townsville tax agent, CPA, and business accountant. Discover our history, expertise, and why local North Queensland businesses trust us.',
  keywords: [
    'Townsville Tax Agent', 'CPA Townsville', 'Accountant Townsville',
    'Business Advisory Townsville', 'Best Tax Accountant Townsville',
    'North Queensland Tax Specialists', 'ASIC Registered Agent Townsville'
  ]
};

export default function AboutPage() {
  return (
    <div className="bg-vforce-primary min-h-screen relative overflow-hidden">
      <section className="relative pt-64 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vforce-emerald/20 blur-[150px] rounded-full"></div>
          <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-vforce-emerald/5 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> V-Force Tax Advisor
          </div>
          <h1 className="text-6xl lg:text-[100px] font-black text-vforce-navy italic tracking-tighter mb-12 uppercase leading-[0.85] max-w-4xl font-heading">
            Your Trusted Townsville <br/><span className="text-vforce-emerald">Advisor.</span>
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-16 mt-20">
            <div className="space-y-8">
              <p className="text-2xl text-vforce-charcoal font-light leading-relaxed">
                As a premier <strong className="text-vforce-navy">Townsville tax agent</strong> and advisory firm, V-Force Tax supports individuals and businesses across North Queensland with expert tax planning, accounting, and financial advice.
              </p>
              <p className="text-lg text-vforce-charcoal font-medium leading-relaxed">
                Our team of experienced <strong className="text-vforce-navy">CPAs, ASIC registered agents, and Tax Practitioners Board–registered professionals</strong> deliver tailored solutions for your financial success. We know that finding a reliable accountant in Townsville means finding someone who understands the local economy. From mining and agriculture to healthcare and trades, we engineer outcomes that build lasting wealth. We combine deep local business advisory expertise with modern, cloud-based accounting technology like Xero to keep you ahead.
              </p>
            </div>
            
            <div className="bg-vforce-secondary border border-vforce-border rounded-[2.5rem] p-10 backdrop-blur-sm">
              <h3 className="text-2xl font-black text-vforce-navy uppercase italic tracking-tighter mb-8">The V-Force Difference</h3>
              <ul className="space-y-6">
                {[
                  "Proactive tax planning instead of reactive filing",
                  "Deep understanding of NQ industries (Mining, Ag, Health)",
                  "Transparent, fixed-fee pricing structures",
                  "Modern cloud technology stack (Xero, MYOB, Quickbooks)",
                  "Jargon-free communication"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-vforce-charcoal font-bold text-sm tracking-wide">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-vforce-emerald mr-4 shrink-0 shadow-[0_0_8px_rgba(5,150,105,0.4)]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-vforce-secondary border-t border-vforce-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter uppercase leading-none">Our Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Integrity", text: "We do the right thing, especially when no one is looking. Absolute compliance and ethical advice." },
              { icon: Target, title: "Precision", text: "Near enough isn't good enough. We engineer exact solutions tailored to your unique financial footprint." },
              { icon: Zap, title: "Velocity", text: "Speed matters in business. We utilize modern tech to give you real-time numbers so you can move fast." }
            ].map((value, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto bg-white border border-vforce-border rounded-3xl flex items-center justify-center mb-8 group-hover:bg-vforce-emerald group-hover:border-vforce-emerald group-hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl">
                  <value.icon className="w-10 h-10 text-vforce-emerald group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-black text-vforce-navy uppercase tracking-tight mb-4 italic">{value.title}</h3>
                <p className="text-vforce-charcoal font-medium leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32 bg-vforce-primary relative overflow-hidden border-t border-vforce-border">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-vforce-navy italic tracking-tighter uppercase mb-6">Frequently Asked Questions</h2>
            <p className="text-vforce-charcoal font-medium text-lg">Common questions asked by our Townsville clients.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-vforce-secondary border border-vforce-border rounded-2xl p-8 backdrop-blur-sm shadow-sm hover:border-vforce-emerald transition-colors">
              <h3 className="text-xl font-bold text-vforce-navy mb-3">Why should I choose a CPA over a regular tax agent in Townsville?</h3>
              <p className="text-vforce-charcoal leading-relaxed">A Certified Practising Accountant (CPA) possesses advanced qualifications and is held to rigorous professional standards. Choosing a CPA in Townsville ensures you receive high-level strategic business advisory, complex tax planning, and compliance services that go far beyond standard tax returns.</p>
            </div>
            
            <div className="bg-vforce-secondary border border-vforce-border rounded-2xl p-8 backdrop-blur-sm shadow-sm hover:border-vforce-emerald transition-colors">
              <h3 className="text-xl font-bold text-vforce-navy mb-3">Do you provide services for small businesses in North Queensland?</h3>
              <p className="text-vforce-charcoal leading-relaxed">Absolutely. We specialize in SME accounting across North Queensland. Whether you are a sole trader, partnership, or company, our business tax agents handle everything from BAS preparation and GST compliance to ASIC corporate secretarial services.</p>
            </div>
            
            <div className="bg-vforce-secondary border border-vforce-border rounded-2xl p-8 backdrop-blur-sm shadow-sm hover:border-vforce-emerald transition-colors">
              <h3 className="text-xl font-bold text-vforce-navy mb-3">How does V-Force Tax handle cloud accounting?</h3>
              <p className="text-vforce-charcoal leading-relaxed">We are experts in cloud accounting platforms like Xero, MYOB, and QuickBooks. We help Townsville businesses migrate to the cloud, providing real-time financial reporting and streamlined bookkeeping so you can make fast, informed decisions.</p>
            </div>
          </div>
        </div>
        
        {/* JSON-LD for AEO (Answer Engine Optimization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Why should I choose a CPA over a regular tax agent in Townsville?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A Certified Practising Accountant (CPA) possesses advanced qualifications and is held to rigorous professional standards. Choosing a CPA in Townsville ensures you receive high-level strategic business advisory, complex tax planning, and compliance services that go far beyond standard tax returns."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide services for small businesses in North Queensland?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We specialize in SME accounting across North Queensland. Whether you are a sole trader, partnership, or company, our business tax agents handle everything from BAS preparation and GST compliance to ASIC corporate secretarial services."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does V-Force Tax handle cloud accounting?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We are experts in cloud accounting platforms like Xero, MYOB, and QuickBooks. We help Townsville businesses migrate to the cloud, providing real-time financial reporting and streamlined bookkeeping so you can make fast, informed decisions."
                  }
                }
              ]
            })
          }}
        />
      </section>
    </div>
  );
}
