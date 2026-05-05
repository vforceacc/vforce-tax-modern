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
        'vforce-dark': '#0a0f1e',
        'vforce-dark-alt': '#0f1629',
        'vforce-green': '#39d237',
        'vforce-yellow': '#fed03a',
      },
      boxShadow: {
        '3xl': '0 0 120px -30px rgba(57, 210, 55, 0.4)',
      }
    },
  },
  plugins: [],
};

export default config;
