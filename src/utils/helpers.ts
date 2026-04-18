import type { Verdict } from '../types';

const SCORE_GREEN = 80;
const SCORE_AMBER = 60;

export function scoreColor(score: number): string {
  if (score >= SCORE_GREEN) return '#22c55e';
  if (score >= SCORE_AMBER) return '#f59e0b';
  return '#ef4444';
}

export function scoreBgClass(score: number): string {
  if (score >= SCORE_GREEN) return 'bg-emerald-50 text-emerald-800 border-emerald-100';
  if (score >= SCORE_AMBER) return 'bg-amber-50 text-amber-900 border-amber-100';
  return 'bg-red-50 text-red-800 border-red-100';
}

export function verdictLabel(verdict: Verdict): string {
  switch (verdict) {
    case 'STRONG_YES':
      return 'Strong Yes';
    case 'YES':
      return 'Yes';
    case 'MAYBE':
      return 'Maybe';
    case 'NO':
      return 'Pass';
    default:
      return verdict;
  }
}

export function verdictStyles(verdict: Verdict): string {
  switch (verdict) {
    case 'STRONG_YES':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'YES':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'MAYBE':
      return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'NO':
      return 'bg-red-50 text-red-800 border-red-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

export function formatPercent(n: number): string {
  return `${Math.round(n)}%`;
}

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
