import React from 'react';
import Link from 'next/link';
import { Target, Activity, BookOpen, ShieldCheck, Users, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Townsville Business Advisory & Accounting | V-Force Tax',
  description: 'Comprehensive business services including tax planning, financial analysis, bookkeeping, and audit support for Townsville enterprises. Partner with local CPA experts.',
};

export default function BusinessServicesPage() {
  const services = [
    {
      title: "Tax Planning",
      icon: Target,
      desc: "Strategically plan tax obligations to optimise financial growth and minimise liabilities.",
      summary: "Forward-thinking strategies to reduce your tax bill and protect your cash flow.",
      path: "/business-services/tax-planning"
    },
    {
      title: "Financial Analysis",
      icon: Activity,
      desc: "Detailed analysis of financial data to make informed decisions and achieve stability.",
      summary: "We translate complex numbers into actionable insights for business growth.",
      path: "/business-services/financial-analysis"
    },
    {
      title: "Bookkeeping",
      icon: BookOpen,
      desc: "Maintain accurate financial statements to track performance in real-time.",
      summary: "Clean, precise records that give you a real-time view of your business health.",
      path: "/business-services/bookkeeping"
    },
    {
      title: "Audit Support",
      icon: ShieldCheck,
      desc: "Ensure compliance and accuracy through expert audit preparation and support services.",
      summary: "Stay audit-ready with professional support that keeps you fully compliant.",
      path: "/business-services/audit-support"
    },
    {
      title: "Payroll Management",
      icon: Users,
      desc: "Efficiently manage payroll processes to ensure timely and accurate compensation.",
      summary: "Full STP 2.0 and superannuation management for absolute peace of mind.",
      path: "/business-services/payroll-management"
    },
    {
      title: "Business Advisory",
      icon: TrendingUp,
      desc: "Receive strategic guidance and insights to drive business growth and success.",
      summary: "Long-term planning and expert advice to scale your operations profitably.",
      path: "/business-services/business-advisory"
    }
  ];

  return (
    <div className="bg-vforce-primary min-h-screen pt-28 md:pt-40 pb-16 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="mb-24">
          <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-8">
            <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> Expert Advisory
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-vforce-navy italic tracking-tighter mb-8 uppercase leading-none font-heading">
            Business <span className="text-vforce-emerald">Services.</span>
          </h1>
          <p className="text-xl text-vforce-charcoal font-medium max-w-2xl leading-relaxed">
            Comprehensive accounting and tax advisory services tailored for North Queensland enterprises. We go beyond compliance to drive your financial success.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {services.map((s, i) => (
            <Link key={i} href={s.path} className="group relative">
              {/* Hover Summary Box */}
              <div className="absolute inset-0 bg-vforce-emerald opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[3rem] z-20 flex flex-col justify-center p-12 translate-y-4 group-hover:translate-y-0 pointer-events-none">
                <h4 className="text-white font-black text-2xl uppercase italic tracking-tighter mb-4">Expert Strategy</h4>
                <p className="text-white font-bold leading-relaxed">{s.summary}</p>
                <div className="mt-8 flex items-center text-[10px] font-black text-white uppercase tracking-widest">
                  Explore Now <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>

              <div className="bg-vforce-secondary border border-vforce-border p-10 rounded-[3rem] hover:border-vforce-emerald transition-all duration-500 h-full flex flex-col">
                <div className="w-12 h-12 bg-vforce-emerald/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-vforce-emerald transition-colors duration-500 border border-vforce-border">
                  <s.icon className="w-6 h-6 text-vforce-emerald group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-black text-vforce-navy uppercase italic tracking-tighter mb-4">{s.title}</h3>
                <p className="text-vforce-charcoal font-medium leading-relaxed mb-8 flex-grow text-sm">{s.desc}</p>
                <div className="flex items-center text-[10px] font-black tracking-[0.2em] text-vforce-emerald uppercase">
                  Explore <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="bg-vforce-emerald rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative shadow-lg">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase mb-8">Elevate Your Business Today</h2>
            <p className="text-[15px] font-bold uppercase tracking-widest mb-12 opacity-90">
              Choose V-Force for Expert Tax Agent and Advisory Services to Achieve Your Financial Goals!
            </p>
            <Link href="/contact" className="inline-block bg-vforce-navy-blue text-white px-12 py-5 rounded-2xl font-black text-[13px] tracking-widest uppercase hover:scale-105 transition-all shadow-md hover:bg-vforce-navy">
              Book Your Appointment
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
