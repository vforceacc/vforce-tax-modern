import Link from 'next/link';

export const metadata = {
  title: 'Federal Budget 2026: What Property Investors Must Do Now | V-Force Tax',
  description: 'The 2026 Federal Budget reshapes negative gearing and CGT for property investors from 1 July 2027. Here\'s what it means for your portfolio and what action to take before the rules change.',
};

export default function PropertyInvestorBudgetArticle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Federal Budget 2026: What Property Investors Must Do Now',
    description: 'The 2026 Federal Budget reshapes negative gearing and CGT for property investors from 1 July 2027. Here\'s what it means for your portfolio and what action to take before the rules change.',
    datePublished: '2026-05-14T08:00:00+10:00',
    dateModified: '2026-05-14T08:00:00+10:00',
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
    <article className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden selection:bg-[#39d237] selection:text-[#0a0f1e]">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#39d237]/5 blur-[120px]" />
        <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#39d237]/3 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Back link */}
        <Link href="/news" className="inline-flex items-center text-gray-400 hover:text-[#39d237] transition-colors duration-300 font-inter mb-12">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to News
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6 text-sm font-inter">
            <span className="text-[#39d237] bg-[#39d237]/10 px-3 py-1 rounded-full border border-[#39d237]/20">Property Investment</span>
            <span className="text-gray-400">May 14, 2026</span>
            <span className="text-gray-500">6 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-8 leading-tight">
            Federal Budget 2026: What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39d237] to-[#24a022]">Property Investors</span> Must Do Now
          </h1>
          <p className="text-xl text-gray-300 font-inter leading-relaxed">
            The 2026 Federal Budget has fundamentally redrawn the rules for property investors. From 1 July 2027, negative gearing and Capital Gains Tax concessions change significantly — but the window to act under the current, more favourable rules is still open. Here is what you need to understand, and what to do before the deadline.
          </p>
        </header>

        {/* Content Body */}
        <div className="prose prose-invert prose-lg max-w-none font-inter
          prose-headings:font-outfit prose-headings:font-bold prose-headings:text-white
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/10
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[#39d237]
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-gray-300 prose-ul:mb-6 prose-ol:mb-6
          prose-strong:text-white prose-strong:font-semibold">

          <h2>Negative Gearing: The Rules Are Changing</h2>
          <p>
            For decades, negative gearing has been one of the most powerful levers available to Australian property investors — the ability to offset rental losses directly against salary income. The 2026 Budget fundamentally alters this from <strong>1 July 2027</strong>.
          </p>

          <h3>What the current rules allow</h3>
          <p>
            Under existing law, if your rental expenses exceed your rental income — creating a loss — you can deduct that loss against your wages or other taxable income in the same financial year. This reduces your overall tax bill immediately.
          </p>

          <h3>What changes from 1 July 2027</h3>
          <p>
            Under the new rules, rental losses will generally only be deductible against other <strong>passive income</strong> — such as dividends from shares or profits from other investment properties. If your rental losses exceed your passive income, the excess is <strong>carried forward</strong> to future years rather than offset against wages that year.
          </p>
          <p>
            The critical exception: properties purchased before <strong>7:30 PM AEST on 12 May 2026 (Budget night)</strong> are grandfathered. They retain the current negative gearing treatment for as long as you hold them. If you already own investment properties, your existing deductions are protected.
          </p>
          <p>
            Additionally, <strong>new residential builds</strong> acquired after Budget night will remain eligible for negative gearing against all income types — a deliberate policy decision designed to incentivise housing supply.
          </p>

          <h2>Capital Gains Tax: A New Baseline from 2027</h2>
          <p>
            Alongside the negative gearing changes, the Government is overhauling how Capital Gains Tax is calculated for assets held across the 1 July 2027 boundary.
          </p>

          <h3>The 50% discount is being replaced</h3>
          <p>
            The current 50% CGT discount — available to individuals, trusts, and partnerships who hold an asset for more than 12 months — will be replaced with an <strong>inflation-adjusted cost base indexation model</strong>. Under this system, only your <em>real</em> gain (adjusted for inflation) is taxed, subject to a <strong>minimum 30% tax rate on net capital gains</strong>.
          </p>

          <h3>The market value reset</h3>
          <p>
            For properties held before and sold after 1 July 2027, the ATO is expected to introduce a market value reset mechanism. Investors may be able to use their property's value as at 1 July 2027 as the new cost base for the portion of the gain accrued after that date — or apply an ATO-supported apportionment formula.
          </p>
          <p>
            This is not just an accounting exercise. It has real tax consequences. Investors who do not have a <strong>professional, documented valuation</strong> dated at or before 1 July 2027 may be forced to rely on less favourable ATO default calculations.
          </p>
          <p>
            Critically, gains accrued before 1 July 2027 remain eligible for the existing 50% discount rules — making the valuation date a pivotal milestone to document properly.
          </p>

          <h2>Why Depreciation Schedules Are More Important Than Ever</h2>
          <p>
            Under the new negative gearing framework, the depreciation deductions generated by your property don't disappear — they are <strong>carried forward</strong>. This means your tax depreciation schedule becomes even more strategically important, not less.
          </p>
          <ul>
            <li><strong>Carried-forward losses compound:</strong> High depreciation during ownership increases your carried-forward loss balance, which offsets rental profits or future capital gains when you sell.</li>
            <li><strong>New builds remain fully deductible:</strong> For newly constructed properties — which are exempt from the negative gearing restrictions — depreciation deductions can still be offset against all income, making them highly tax-efficient holdings.</li>
            <li><strong>Division 43 capital works deductions:</strong> These deductions also reduce the cost base of your property, meaning lower capital gains on sale. This interaction between depreciation and CGT planning requires careful modelling.</li>
          </ul>
          <p>
            If you don't currently have a tax depreciation schedule for your investment property, now is the time to get one — before the rules shift and before you need that carried-forward loss balance to be as large as possible.
          </p>

          <h2>The Action Window: What to Do Before 1 July 2027</h2>
          <p>
            The next 14 months represent a critical window. Here is what property investors should be doing right now:
          </p>
          <ul>
            <li><strong>Review your existing portfolio:</strong> Confirm which properties are grandfathered under the old rules. Properties purchased before Budget night (12 May 2026) retain their negative gearing treatment indefinitely — but only if you hold them.</li>
            <li><strong>Commission a professional CGT valuation:</strong> For any investment property you plan to hold past July 2027, a defensible market valuation dated on or before 1 July 2027 will be critical for accurate CGT calculations when you eventually sell.</li>
            <li><strong>Get a tax depreciation schedule:</strong> If you don't have one, get it now. Even under the new carry-forward model, your depreciation balance reduces your future tax liability.</li>
            <li><strong>Model new-build opportunities:</strong> If you're considering expanding your portfolio, new residential builds are exempt from the negative gearing restrictions. These present a strategic opportunity for investors willing to move before the rules lock in.</li>
            <li><strong>Evaluate trust structures:</strong> The new 30% minimum tax on discretionary trust distributions (from 1 July 2028) may also affect how you hold property. A structural review now could save significant tax in future years.</li>
          </ul>

          <h2>The Bottom Line for Townsville Investors</h2>
          <p>
            These are the most significant changes to investment property taxation in a generation. But "significant change" does not mean "the end of property investment." It means the strategy must evolve.
          </p>
          <p>
            Investors who act now — documenting valuations, reviewing their depreciation position, and understanding which properties are grandfathered — will be considerably better placed than those who wait until July 2027 to understand what applies to them.
          </p>
          <p>
            The properties you own today may be your most valuable, precisely because they carry forward the old rules with them.
          </p>

        </div>

        {/* Strategic Hook & CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#39d237]/10 to-transparent border border-[#39d237]/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#39d237]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold font-outfit text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-[#39d237]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            V-Force Tax Strategic Tip
          </h3>
          <p className="text-gray-300 font-inter mb-8 leading-relaxed relative z-10">
            If you own an investment property purchased before 12 May 2026, your negative gearing is protected — but only for as long as you hold it. We recommend scheduling a portfolio review now to model the CGT valuation date, review your depreciation schedule, and assess whether your trust or ownership structure remains optimal under the new rules from July 2028. The window to act strategically is open. Don&apos;t wait until it closes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link
              href="/booking"
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-[#39d237] text-[#0a0f1e] font-bold font-inter hover:bg-[#2fb52d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,210,55,0.4)] hover:-translate-y-1"
            >
              Book a Portfolio Review
            </Link>
            <Link
              href="/services"
              className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-white/5 text-white font-bold font-inter border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-xs text-gray-600 font-inter leading-relaxed border-t border-white/5 pt-8">
          This article is intended as general information only and does not constitute financial or taxation advice. The measures described are subject to the passage of legislation. You should obtain professional advice specific to your individual circumstances before acting on any of the information contained in this article.
        </p>

      </div>
    </article>
  );
}
