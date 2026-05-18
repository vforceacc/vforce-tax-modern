'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building, Users, Calculator, TrendingUp, ShieldCheck, 
  CheckCircle2, Printer, CheckSquare, Square, RefreshCw, Zap
} from 'lucide-react';

// Pricing Data matching exactly the user's template
const pricingCategories = [
  {
    id: 'individual',
    title: 'Individual Taxation',
    subtitle: 'PAYG & Personal Strategy',
    icon: Users,
    services: [
      {
        name: 'Individual Income Tax Returns',
        scope: 'Preparation and lodgement of compliant personal returns, incorporating standard salary/wage inputs, work-related expenses, and basic offsets.',
        fee: 'Starting from $155',
        type: 'Per return / Standard',
        badge: 'CPA Benchmarked',
        calcMin: 155,
        calcMax: 155
      },
      {
        name: 'Tax Time Strategy',
        scope: 'Proactive tips and planning to ensure you are organised and compliant every financial year. Maximises legal deductions before year-end wrap up.',
        fee: '$180 – $350',
        type: 'Annual consultation / Review',
        badge: 'Expert Review',
        calcMin: 180,
        calcMax: 350
      }
    ]
  },
  {
    id: 'setup',
    title: 'Venture Setup & Registrations',
    subtitle: 'Identity Setup & Entities',
    icon: Building,
    services: [
      {
        name: 'ABN & GST Registration Only',
        scope: 'Streamlined application services to get your Townsville business up and running quickly without filing delays.',
        fee: '$165 – $250',
        type: 'One-off setup fee',
        badge: 'Fast-Track',
        calcMin: 165,
        calcMax: 250
      },
      {
        name: 'Complete Venture Structure Setup',
        scope: 'Complete setup for new ventures, including registration of required tax identity profiles (TFN, ABN, and GST) alongside comprehensive local expert advice. Complete compliance onboarding matching the appropriate Australian entity architecture (Sole Trader vs. Company/Trust).',
        fee: '$450 – $950',
        type: 'Excludes structural ASIC fees',
        badge: 'Expert Oversight',
        calcMin: 450,
        calcMax: 950
      }
    ]
  },
  {
    id: 'business-tax',
    title: 'Business Income Tax',
    subtitle: 'Company & Partnership Returns',
    icon: ShieldCheck,
    services: [
      {
        name: 'Income Tax Returns: Partnerships',
        scope: 'Preparation by CPA Certified & ASIC Registered Accountants. Distribution schedules, compliance reporting, and asset reconciliation.',
        fee: '$490 – $880+',
        type: 'Based on operational volume',
        badge: 'CPA Certified',
        calcMin: 490,
        calcMax: 880
      },
      {
        name: 'Income Tax Returns: Companies & Trusts',
        scope: 'Comprehensive annual financial statements, corporate tax calculations, franking accounts, trust distribution minutes, and regulatory compliance. Stay ahead of the ATO with quarterly reviews that keep your cash flow healthy and audit-proof.',
        fee: '$850 – $2,200+',
        type: 'Per entity / Annual return',
        badge: 'ASIC Compliant',
        calcMin: 850,
        calcMax: 2200
      }
    ]
  },
  {
    id: 'bookkeeping',
    title: 'Bookkeeping, BAS & Payroll',
    subtitle: 'Operations & STP 2.0',
    icon: Calculator,
    services: [
      {
        name: 'GST & BAS Preparation',
        scope: 'Expert preparation and lodgement. Avoid late penalties and manage your cash flow cycle with precise financial data validation.',
        fee: '$180 – $380',
        type: 'Per quarterly lodgement',
        badge: 'CPA Lodged',
        calcMin: 180,
        calcMax: 380
      },
      {
        name: 'Bookkeeping Services',
        scope: 'Maintain accurate financial statements to track your performance indicators in real-time. Clean, precise records that give you a real-time view of your business health.',
        fee: '$75 – $95 / Hour',
        type: 'Or monthly retainers from $290',
        badge: 'Xero Certified',
        calcMin: 290, // using standard retainer start
        calcMax: 500
      },
      {
        name: 'Payroll & Returns / Payroll Management',
        scope: 'Accurate, timely payroll returns that keep your business compliant and your employees happy. Full Single Touch Payroll (STP 2.0) tracking and superannuation reconciliation. Absolute peace of mind.',
        fee: '$150 – $450',
        type: 'Per month (Based on headcount)',
        badge: 'STP 2.0 Compliant',
        calcMin: 150,
        calcMax: 450
      }
    ]
  },
  {
    id: 'advisory',
    title: 'Strategic Planning & Advisory',
    subtitle: 'Commercial advisory & growth',
    icon: TrendingUp,
    services: [
      {
        name: 'Tax Planning',
        scope: 'Strategically plan tax obligations to optimise financial growth and legally minimise your ongoing liabilities. Includes restructuring analysis and distribution planning.',
        fee: '$850 – $2,500+',
        type: 'Per engagement scope',
        badge: 'Expert Strategy',
        calcMin: 850,
        calcMax: 2500
      },
      {
        name: 'Financial Analysis',
        scope: 'Detailed analysis of financial data to make informed layout decisions and achieve long-term corporate stability. We translate complex numbers into actionable insights for targeted business growth.',
        fee: '$220 – $350 / Hour',
        type: 'Or fixed project quote',
        badge: 'Strategic Insights',
        calcMin: 440, // assume basic 2 hr consult min
        calcMax: 700
      },
      {
        name: 'Business Advisory',
        scope: 'Receive strategic guidance and proactive commercial insights to drive commercial business growth and success. Long-term planning and expert advice to scale your operations profitably across regional and national markets.',
        fee: '$650 – $1,800',
        type: 'Monthly advisor packages',
        badge: 'Elevate Business',
        calcMin: 650,
        calcMax: 1800
      },
      {
        name: 'Audit Support',
        scope: 'Ensure compliance and precision through expert audit preparation and direct support services when facing regulatory queries. Stay audit-ready with professional support that keeps you fully compliant with ATO requirements.',
        fee: '$180 – $280 / Hour',
        type: 'Based on engagement complexity',
        badge: 'Audit Ready',
        calcMin: 360, // assume basic 2 hr audit prep min
        calcMax: 560
      }
    ]
  }
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('individual');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Toggle service selection for live calculator
  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(name => name !== serviceName) 
        : [...prev, serviceName]
    );
  };

  // Reset calculator selections
  const clearCalculator = () => {
    setSelectedServices([]);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Calculate live totals
  const getSelectedTotals = () => {
    let minTotal = 0;
    let maxTotal = 0;
    
    pricingCategories.forEach(cat => {
      cat.services.forEach(service => {
        if (selectedServices.includes(service.name)) {
          minTotal += service.calcMin;
          maxTotal += service.calcMax;
        }
      });
    });

    return { minTotal, maxTotal };
  };

  const { minTotal, maxTotal } = getSelectedTotals();
  const currentCategory = pricingCategories.find(cat => cat.id === activeTab) || pricingCategories[0];

  return (
    <div className="bg-vforce-primary min-h-screen pt-28 md:pt-40 pb-16 md:pb-32 relative overflow-x-hidden print:overflow-visible print:bg-white print:pt-0 print:pb-0">
      
      {/* Decorative Blur - Hidden in Print */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none print:hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vforce-emerald/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-vforce-emerald/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 print:px-0">
        
        {/* Header Block */}
        <header className="mb-16 text-center print:text-left print:mb-8 border-b border-vforce-border print:pb-6 pb-8">
          <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-6 print:hidden">
            <span className="w-8 h-[1px] bg-vforce-emerald mr-4"></span> V-FORCE TAX BENCHMARKS
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter mb-4 uppercase leading-none font-heading print:text-3xl print:not-italic print:font-bold">
            Accounting & Tax <span className="text-vforce-emerald">Services.</span>
          </h1>
          <p className="text-[12px] font-black text-vforce-charcoal tracking-[0.25em] uppercase mb-8 print:text-[10px] print:mb-4">
            2026 Market Pricing Guide & Service Approximations
          </p>
          
          <div className="flex flex-wrap items-center justify-center print:justify-start gap-4 text-xs font-bold text-vforce-navy uppercase tracking-wider mb-6">
            <span className="flex items-center bg-vforce-secondary border border-vforce-border px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-vforce-emerald mr-2" /> CPA Certified Accountants
            </span>
            <span className="flex items-center bg-vforce-secondary border border-vforce-border px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-vforce-emerald mr-2" /> ASIC Registered Agents (Australia)
            </span>
          </div>

          <p className="text-base text-vforce-charcoal font-medium max-w-3xl mx-auto leading-relaxed print:text-sm print:max-w-none">
            This document outlines standard, competitive market rate approximations for professional accounting,
            taxation, and business advisory services within Australia (with benchmarks aligned to regional business hubs
            like Townsville). Rates are structured to support compliant, proactive operational growth under professional
            CPA and ASIC oversight.
          </p>

          {/* Action Tools - Hidden in Print */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 print:hidden">
            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-vforce-border bg-white text-vforce-navy px-6 py-3.5 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print / Save Pricing PDF
            </button>
            <a 
              href="#estimator" 
              className="inline-flex items-center gap-2 bg-vforce-navy-blue text-white px-6 py-3.5 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md"
            >
              <Zap className="w-4 h-4" /> Live Estimate Tool
            </a>
          </div>
        </header>

        {/* Tab Switching Grid - Hidden in Print */}
        <section className="mb-12 print:hidden">
          <div className="flex flex-wrap justify-center gap-2 border-b border-vforce-border pb-4">
            {pricingCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-black text-[11px] tracking-widest uppercase transition-all duration-300 ${
                  activeTab === cat.id 
                    ? 'bg-vforce-navy-blue text-white shadow-md' 
                    : 'bg-white border border-vforce-border text-vforce-charcoal hover:text-vforce-navy hover:bg-vforce-secondary'
                }`}
              >
                {React.createElement(cat.icon, { className: 'w-4 h-4' })}
                {cat.title}
              </button>
            ))}
          </div>
        </section>

        {/* Standard Web View Grid - Hidden in Print */}
        <section className="mb-20 print:hidden">
          <div className="bg-white border border-vforce-border rounded-[3rem] p-8 md:p-14 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-vforce-emerald/5 rounded-bl-[10rem] pointer-events-none"></div>
            
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-vforce-border pb-8">
              <div>
                <span className="text-[10px] font-black text-vforce-emerald tracking-[0.4em] uppercase mb-2 block">{currentCategory.subtitle}</span>
                <h2 className="text-3xl font-black text-vforce-navy italic uppercase font-heading">{currentCategory.title}</h2>
              </div>
              <div className="flex items-center gap-2 bg-vforce-secondary border border-vforce-border px-4 py-2 rounded-xl text-[10px] font-black text-vforce-charcoal tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4 text-vforce-emerald" /> ATO & ASIC Aligned
              </div>
            </header>

            <div className="space-y-8">
              {currentCategory.services.map((service, idx) => (
                <div 
                  key={idx} 
                  className="group relative border border-vforce-border bg-vforce-secondary hover:bg-white hover:border-vforce-emerald rounded-[2rem] p-8 md:p-10 transition-all duration-500 flex flex-col lg:flex-row justify-between lg:items-center gap-8"
                >
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-black text-vforce-navy uppercase italic font-heading">{service.name}</h3>
                      <span className="bg-vforce-emerald/10 border border-vforce-emerald/20 text-vforce-emerald text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>
                    <p className="text-vforce-charcoal font-medium text-[14px] leading-relaxed whitespace-pre-line">{service.scope}</p>
                  </div>
                  
                  <div className="lg:text-right shrink-0 border-t lg:border-t-0 border-vforce-border pt-6 lg:pt-0 flex flex-col justify-between items-start lg:items-end gap-2">
                    <span className="text-[10px] font-black text-vforce-charcoal tracking-wider uppercase">{service.type}</span>
                    <span className="text-3xl font-black text-vforce-emerald italic font-heading tracking-tight">{service.fee}</span>
                    <button 
                      onClick={() => toggleService(service.name)}
                      className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-black text-[9px] tracking-widest uppercase transition-all duration-300 ${
                        selectedServices.includes(service.name)
                          ? 'bg-vforce-emerald text-white'
                          : 'bg-white border border-vforce-border text-vforce-navy hover:bg-slate-50'
                      }`}
                    >
                      {selectedServices.includes(service.name) ? (
                        <>Selected <CheckSquare className="w-3.5 h-3.5" /></>
                      ) : (
                        <>Add to Estimate <Square className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINT ONLY VIEW - Full Document Matching User Page Structure */}
        <div className="absolute -z-10 opacity-0 pointer-events-none h-0 overflow-hidden print:static print:z-0 print:opacity-100 print:pointer-events-auto print:h-auto print:overflow-visible print:block font-inter text-slate-800">
          
          {pricingCategories.map((cat, catIdx) => (
            <div key={cat.id} className="mb-8 avoid-break-inside">
              <h2 className="text-md font-bold uppercase tracking-wider text-vforce-navy-blue border-b-2 border-vforce-navy-blue pb-1 mb-4 flex justify-between">
                <span>{cat.title} & Basic Strategy</span>
                <span className="text-[10px] text-slate-500 font-normal">Section {catIdx + 1} of 5</span>
              </h2>

              <table className="w-full text-left border-collapse text-xs mb-6">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500 uppercase tracking-widest text-[9px] font-bold">
                    <th className="py-2 w-2/3">Service Details & Scope</th>
                    <th className="py-2 w-1/3 text-right">Market Approximation</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.services.map((service, sIdx) => (
                    <tr key={sIdx} className="border-b border-slate-100 align-top">
                      <td className="py-3 pr-8">
                        <strong className="text-vforce-navy-blue text-sm uppercase block mb-1">{service.name}</strong>
                        <p className="text-slate-600 leading-relaxed font-normal text-[11px]">{service.scope}</p>
                      </td>
                      <td className="py-3 text-right">
                        <div className="font-bold text-sm text-emerald-700">{service.fee}</div>
                        <span className="text-[9px] text-slate-500 block mt-1 uppercase tracking-wider">{service.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Print Footer Details */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed">
            <p className="mb-4">
              <strong>Important Reference Notice:</strong> All figures supplied are market approximations based on industry-standard fee guides observed
              among CPA certified and registered tax agents across Australia for the 2025/2026 financial cycles. Actual quotes will vary
              depending on data cleanliness, annual operational turnovers, and transactions volume.
            </p>
            <p className="mb-6">
              Identity details (such as your specific TFN or ABN credentials) must remain private; individual actual scope of work will require
              validation via standard firm letter of engagement.
            </p>
            <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-wider">
              <span>V-Force Tax Agent Pricing Benchmarks • Confidential</span>
              <span>Page 1 of 1</span>
            </div>
          </footer>
        </div>

        {/* Live Estimator Interactive Calculator - Hidden in Print */}
        <section id="estimator" className="mb-20 print:hidden scroll-mt-24">
          <div className="bg-vforce-navy text-white rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-vforce-emerald/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="lg:col-span-7">
                <span className="text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Interactive Calculator</span>
                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-6 font-heading text-white">
                  Estimate Your <span className="text-vforce-emerald">Service Package.</span>
                </h2>
                <p className="text-slate-300 font-bold text-sm mb-10 leading-relaxed max-w-lg">
                  Select the tax returns, structure registrations, or accounting services you require below. Our smart calculator will dynamically model your benchmark fee approximations.
                </p>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-4 border-r border-white/10 custom-scrollbar">
                  {pricingCategories.map(cat => (
                    <div key={cat.id} className="space-y-2">
                      <div className="text-[10px] font-black text-vforce-emerald tracking-widest uppercase mb-1">{cat.title}</div>
                      {cat.services.map((service, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => toggleService(service.name)}
                          className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                            selectedServices.includes(service.name)
                              ? 'bg-vforce-emerald/20 border-vforce-emerald text-white'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="shrink-0">
                              {selectedServices.includes(service.name) ? (
                                <CheckSquare className="w-5 h-5 text-vforce-emerald" />
                              ) : (
                                <Square className="w-5 h-5 text-white/30" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-xs uppercase tracking-tight">{service.name}</div>
                              <div className="text-[9px] opacity-80 uppercase tracking-widest mt-0.5">{service.type}</div>
                            </div>
                          </div>
                          <span className="font-black text-sm text-vforce-emerald tracking-tight italic shrink-0">{service.fee}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator Summary Column */}
              <div className="lg:col-span-5">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 text-center">
                  <Calculator className="w-12 h-12 text-vforce-emerald mx-auto mb-6" />
                  
                  {selectedServices.length === 0 ? (
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-white">No Services Selected</h4>
                      <p className="text-slate-400 font-bold text-xs leading-relaxed mb-6">
                        Click &ldquo;Add to Estimate&rdquo; on any service cards above to dynamically estimate your benchmark rates.
                      </p>
                      
                      <button 
                        onClick={handlePrint}
                        className="w-full mb-6 bg-white/10 text-white border border-white/10 hover:bg-white/20 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2 print:hidden"
                      >
                        <Printer className="w-3.5 h-3.5 text-vforce-emerald" /> Print / Save Full Pricing Guide
                      </button>

                      <div className="h-[2px] bg-white/10 w-full mb-6"></div>
                      
                      <div className="mb-6">
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mb-1">CPA BENCHMARK APPROXIMATION</span>
                        <span className="text-4xl font-black text-slate-500 italic font-heading tracking-tight">$0.00</span>
                      </div>

                      <div className="text-left bg-white/5 border border-white/5 p-4 rounded-xl text-[9px] text-slate-400 leading-normal font-medium">
                        <strong className="text-slate-300 block mb-1 uppercase tracking-wider">Important Reference Notice</strong>
                        All figures supplied are market approximations based on industry-standard fee guides observed among CPA certified and registered tax agents across Australia for the 2025/2026 financial cycles. Actual quotes will vary depending on data cleanliness, annual operational turnovers, and transactions volume.
                        <br /><br />
                        Identity details (such as your specific TFN or ABN credentials) must remain private; individual actual scope of work will require validation via standard firm letter of engagement.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2 text-white">Estimate Summary</h4>
                      <p className="text-[10px] text-vforce-emerald font-black uppercase tracking-widest mb-6">
                        {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
                      </p>
                      
                      <div className="space-y-2 mb-6 max-h-[120px] overflow-y-auto pr-2 text-left">
                        {selectedServices.map(name => (
                          <div key={name} className="flex justify-between items-center text-[10px] font-bold text-slate-300 border-b border-white/5 pb-2">
                            <span className="truncate pr-4 uppercase">{name}</span>
                            <span className="text-vforce-emerald shrink-0">Selected</span>
                          </div>
                        ))}
                      </div>

                      <div className="h-[2px] bg-white/10 w-full mb-6"></div>
                      
                      <div className="mb-8">
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mb-1">CPA BENCHMARK APPROXIMATION</span>
                        <span className="text-4xl md:text-5xl font-black text-vforce-emerald italic font-heading tracking-tight">
                          ${minTotal} – ${maxTotal}+
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex gap-4">
                          <button 
                            onClick={clearCalculator}
                            className="flex items-center justify-center border border-white/20 hover:bg-white/10 text-white p-4 rounded-xl transition-all"
                            title="Reset selections"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <Link 
                            href="/booking" 
                            className="flex-grow bg-vforce-emerald text-white text-center py-4 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-emerald-500 hover:scale-105 transition-all shadow-md"
                          >
                            Lock in consultation
                          </Link>
                        </div>
                        <button 
                          onClick={handlePrint}
                          className="w-full bg-white/10 text-white border border-white/10 hover:bg-white/20 py-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2 print:hidden"
                        >
                          <Printer className="w-3.5 h-3.5 text-vforce-emerald" /> Print / Save PDF Guide
                        </button>
                      </div>

                      <div className="text-left bg-white/5 border border-white/5 p-4 rounded-xl text-[9px] text-slate-400 leading-normal font-medium mt-6">
                        <strong className="text-slate-300 block mb-1 uppercase tracking-wider">Important Reference Notice</strong>
                        All figures supplied are market approximations based on industry-standard fee guides observed among CPA certified and registered tax agents across Australia for the 2025/2026 financial cycles. Actual quotes will vary depending on data cleanliness, annual operational turnovers, and transactions volume.
                        <br /><br />
                        Identity details (such as your specific TFN or ABN credentials) must remain private; individual actual scope of work will require validation via standard firm letter of engagement.
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Reference Notice Box - Hidden in Print */}
        <section className="bg-vforce-secondary border border-vforce-border rounded-[3rem] p-10 md:p-14 print:hidden">
          <h3 className="text-vforce-navy font-black text-xl italic tracking-tighter uppercase mb-4">Important Reference Notice</h3>
          <p className="text-vforce-charcoal font-medium text-xs leading-relaxed mb-4">
            All figures supplied are market approximations based on industry-standard fee guides observed
            among CPA certified and registered tax agents across Australia for the 2025/2026 financial cycles. Actual quotes will vary
            depending on data cleanliness, annual operational turnovers, and transactions volume.
          </p>
          <p className="text-vforce-charcoal font-medium text-xs leading-relaxed">
            Identity details (such as your specific TFN or ABN credentials) must remain private; individual actual scope of work will require
            validation via standard firm letter of engagement.
          </p>
        </section>

      </div>
    </div>
  );
}
