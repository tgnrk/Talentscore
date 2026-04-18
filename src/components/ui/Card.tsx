import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div
      className={[
        'rounded-card border border-border bg-card text-text-primary shadow-card transition-shadow duration-200 hover:shadow-md',
        padding ? 'p-5 md:p-6' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
