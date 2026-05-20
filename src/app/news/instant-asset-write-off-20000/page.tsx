import Link from 'next/link';

export const metadata = {
  title: 'Small Business Support: $20,000 Instant Asset Write-off | V-Force Tax',
  description: 'Learn how small businesses in Townsville can utilise the permanent $20,000 instant asset write-off to improve cashflow, deduct eligible depreciating assets, and reduce tax bills.',
  keywords: [
    'instant asset write-off 2026', 'small business tax deductions Australia', 'best accountant Townsville',
    'Townsville business tax agent', 'depreciating assets simplified depreciation', 'V-Force Tax'
  ],
};

export default function InstantAssetWriteOffArticle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Small Business Support: $20,000 Instant Asset Write-off',
    description: 'A comprehensive guide to the permanent $20,000 instant asset write-off for Australian small businesses, including eligibility, pooling, and cashflow benefits.',
    datePublished: '2026-05-18T09:00:00+10:00',
    dateModified: '2026-05-18T09:00:00+10:00',
    author: [{
      '@type': 'Organization',
      name: 'V-Force Tax',
      url: 'https://vforcetax.com.au'
    }],
    publisher: {
      '@type': 'Organization',
      name: 'V-Force Tax',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vforcetax.com.au/favicon.ico'
      }
    }
  };

  const checklistItems = [
    'Confirm your aggregated annual turnover is less than $10 million',
    'Identify eligible depreciating assets costing less than $20,000 each',
    'Ensure assets are first used or installed ready for use within the income year',
    'Track second element costs incurred on previously written-off assets',
    'Calculate simplified depreciation pool details for assets costing $20,000 or more',
    'Review pool balances below $20,000 at the end of the income year for a full write-off',
    'Speak with a registered tax agent to prep and lodge your return correctly'
  ];

  return (
    <article className="min-h-screen pt-12 md:pt-32 pb-20 relative z-10 overflow-hidden selection:bg-vforce-emerald selection:text-white">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-vforce-emerald/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-vforce-emerald/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm font-inter">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-vforce-emerald bg-vforce-emerald/10 px-3 py-1 rounded-full border border-vforce-emerald/20 font-medium text-xs">Tax Updates</span>
              <span className="text-vforce-charcoal">May 18, 2026</span>
              <span className="text-vforce-charcoal">5 min read</span>
            </div>
            <Link href="/news" className="inline-flex items-center text-vforce-charcoal hover:text-vforce-emerald transition-colors duration-300 font-inter font-medium relative z-20">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-8 leading-tight text-vforce-navy">
            Small Business Support: <span className="text-vforce-emerald">$20,000 Instant Asset Write-off</span>
          </h1>
          <p className="text-xl text-vforce-charcoal font-inter leading-relaxed">
            Running a small business in Australia is hard work, and maintaining healthy cashflow is key to survival. In a massive win for business owners, the Government announced as part of the 2026-27 Budget that it will permanently increase the instant asset write-off to $20,000. This permanent rule replaces the temporary extensions of previous years, giving small businesses the certainty they need to invest and grow.
          </p>
        </header>

        {/* Quick-win stats banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '💰', label: 'Write-off Limit', value: '$20,000', sub: 'Per eligible asset' },
            { icon: '📈', label: 'Turnover Limit', value: '< $10 Million', sub: 'Aggregated turnover' },
            { icon: '📅', label: 'Start Date', value: '1 July 2026', sub: 'Permanent measure' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-vforce-secondary border border-vforce-border p-6 flex flex-col items-center text-center">
              <span className="text-3xl mb-2">{stat.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-vforce-charcoal font-inter mb-1">{stat.label}</span>
              <span className="text-2xl font-black font-outfit text-vforce-emerald">{stat.value}</span>
              <span className="text-xs text-vforce-charcoal font-inter mt-1">{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* Content Body */}
        <div className="font-inter">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 font-bold">⚠️ Notice:</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800 font-medium">
                  This measure is not yet law. However, the Government previously extended the $20,000 instant asset write-off limit for the period 1 July 2025 to 30 June 2026 in the Treasury Laws Amendment (Strengthening Financial Systems and Other Measures) Act 2025, which is now law.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            How the Permanent $20,000 Instant Asset Write-off Works
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Under the newly announced 2026-27 Budget measures, from 1 July 2026, eligible small businesses with an aggregated annual turnover of less than $10 million can immediately deduct the full cost of depreciating assets that cost less than $20,000.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            To qualify for the immediate deduction, the asset must be first used or installed ready for use in your business during the relevant income year. This means you cannot simply buy the asset and leave it in its box: it must be active in your business operations before the end of the financial year.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Crucially, the $20,000 threshold applies on a per asset basis. This means you can purchase and instantly write off multiple eligible assets, greatly reducing your compliance costs and taxable income in one go.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Understanding Second Element Costs
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The write-off rules also extend to what is known as the second element of an asset cost. This covers costs incurred to improve or transport an asset after it is acquired.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Under the simplified depreciation rules, you can deduct an amount included in the second element of an eligible depreciating asset cost if:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-vforce-charcoal text-base md:text-lg">
            <li className="leading-relaxed">You claimed an immediate deduction for the asset under simplified depreciation in a prior income year.</li>
            <li className="leading-relaxed">It is the first amount of second element cost incurred after the end of the income year in which the asset was written off.</li>
            <li className="leading-relaxed">The cost incurred is less than $20,000.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            What Happens to Assets Costing $20,000 or More?
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            If you purchase a depreciating asset valued at $20,000 or more, you cannot write it off instantly. Instead, these assets must be placed into the small business simplified depreciation pool.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Assets inside this pool are depreciated at a rate of:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-vforce-charcoal text-base md:text-lg">
            <li className="leading-relaxed"><strong className="text-vforce-navy font-bold">15%</strong> in the first income year they are added.</li>
            <li className="leading-relaxed"><strong className="text-vforce-navy font-bold">30%</strong> for each subsequent income year.</li>
          </ul>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Additionally, if the total pool balance falls below $20,000 at the end of an income year, the entire remaining pool balance can be written off immediately, providing an extra tax deduction injection.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Suspension of the 5-Year Lockout Rule
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Normally, the tax rules prevent a small business from re-entering the simplified depreciation regime for five years if they choose to opt out. To provide extra support and flexibility, the Government has extended the suspension of these lockout provisions until 30 June 2027.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            This suspension allows businesses to move between simplified depreciation and standard depreciation rules without being locked out, making it much easier to respond to changing market conditions.
          </p>

          {/* User Requested H2 Header */}
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Best Accountant Townsville: Maximising Your Small Business Deductions
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Navigating small business tax rules can be incredibly complex. Knowing which assets qualify, calculating depreciation pools, and managing second element costs requires experienced professional advice. To get the best outcomes for your business, you need the best accountant Townsville has to offer.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            At V-Force Tax, we specialize in helping North Queensland small businesses navigate simplified depreciation, optimize cashflow, and structure asset purchases to maximize immediate tax deductions. We ensure you are claiming every dollar you are entitled to while staying fully compliant with the ATO.
          </p>
        </div>

        {/* Checklist Section */}
        <div className="mt-16 rounded-2xl bg-vforce-secondary border border-vforce-border p-8 md:p-10">
          <h2 className="text-2xl font-bold font-outfit text-vforce-navy mb-2">📋 Small Business Write-off Checklist</h2>
          <p className="text-vforce-charcoal font-inter mb-8 text-sm">Before claiming the instant write-off, verify these requirements:</p>
          <ul className="space-y-3">
            {checklistItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-inter text-vforce-charcoal">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-vforce-emerald/10 border border-vforce-emerald/30 flex items-center justify-center">
                  <svg className="w-3 h-3 text-vforce-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mid-article CTA */}
        <div className="mt-12 rounded-2xl bg-vforce-navy p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-vforce-emerald/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-vforce-emerald font-bold text-xs uppercase tracking-widest font-inter mb-3">Optimize your business tax setup</p>
            <h3 className="text-2xl font-bold font-outfit text-white mb-4">
              Get expert small business tax support in Townsville.
            </h3>
            <p className="text-gray-300 font-inter text-sm leading-relaxed mb-8">
              Want to see how the new permanent $20,000 instant asset write-off fits into your business plan? Have a yarn with our Townsville team to plan your equipment purchases and maximize your deductions.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center px-8 py-4 rounded-full bg-vforce-emerald text-white font-bold font-inter hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm"
            >
              Book My Free 15-Minute Consult
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Strategic Tip & Final CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-vforce-emerald/10 to-transparent border border-vforce-emerald/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-vforce-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold font-outfit text-vforce-navy mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-vforce-emerald shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            V-Force Small Business Tax Tip
          </h3>
          <p className="text-vforce-charcoal font-inter mb-8 leading-relaxed relative z-10">
            Timing is absolutely everything with the instant asset write-off. Buying an asset on 29 June but not installing it until 2 July means you cannot claim the deduction in that financial year. Plan ahead and ensure your assets are physically working or set up before the 30 June deadline to secure your write-off.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link
              href="/booking"
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-vforce-navy-blue text-white font-bold font-inter hover:bg-vforce-navy transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-sm"
            >
              Book a Strategy Session
            </Link>
            <Link
              href="/services"
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-vforce-secondary text-vforce-navy font-bold font-inter border border-vforce-border hover:bg-vforce-primary transition-all duration-300 hover:-translate-y-1 text-sm"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-vforce-border">
          <p className="text-xs font-bold uppercase tracking-widest text-vforce-charcoal font-inter mb-6">Related Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/news/2026-27-tax-reform" className="group rounded-2xl bg-vforce-secondary border border-vforce-border p-6 hover:border-vforce-emerald transition-all duration-300 hover:-translate-y-1">
              <span className="text-vforce-emerald text-xs font-bold uppercase tracking-wider font-inter">Tax Updates</span>
              <h4 className="font-bold font-outfit text-vforce-navy mt-2 mb-2 group-hover:text-vforce-emerald transition-colors text-lg leading-snug">Australian Federal Budget 2026-27: Key Tax Reforms</h4>
              <p className="text-vforce-charcoal text-sm font-inter">Understand how CGT, negative gearing, and the $250 offset will impact your finances.</p>
            </Link>
            <Link href="/news/maximise-tax-return-2025-26" className="group rounded-2xl bg-vforce-secondary border border-vforce-border p-6 hover:border-vforce-emerald transition-all duration-300 hover:-translate-y-1">
              <span className="text-vforce-emerald text-xs font-bold uppercase tracking-wider font-inter">Tax Tips</span>
              <h4 className="font-bold font-outfit text-vforce-navy mt-2 mb-2 group-hover:text-vforce-emerald transition-colors text-lg leading-snug">Maximise Your 2025-26 Tax Return: Your EOFY Preparation Guide</h4>
              <p className="text-vforce-charcoal text-sm font-inter">Your complete 2025-26 tax time preparation guide. Learn how to maximise your refund.</p>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
