'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
  const baseClasses = 'font-black py-4 px-8 rounded-2xl transition-all duration-300 transform active:scale-95 font-heading tracking-widest uppercase text-[11px]';
  const variantClasses = {
    primary: 'bg-[#39d237] text-[#0a0f1e] hover:bg-white shadow-[0_8px_20px_rgba(57,210,55,0.3)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)] hover:-translate-y-1',
    secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20',
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
