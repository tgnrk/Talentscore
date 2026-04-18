interface SkillTagProps {
  label: string;
  variant?: 'neutral' | 'success' | 'danger' | 'muted';
  icon?: 'check' | 'x' | 'none';
}

const styles: Record<NonNullable<SkillTagProps['variant']>, string> = {
  neutral: 'bg-slate-100 text-text-primary border-slate-200',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  danger: 'bg-red-50 text-red-800 border-red-200',
  muted: 'bg-slate-50 text-text-secondary border-slate-100',
};

export function SkillTag({
  label,
  variant = 'neutral',
  icon = 'none',
}: SkillTagProps) {
  const prefix =
    icon === 'check' ? '✓ ' : icon === 'x' ? '✗ ' : '';
  return (
    <span
      className={`inline-flex items-center rounded-tag border px-2 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {prefix}
      {label}
    </span>
  );
}
