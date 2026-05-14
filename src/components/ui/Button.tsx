'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
  const baseClasses = 'font-black py-4 px-8 rounded-2xl transition-all duration-300 transform active:scale-95 font-heading tracking-widest uppercase text-[11px]';
  const variantClasses = {
    primary: 'bg-vforce-navy-blue text-white hover:bg-vforce-navy shadow-md hover:-translate-y-1',
    secondary: 'bg-vforce-secondary text-vforce-navy border border-vforce-border hover:bg-vforce-primary',
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
