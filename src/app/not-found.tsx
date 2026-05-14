import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-vforce-primary min-h-screen text-vforce-charcoal flex flex-col items-center justify-center py-32 px-6 relative overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vforce-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <h1 className="text-[150px] md:text-[250px] font-black text-vforce-navy italic leading-none tracking-tighter opacity-[0.03] select-none absolute">
        404
      </h1>

      <div className="relative z-10">
        <div className="inline-flex items-center text-vforce-emerald font-black tracking-[0.3em] uppercase text-[10px] mb-8">
          <span className="w-8 h-[1px] bg-vforce-emerald mr-4" /> Error Code
        </div>

        <h2 className="text-5xl md:text-8xl font-black text-vforce-navy italic tracking-tighter uppercase mb-10 leading-none font-heading">
          Page <span className="text-vforce-emerald">Missing.</span>
        </h2>

        <p className="text-vforce-charcoal text-lg md:text-xl font-medium max-w-md mx-auto mb-12 leading-relaxed">
          The financial records you&apos;re looking for don&apos;t exist in this sector. Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-block bg-vforce-navy-blue text-white px-12 py-6 rounded-2xl font-black text-[12px] tracking-widest uppercase hover:bg-vforce-navy transition-all shadow-md transform hover:-translate-y-1 active:scale-95 font-heading"
        >
          RETURN TO BASE
        </Link>
      </div>
    </main>
  );
}