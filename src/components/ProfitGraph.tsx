'use client';
import React from 'react';
import { Activity } from 'lucide-react';

export default function ProfitGraph() {
  const pathData = "M 0 80 Q 25 75, 50 50 T 100 20 T 150 40 T 200 10";
  return (
    <div className="relative group w-full max-w-md mx-auto">
      <style>{`
        @keyframes dash-scroll {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
        .animate-dash-scroll {
          animation: dash-scroll 2.5s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 bg-vforce-emerald/10 blur-[80px] rounded-full group-hover:bg-vforce-emerald/20 transition-all duration-1000"></div>
      <div className="relative bg-white/80 backdrop-blur-xl border border-vforce-border rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="text-[10px] font-bold tracking-[0.3em] text-vforce-emerald uppercase mb-1">VForce Analytics</div>
            <h3 className="text-vforce-navy text-2xl font-black italic tracking-tighter">Profit Projection</h3>
          </div>
          <Activity className="w-6 h-6 text-vforce-emerald" />
        </div>
        <div className="h-40 relative flex items-end justify-between px-2 mb-8">
          <svg className="absolute inset-0 w-full h-full text-vforce-emerald" viewBox="0 0 200 100" preserveAspectRatio="none">
            {[20, 50, 80].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="currentColor" strokeOpacity={0.1} />)}
            <path d={pathData} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" className="drop-shadow-[0_0_12px_rgba(5,150,105,0.4)] animate-dash-scroll" strokeDasharray="400" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-12 border-t border-vforce-border pt-6">
          <div>
            <div className="text-[10px] font-bold text-vforce-charcoal uppercase mb-1">Status</div>
            <div className="text-vforce-navy text-xl font-black italic">OPTIMISED</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-vforce-charcoal uppercase mb-1">Projection</div>
            <div className="text-vforce-emerald text-xl font-black italic">ASCENDING</div>
          </div>
        </div>
      </div>
    </div>
  );
}
