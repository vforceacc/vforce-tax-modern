import React from 'react';

export const metadata = {
  title: 'Privacy Policy | V-Force Tax',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen pt-48 pb-32 text-slate-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter mb-8 uppercase font-heading">Privacy <span className="text-[#39d237]">Policy.</span></h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>At V-Force Tax, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information.</p>
          {/* Add full policy text here */}
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you fill out contact forms, use our AI chat widget, or schedule appointments.</p>
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">2. How We Use Information</h2>
          <p>We use the information we collect to provide our accounting and tax advisory services, communicate with you, and improve our website experience.</p>
          <h2 className="text-white text-2xl font-bold mt-8 mb-4">3. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information.</p>
        </div>
      </div>
    </div>
  );
}
