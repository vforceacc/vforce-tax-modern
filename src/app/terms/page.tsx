import React from 'react';

export const metadata = {
  title: 'Terms of Service | V-Force Tax',
};

export default function TermsPage() {
  return (
    <div className="bg-vforce-primary min-h-screen pt-48 pb-32 text-vforce-charcoal">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl lg:text-6xl font-black text-vforce-navy italic tracking-tighter mb-8 uppercase font-heading">Terms of <span className="text-vforce-emerald">Service.</span></h1>
        <div className="prose max-w-none text-vforce-charcoal">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Welcome to V-Force Tax. By accessing our website, you agree to these terms of service.</p>
          <h2 className="text-vforce-navy text-2xl font-bold mt-8 mb-4">1. General Terms</h2>
          <p>The content of this website is for your general information and use only. It is subject to change without notice.</p>
          <h2 className="text-vforce-navy text-2xl font-bold mt-8 mb-4">2. Professional Advice</h2>
          <p>Information provided on this website does not constitute financial, legal, or professional advice. Please consult with our CPAs directly for tailored advice.</p>
          <h2 className="text-vforce-navy text-2xl font-bold mt-8 mb-4">3. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Queensland, Australia.</p>
        </div>
      </div>
    </div>
  );
}
