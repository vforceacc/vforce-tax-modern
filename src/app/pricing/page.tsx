'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building, Users, Calculator, TrendingUp, ShieldCheck, 
  CheckCircle2, ChevronDown, RefreshCw, Zap, ArrowRight, Info
} from 'lucide-react';

// Pricing Data
const pricingCategories = [
  {
    id: 'individual',
    title: 'Individual Taxation',
    subtitle: 'PAYG & Personal Strategy',
    icon: Users,
    color: 'from-blue-500/10 to-blue-500/5',
    accent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    services: [
      {
        name: 'Individual Income Tax Returns',
        scope: 'Preparation and lodgement of compliant personal returns, incorporating standard salary/wage inputs, work-related expenses, and basic offsets.',
        fee: 'From $155',
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
    color: 'from-violet-500/10 to-violet-500/5',
    accent: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
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
        scope: 'Complete setup for new ventures, including registration of required tax identity profiles (TFN, ABN, and GST) alongside comprehensive local expert advice.',
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
    color: 'from-emerald-500/10 to-emerald-500/5',
    accent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
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
        scope: 'Comprehensive annual financial statements, corporate tax calculations, franking accounts, trust distribution minutes, and regulatory compliance.',
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
    color: 'from-amber-500/10 to-amber-500/5',
    accent: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
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
        calcMin: 290,
        calcMax: 500
      },
      {
        name: 'Payroll & Returns / Payroll Management',
        scope: 'Accurate, timely payroll returns that keep your business compliant and your employees happy. Full Single Touch Payroll (STP 2.0) tracking and superannuation reconciliation.',
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
    color: 'from-rose-500/10 to-rose-500/5',
    accent: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
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
        scope: 'Detailed analysis of financial data to make informed decisions and achieve long-term corporate stability. We translate complex numbers into actionable insights.',
        fee: '$220 – $350 / Hour',
        type: 'Or fixed project quote',
        badge: 'Strategic Insights',
        calcMin: 440,
        calcMax: 700
      },
      {
        name: 'Business Advisory',
        scope: 'Receive strategic guidance and proactive commercial insights to drive business growth. Long-term planning and expert advice to scale your operations profitably.',
        fee: '$650 – $1,800',
        type: 'Monthly advisor packages',
        badge: 'Elevate Business',
        calcMin: 650,
        calcMax: 1800
      },
      {
        name: 'Audit Support',
        scope: 'Expert audit preparation and direct support services when facing regulatory queries. Stay audit-ready with professional support that keeps you fully compliant with ATO requirements.',
        fee: '$180 – $280 / Hour',
        type: 'Based on engagement complexity',
        badge: 'Audit Ready',
        calcMin: 360,
        calcMax: 560
      }
    ]
  }
];

// All services flat list for the estimator
const allServices = pricingCategories.flatMap(cat => 
  cat.services.map(s => ({ ...s, categoryId: cat.id, categoryTitle: cat.title }))
);

