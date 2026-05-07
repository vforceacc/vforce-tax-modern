import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-[#0a0f1e] min-h-screen text-white flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39d237]/10 blur-[120px] rounded-full pointer-events-none" />

      <h1 className="text-[150px] md:text-[250px] font-black text-white italic leading-none tracking-tighter opacity-[0.03] select-none absolute">
        404
      </h1>

      <div className="relative z-10">
        <div className="inline-flex items-center text-[#39d237] font-black tracking-[0.3em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-[#39d237] mr-4" /> Error Code
        </div>

        <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-10 leading-none font-heading">
          Page <span className="text-[#39d237]">Missing.</span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-md mx-auto mb-12 leading-relaxed">
          The financial records you&apos;re looking for don&apos;t exist in this sector. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-block bg-[#39d237] text-[#0a0f1e] px-12 py-6 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-white transition-all shadow-[0_8px_30px_rgba(57,210,55,0.3)] transform hover:-translate-y-1 active:scale-95 font-heading"
        >
          RETURN TO BASE
        </Link>
      </div>
    </main>
  );
}