import { forwardRef } from 'react';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(({ className, children, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={`text-4xl font-bold text-center mb-12 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