export default function PricingPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['individual']);

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(name => name !== serviceName) 
        : [...prev, serviceName]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearCalculator = () => setSelectedServices([]);

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
  const hasSelections = selectedServices.length > 0;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-vforce-primary min-h-screen pt-28 md:pt-40 pb-20 relative overflow-x-hidden">
      
      {/* Decorative ambient */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-vforce-emerald/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-vforce-emerald/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10">
        
        {/* ── Page Header ── */}
        <header className="mb-14 text-center border-b border-vforce-border pb-12">
          <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.4em] uppercase text-[10px] mb-6">
            <span className="w-8 h-[1px] bg-vforce-emerald mr-4" />
            2026 Service Approximations
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter mb-4 uppercase leading-none font-heading">
            Accounting &amp; Tax <span className="text-vforce-emerald">Pricing.</span>
          </h1>
          <p className="text-base text-vforce-charcoal font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Explore our transparent market rate approximations and build your own service estimate below.
            All figures are indicative — we&apos;ll provide a tailored quote at your consultation.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <Image
              src="/badge-cpa.png"
              alt="CPA Australia"
              width={180}
              height={90}
              className="h-11 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/badge-tpb-xero.png"
              alt="TPB Registered & Xero Certified Advisor"
              width={330}
              height={90}
              className="h-11 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* CTA strip */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 bg-vforce-navy-blue text-white px-6 py-3.5 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md"
            >
              <Zap className="w-4 h-4" /> Build My Estimate
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 border border-vforce-border bg-white text-vforce-navy px-6 py-3.5 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-slate-50 transition-all shadow-sm"
            >
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* ── Main two-column layout ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT — Service Categories (Accordion) */}
          <div className="lg:col-span-7 space-y-4">
            {pricingCategories.map(cat => {
              const isOpen = expandedCategories.includes(cat.id);
              const Icon = cat.icon;
              const selectedInCat = cat.services.filter(s => selectedServices.includes(s.name)).length;

              return (
                <div
                  key={cat.id}
                  className="bg-white border border-vforce-border rounded-[2rem] overflow-hidden shadow-sm transition-all duration-300"
                >
                  {/* Category Header — clickable */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-5 hover:bg-vforce-secondary transition-colors text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${cat.accent}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-vforce-charcoal tracking-[0.3em] uppercase mb-0.5">{cat.subtitle}</div>
                        <h2 className="text-base font-black text-vforce-navy uppercase font-heading leading-tight">{cat.title}</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {selectedInCat > 0 && (
                        <span className="bg-vforce-emerald text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide">
                          {selectedInCat} added
                        </span>
                      )}
                      <ChevronDown className={`w-5 h-5 text-vforce-charcoal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Services List */}
                  {isOpen && (
                    <div className="border-t border-vforce-border divide-y divide-vforce-border">
                      {cat.services.map((service, idx) => {
                        const isSelected = selectedServices.includes(service.name);
                        return (
                          <div
                            key={idx}
                            className={`px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                              isSelected ? 'bg-vforce-emerald/5' : 'hover:bg-vforce-secondary'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <h3 className="text-sm font-black text-vforce-navy uppercase font-heading">{service.name}</h3>
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${cat.accent}`}>
                                  {service.badge}
                                </span>
                              </div>
                              <p className="text-[12px] text-vforce-charcoal font-medium leading-relaxed">{service.scope}</p>
                              <div className="mt-2 text-[10px] text-vforce-charcoal/60 font-bold uppercase tracking-wider">{service.type}</div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-2 shrink-0 sm:min-w-[130px]">
                              <span className="text-xl font-black text-vforce-emerald italic font-heading tracking-tight">{service.fee}</span>
                              <button
                                onClick={() => toggleService(service.name)}
                                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-black text-[10px] tracking-widest uppercase transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-vforce-emerald text-white shadow-sm'
                                    : 'bg-white border border-vforce-border text-vforce-navy hover:bg-slate-50 hover:border-vforce-emerald'
                                }`}
                              >
                                {isSelected ? (
                                  <><CheckCircle2 className="w-3.5 h-3.5" /> Added</>
                                ) : (
                                  <>+ Add to Estimate</>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Disclaimer */}
            <div className="flex items-start gap-3 bg-white border border-vforce-border rounded-2xl px-6 py-4 text-[11px] text-vforce-charcoal font-medium leading-relaxed">
              <Info className="w-4 h-4 text-vforce-emerald shrink-0 mt-0.5" />
              <span>
                All figures are <strong>market approximations</strong> benchmarked to CPA Australia fee guides for the 2025/26 financial year.
                Actual fees vary based on data quality, operational volume, and complexity. A formal engagement letter will be provided before any work commences.
              </span>
            </div>
          </div>

          {/* RIGHT — Live Estimator (sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32" id="estimator">
            <div className="bg-vforce-navy text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-vforce-emerald/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-vforce-emerald/20 border border-vforce-emerald/30 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-vforce-emerald" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-vforce-emerald tracking-[0.35em] uppercase">Live Estimation Tool</div>
                    <h2 className="text-lg font-black uppercase italic tracking-tighter font-heading text-white">Your Service Estimate</h2>
                  </div>
                </div>

                {/* Empty state */}
                {!hasSelections && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-7 h-7 text-vforce-emerald" />
                    </div>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed mb-2">
                      Select services from the list to build your estimate.
                    </p>
                    <p className="text-slate-500 text-[11px] font-medium">
                      Prices update instantly as you choose.
                    </p>
                  </div>
                )}

                {/* Selected services list */}
                {hasSelections && (
                  <div className="space-y-2 mb-5 max-h-[220px] overflow-y-auto pr-1">
                    {selectedServices.map(name => {
                      const service = allServices.find(s => s.name === name);
                      return (
                        <div key={name} className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-white uppercase tracking-tight truncate">{name}</div>
                            <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">{service?.categoryTitle}</div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-vforce-emerald font-black text-xs italic">{service?.fee}</span>
                            <button
                              onClick={() => toggleService(name)}
                              className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-white/10 mb-5" />

                {/* Total */}
                <div className="mb-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Estimated Range
                  </div>
                  {hasSelections ? (
                    <div className="text-4xl font-black text-vforce-emerald italic font-heading tracking-tight">
                      {formatCurrency(minTotal)} – {formatCurrency(maxTotal)}+
                    </div>
                  ) : (
                    <div className="text-4xl font-black text-slate-600 italic font-heading tracking-tight">
                      $0
                    </div>
                  )}
                  <div className="text-[10px] text-slate-500 font-medium mt-1">
                    Indicative only — subject to formal engagement
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="/booking"
                    className="w-full bg-vforce-emerald text-white text-center py-4 rounded-xl font-black text-[11px] tracking-widest uppercase hover:bg-emerald-500 hover:scale-[1.02] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Book a Consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  {hasSelections && (
                    <button
                      onClick={clearCalculator}
                      className="w-full flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-slate-400 hover:text-white py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Clear Estimate
                    </button>
                  )}
                </div>

                {/* Notice */}
                <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 text-[10px] text-slate-400 leading-relaxed font-medium">
                  <strong className="text-slate-300 block mb-1 uppercase tracking-wider">Estimation Notice</strong>
                  These ranges are indicative benchmarks based on CPA Australia fee guides for 2025/26. Actual fees depend on the complexity and volume of your work. A formal quote will be provided in your engagement letter.
                </div>
              </div>
            </div>

            {/* Contact nudge */}
            <div className="mt-4 bg-white border border-vforce-border rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black text-vforce-navy uppercase tracking-tight">Not sure what you need?</div>
                <div className="text-[11px] text-vforce-charcoal font-medium">We&apos;ll help you figure it out — no obligation.</div>
              </div>
              <Link href="/contact" className="shrink-0 bg-vforce-navy text-white px-4 py-2.5 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-vforce-navy-blue transition-all">
                Get in touch
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
