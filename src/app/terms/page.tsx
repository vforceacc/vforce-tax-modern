import React from 'react';

export const metadata = {
  title: 'Terms of Service | V-Force Tax',
};

export default function TermsPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-48 pb-32 text-slate-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter mb-8 uppercase font-heading">Terms of <span className="text-[#39d237]">Service.</span></h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Welcome to V-Force Tax. By accessing our website, you agree to these terms of service.</p>
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">1. General Terms</h2>
          <p>The content of this website is for your general information and use only. It is subject to change without notice.</p>
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">2. Professional Advice</h2>
          <p>Information provided on this website does not constitute financial, legal, or professional advice. Please consult with our CPAs directly for tailored advice.</p>
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">3. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Queensland, Australia.</p>
        </div>
      </div>
    </div>
  );
}
