import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-blue-600 shadow-sm border border-transparent',
  secondary:
    'bg-white text-text-primary border border-border hover:bg-slate-50 shadow-sm',
  ghost: 'bg-transparent text-text-secondary hover:bg-slate-100 border border-transparent',
  danger:
    'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-btn px-3.5 py-2 text-sm font-semibold transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
