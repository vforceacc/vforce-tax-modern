import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vforce-dark': '#0a0f1e', // Keeping for backwards compatibility if needed during transition
        'vforce-primary': '#ffffff', // Main background
        'vforce-secondary': '#f8fafc', // Card background (slate-50)
        'vforce-navy': '#0f172a', // Headings / Primary Trust (slate-900)
        'vforce-navy-blue': '#1e3a8a', // Primary Button (blue-900)
        'vforce-charcoal': '#475569', // Body text (slate-600)
        'vforce-emerald': '#059669', // Growth green (emerald-600)
        'vforce-gold': '#d97706', // Modern accents (amber-600)
        'vforce-border': '#e2e8f0', // Soft slate border (slate-200)
      },
      boxShadow: {
        '3xl': '0 20px 40px -15px rgba(15, 23, 42, 0.1)', // Professional soft shadow
      }
    },
  },
  plugins: [],
};

export default config;
