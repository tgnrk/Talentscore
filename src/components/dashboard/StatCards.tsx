import { Card } from '../ui/Card';
import type { Candidate } from '../../types';
import { average } from '../../utils/helpers';
import { Users, TrendingUp, Sparkles, Crown } from 'lucide-react';

interface StatCardsProps {
  candidates: Candidate[];
}

export function StatCards({ candidates }: StatCardsProps) {
  const total = candidates.length;
  const avg = average(candidates.map((c) => c.score));
  const strong = candidates.filter((c) => c.verdict === 'STRONG_YES').length;
  const top = [...candidates].sort((a, b) => b.score - a.score)[0];

  const items = [
    {
      label: 'Total candidates',
      value: String(total),
      sub: 'In this role pipeline',
      icon: Users,
      accent: 'text-accent',
      bg: 'bg-blue-50',
    },
    {
      label: 'Average score',
      value: `${Math.round(avg)}`,
      sub: 'Weighted fit index',
      icon: TrendingUp,
      accent: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Strong matches',
      value: String(strong),
      sub: 'Strong “yes” verdicts',
      icon: Sparkles,
      accent: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Top candidate',
      value: top?.name ?? '—',
      sub: top ? `${top.score} overall` : 'Upload to populate',
      icon: Crown,
      accent: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">{item.sub}</p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon className={`h-5 w-5 ${item.accent}`} strokeWidth={2} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
