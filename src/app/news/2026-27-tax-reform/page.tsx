import Link from 'next/link';

export const metadata = {
  title: 'Australian Federal Budget 2026-27: Key Tax Reforms | V-Force Tax',
  description: 'Understand the newly announced 2026-27 Australian budget reforms. Learn how changes to CGT, negative gearing, and the $250 offset will impact your finances.',
};

export default function TaxReformArticle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Australian Federal Budget 2026-27: Key Tax Reforms',
    description: 'Understand the newly announced 2026-27 Australian budget reforms. Learn how changes to CGT, negative gearing, and the $250 offset will impact your finances.',
    datePublished: '2026-05-12T08:00:00+10:00',
    dateModified: '2026-05-12T08:00:00+10:00',
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
    <article className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden selection:bg-vforce-emerald selection:text-white">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-vforce-emerald/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between mb-6 text-sm font-inter">
            <div className="flex items-center gap-4">
              <span className="text-vforce-emerald bg-vforce-emerald/10 px-3 py-1 rounded-full border border-vforce-emerald/20">Tax Updates</span>
              <span className="text-vforce-charcoal">May 12, 2026</span>
            </div>
            {/* Back link */}
            <Link href="/news" className="inline-flex items-center text-vforce-charcoal hover:text-vforce-emerald transition-colors duration-300 font-inter font-medium relative z-20">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to News
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-8 leading-tight text-vforce-navy">
            Australian Federal Budget 2026-27: <span className="text-vforce-emerald">Key Tax Reforms</span>
          </h1>
          <p className="text-xl text-vforce-charcoal font-inter leading-relaxed">
            The Government is reforming the tax system to help more Australians realise the dream of home ownership, better encourage productive investment, and help fund a new $250 tax offset for workers. Here is what you need to know.
          </p>
        </header>

        {/* Content Body */}
        {/* Content Body */}
        <div className="font-inter">
          
          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Cutting Taxes for Working Australians
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The Government is introducing a <strong className="text-vforce-navy font-bold">$250 Working Australians Tax Offset</strong> from 2027–28. This will provide an ongoing annual tax cut for over 13 million Australian workers.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            This is in addition to the three tax cuts the Government has already legislated. For an Australian worker on average earnings, the combined benefit of the Government’s five tax cuts could be up to <strong className="text-vforce-navy font-bold">$2,816 per year</strong>.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Capital Gains Tax (CGT) Overhaul
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The Government will replace the 50 per cent Capital Gains Tax discount with a discount based on inflation. Furthermore, a minimum 30 per cent tax on gains will be introduced from 1 July 2027.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            This reform means that investors will only pay tax on their <em>real</em> capital gain. However, investors in new builds will still be able to choose between the existing 50 per cent CGT discount or the new arrangements.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Negative Gearing Limits
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The Government will limit negative gearing to new builds from 1 July 2027, focusing tax support on new supply. Existing arrangements will remain unchanged for all properties held before Budget night.
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            If you buy established housing after Budget night, you will still be able to deduct losses against residential property income. You will be able to carry forward unused losses to future years, but you won’t be able to deduct them against other income like your wages.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Discretionary Trusts Minimum Tax
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            The Government will introduce a minimum tax of 30 per cent on discretionary trusts from 1 July 2028, with some exceptions. Rollover relief will be provided for three years from 1 July 2027 to assist small businesses and others that wish to restructure.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Business Resilience & Asset Write-offs
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-3 text-vforce-charcoal text-base md:text-lg">
            <li className="leading-relaxed"><strong className="text-vforce-navy font-bold">Instant Asset Write-off:</strong> The $20,000 instant asset write-off will be permanently extended from 1 July 2026 for small businesses with turnover up to $10 million.</li>
            <li className="leading-relaxed"><strong className="text-vforce-navy font-bold">Loss Carry Back:</strong> From 2026–27, eligible companies that make a loss can use that loss to get a refund against tax paid in the prior two income years.</li>
            <li className="leading-relaxed"><strong className="text-vforce-navy font-bold">Loss Refundability:</strong> From 2028–29, start-ups in their first two years can get a refund for tax losses, up to the value of fringe benefits tax and withholding tax paid on employee wages.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Research and Development (R&D)
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            From 1 July 2028, the offset for experimental core R&D will increase by around 25 to 50 per cent. The maximum expenditure cap will also increase to $200 million to encourage more R&D onshore.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold font-outfit text-vforce-navy mt-12 mb-6 pb-2 border-b border-vforce-border">
            Simplifying Tax Management
          </h2>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            From 2026–27, a new instant tax deduction of up to $1,000 will simplify work-related expense deductions. 
          </p>
          <p className="text-vforce-charcoal font-inter leading-relaxed mb-6 text-base md:text-lg">
            Additionally, it will be easier for businesses to change their PAYG instalments when conditions change, including opting into monthly instalments from 1 July 2027.
          </p>

        </div>

        {/* Strategic Hook & CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-vforce-emerald/10 to-transparent border border-vforce-emerald/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-vforce-emerald/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold font-outfit text-vforce-navy mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-vforce-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Strategic Tax Tip
          </h3>
          <p className="text-vforce-charcoal font-inter mb-8 leading-relaxed relative z-10">
            With the upcoming limits on negative gearing for established properties taking effect in 2027, now is the crucial window to evaluate your current property portfolio. Restructuring your investments or bringing forward property acquisitions could potentially grandfather your assets under the existing, more favourable rules. Furthermore, businesses should immediately review their capital expenditure plans to maximise the permanent $20,000 instant asset write-off.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link 
              href="/contact" 
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-vforce-navy-blue text-white font-bold font-inter hover:bg-vforce-navy transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              Book a Strategy Session
            </Link>
            <Link 
              href="/services" 
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-vforce-secondary text-vforce-navy font-bold font-inter border border-vforce-border hover:bg-vforce-primary transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
