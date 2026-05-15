import Link from 'next/link';

export const metadata = {
  title: 'News & Insights | V-Force Tax | Townsville',
  description: 'Stay updated with the latest tax news, prep tips, and strategic financial advice from V-Force Tax.',
};

const newsArticles = [
  {
    slug: 'federal-budget-2026-property-investors',
    title: 'Federal Budget 2026: What Property Investors Must Do Now',
    excerpt: 'Negative gearing and CGT rules change from 1 July 2027. Understand which properties are grandfathered, why valuations are now critical, and the action window closing fast.',
    date: 'May 14, 2026',
    category: 'Property Investment',
    readTime: '6 min read',
  },
  {
    slug: '2026-27-tax-reform',
    title: 'Australian Federal Budget 2026-27: Key Tax Reforms',
    excerpt: 'Discover how the newly announced budget reforms, including changes to CGT and Negative Gearing, will affect you and your business.',
    date: 'May 12, 2026',
    category: 'Tax Updates',
    readTime: '4 min read',
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen pt-48 pb-20 relative z-10 overflow-hidden bg-vforce-primary">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-vforce-emerald/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-vforce-emerald/10 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6 text-vforce-navy">
            News & <span className="text-vforce-emerald">Insights</span>
          </h1>
          <p className="text-lg text-vforce-charcoal font-inter">
            Expert tax tips, strategic financial advice, and the latest updates to help you navigate your financial journey with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group h-full">
              <article className="flex flex-col h-full rounded-2xl bg-vforce-secondary border border-vforce-border p-8 transition-all duration-300 hover:border-vforce-emerald hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-vforce-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm font-inter text-vforce-charcoal">
                  <span className="text-vforce-emerald bg-vforce-emerald/10 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{article.category}</span>
                  <span className="text-xs whitespace-nowrap">{article.date}</span>
                  <span className="text-xs whitespace-nowrap">{article.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold font-outfit mb-4 text-vforce-navy group-hover:text-vforce-emerald transition-colors duration-300">
                  {article.title}
                </h2>
                
                <p className="text-vforce-charcoal font-inter mb-8 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-vforce-emerald font-medium font-inter group-hover:translate-x-2 transition-transform duration-300">
                  Read Article
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
