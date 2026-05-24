import Link from 'next/link';

export const metadata = {
  title: 'Treasurer Challenged on Productivity Impact of CGT Changes | V-Force Tax',
  description: 'Business groups challenge the Treasurer on how proposed Capital Gains Tax (CGT) changes will boost productivity. Learn how to maximise your position with V-Force Tax.',
  keywords: [
    'capital gains tax Australia', 'CGT changes 2026', 'Jim Chalmers CGT',
    'productivity impact CGT', 'business tax Australia', 'maximise tax return',
    'tax planning Townsville', 'V-Force Tax'
  ],
};

export default function ProductivityImpactArticle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Treasurer Challenged on Productivity Impact of CGT Changes',
    description: 'Business groups challenge the Treasurer on how proposed Capital Gains Tax (CGT) changes will boost productivity. Learn what this means for your investments and business.',
    datePublished: '2026-05-24T08:00:00+10:00',
    dateModified: '2026-05-24T08:00:00+10:00',
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
              <span className="text-vforce-charcoal">May 24, 2026</span>
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
            Treasurer Challenged on <span className="text-vforce-emerald">Productivity Impact</span> of CGT Changes
          </h1>
          <p className="text-xl text-vforce-charcoal font-inter leading-relaxed">
            As the federal government rolls out its latest budget, business groups are questioning the Treasurer on how proposed changes to the Capital Gains Tax (CGT) will affect productivity and wage growth. Here is what you need to know and how to maximise your position.
          </p>
        </header>

        {/* Quick-win tips banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: '📉', label: 'CGT Impact', value: 'High', sub: 'Significant reform proposed' },
            { icon: '📊', label: 'Productivity', value: 'Debated', sub: 'Modelling requested' },
            { icon: '💡', label: 'Action Required', value: 'Plan Now', sub: 'Maximise your returns' },
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
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            The Core of the Debate
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Treasurer Jim Chalmers has stated that the federal budget is designed to boost productivity over time. However, business groups have poured water on the government&apos;s claims that its changes to capital gains tax will have this intended effect in the longer term.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            In fact, industry leaders argue that the tax increases could place a significant drag on productivity, which in turn could hurt the chances of meaningful wage growth for Australian workers. As a result, the Treasurer has been asked to release detailed economic modelling showing the expected impacts of these CGT changes.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            What This Means for Investors and Businesses
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Whenever there are significant shifts in the tax landscape, it is critical to stay informed and proactive. The proposed CGT changes could alter the way investors structure their portfolios and how business owners plan for future sales or acquisitions. 
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg font-bold text-vforce-navy">
            Key areas to monitor include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-vforce-charcoal text-base md:text-lg">
            <li className="leading-relaxed">Timing of asset disposals and how to best utilise current discounts.</li>
            <li className="leading-relaxed">Reassessing business structures to ensure they remain tax effective.</li>
            <li className="leading-relaxed">Understanding the grandfathering provisions if existing assets are held.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            How to Maximise Your Position
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Uncertainty around legislation can be challenging, but it also provides a window of opportunity to review your current strategies. At V-Force Tax, we specialise in helping you navigate complex reforms to ensure you always maximise your financial outcomes.
          </p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse rounded-lg overflow-hidden border border-vforce-border">
              <thead>
                <tr className="bg-vforce-secondary text-vforce-navy font-bold">
                  <th className="p-4 border-b border-vforce-border">Strategy</th>
                  <th className="p-4 border-b border-vforce-border">Potential Benefit</th>
                  <th className="p-4 border-b border-vforce-border">Action Required</th>
                </tr>
              </thead>
              <tbody className="text-vforce-charcoal text-sm">
                <tr className="border-b border-vforce-border hover:bg-vforce-secondary/50 transition-colors">
                  <td className="p-4 font-medium">Portfolio Review</td>
                  <td className="p-4">Identify underperforming assets to offset gains.</td>
                  <td className="p-4">Review holdings before the financial year ends.</td>
                </tr>
                <tr className="border-b border-vforce-border hover:bg-vforce-secondary/50 transition-colors">
                  <td className="p-4 font-medium">Restructuring</td>
                  <td className="p-4">Protect assets and improve tax efficiency.</td>
                  <td className="p-4">Consult on trust or company structures.</td>
                </tr>
                <tr className="hover:bg-vforce-secondary/50 transition-colors">
                  <td className="p-4 font-medium">Timing of Sales</td>
                  <td className="p-4">Lock in current CGT discount rates.</td>
                  <td className="p-4">Plan asset sales proactively prior to legislation changes.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            The Bottom Line
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The debate over the productivity impact of the CGT changes will continue to unfold as more modelling is released. While business groups and the Treasurer work through the macroeconomic implications, your focus should be on your personal and business financial health. Being proactive now will save you from unexpected tax bills later.
          </p>
        </div>

        {/* Mid-article CTA */}
        <div className="mt-12 rounded-2xl bg-vforce-navy p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-vforce-emerald/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-vforce-emerald font-bold text-xs uppercase tracking-widest font-inter mb-3">Maximise Your Results</p>
            <h3 className="text-2xl font-bold font-outfit text-white mb-4">
              Need clarity on how these changes affect you?
            </h3>
            <p className="text-gray-300 font-inter text-sm leading-relaxed mb-8">
              Don&apos;t wait for the legislation to pass before you start planning. Get on the front foot and ensure you are maximising your tax position. Our team is ready to provide expert, tailored advice.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center px-8 py-4 rounded-full bg-vforce-emerald text-white font-bold font-inter hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-sm"
            >
              Book a Strategy Session Today
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-vforce-border">
          <p className="text-xs font-bold uppercase tracking-widest text-vforce-charcoal font-inter mb-6">Related Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/news/2026-27-tax-reform" className="group rounded-2xl bg-vforce-secondary border border-vforce-border p-6 hover:border-vforce-emerald transition-all duration-300 hover:-translate-y-1">
              <span className="text-vforce-emerald text-xs font-bold uppercase tracking-wider font-inter">Tax Updates</span>
              <h4 className="font-bold font-outfit text-vforce-navy mt-2 mb-2 group-hover:text-vforce-emerald transition-colors text-lg leading-snug">Australian Federal Budget 2026–27: Key Tax Reforms</h4>
              <p className="text-vforce-charcoal text-sm font-inter">Understand how CGT, negative gearing, and the $250 offset will impact your finances.</p>
            </Link>
            <Link href="/news/maximise-tax-return-2025-26" className="group rounded-2xl bg-vforce-secondary border border-vforce-border p-6 hover:border-vforce-emerald transition-all duration-300 hover:-translate-y-1">
              <span className="text-vforce-emerald text-xs font-bold uppercase tracking-wider font-inter">Tax Tips</span>
              <h4 className="font-bold font-outfit text-vforce-navy mt-2 mb-2 group-hover:text-vforce-emerald transition-colors text-lg leading-snug">Maximise Your 2025–26 Tax Return: Your EOFY Preparation Guide</h4>
              <p className="text-vforce-charcoal text-sm font-inter">Your complete 2025–26 tax time preparation guide covering WFH deductions, vehicle logbooks, and more.</p>
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
