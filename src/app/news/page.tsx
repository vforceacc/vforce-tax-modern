import Link from 'next/link';

export const metadata = {
  title: 'News & Insights | V-Force Tax | Townsville',
  description: 'Stay updated with the latest tax news, prep tips, and strategic financial advice from V-Force Tax.',
};

const newsArticles = [
  {
    slug: '2026-27-tax-reform',
    title: 'Australian Federal Budget 2026-27: Key Tax Reforms',
    excerpt: 'Discover how the newly announced budget reforms, including changes to CGT and Negative Gearing, will affect you and your business.',
    date: 'May 12, 2026',
    category: 'Tax Updates',
    readTime: '4 min read',
  },
  // Future articles can be added here
];

export default function NewsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#39d237]/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#1e4b25]/20 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-6">
            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39d237] to-[#24a022]">Insights</span>
          </h1>
          <p className="text-lg text-gray-400 font-inter">
            Expert tax tips, strategic financial advice, and the latest updates to help you navigate your financial journey with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group h-full">
              <article className="flex flex-col h-full rounded-2xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#39d237]/10 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#39d237]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4 text-sm font-inter text-gray-400">
                  <span className="text-[#39d237] bg-[#39d237]/10 px-3 py-1 rounded-full">{article.category}</span>
                  <div className="flex items-center gap-4">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold font-outfit mb-4 group-hover:text-[#39d237] transition-colors duration-300">
                  {article.title}
                </h2>
                
                <p className="text-gray-400 font-inter mb-8 flex-grow">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-[#39d237] font-medium font-inter group-hover:translate-x-2 transition-transform duration-300">
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
