import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import type { Candidate, SortColumn } from '../../types';
import { useStore } from '../../store/useStore';
import {
  initials,
  scoreColor,
  verdictLabel,
  verdictStyles,
} from '../../utils/helpers';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CandidateTableProps {
  candidates: Candidate[];
}

function medalForRank(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return String(rank);
}

export function CandidateTable({ candidates }: CandidateTableProps) {
  const sortBy = useStore((s) => s.sortBy);
  const sortDirection = useStore((s) => s.sortDirection);
  const toggleSort = useStore((s) => s.toggleSort);
  const setSelected = useStore((s) => s.setSelectedCandidate);
  const setPage = useStore((s) => s.setPage);
  const removeCandidate = useStore((s) => s.removeCandidate);

  const scoreRankMap = useMemo(() => {
    const sorted = [...candidates].sort((a, b) => b.score - a.score);
    const m = new Map<string, number>();
    sorted.forEach((c, i) => m.set(c.id, i + 1));
    return m;
  }, [candidates]);

  const sorted = useMemo(() => {
    const list = [...candidates];
    const dir = sortDirection === 'asc' ? 1 : -1;
    const cmpStr = (a: string, b: string) => a.localeCompare(b) * dir;
    const cmpNum = (a: number, b: number) => (a - b) * dir;
    list.sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return cmpNum(
            scoreRankMap.get(a.id) ?? 0,
            scoreRankMap.get(b.id) ?? 0,
          );
        case 'name':
          return cmpStr(a.name, b.name);
        case 'score':
          return cmpNum(a.score, b.score);
        case 'skills':
          return cmpNum(a.matchedSkills.length, b.matchedSkills.length);
        case 'experience':
          return cmpNum(a.experienceYears, b.experienceYears);
        case 'verdict': {
          const order: Record<string, number> = {
            STRONG_YES: 4,
            YES: 3,
            MAYBE: 2,
            NO: 1,
          };
          return cmpNum(order[a.verdict], order[b.verdict]);
        }
        default:
          return 0;
      }
    });
    return list;
  }, [candidates, sortBy, sortDirection, scoreRankMap]);

  const HeaderBtn = ({
    column,
    label,
    align = 'left',
  }: {
    column: SortColumn;
    label: string;
    align?: 'left' | 'center' | 'right';
  }) => {
    const active = sortBy === column;
    const alignClass =
      align === 'right'
        ? 'justify-end'
        : align === 'center'
          ? 'justify-center'
          : 'justify-start';
    return (
      <button
        type="button"
        onClick={() => toggleSort(column)}
        className={`flex w-full items-center gap-1 text-xs font-semibold uppercase tracking-wide text-text-muted transition-colors hover:text-text-primary ${alignClass}`}
      >
        {label}
        {active && (
          <span className="text-accent">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="overflow-hidden rounded-card border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50/80">
              <th className="px-4 py-3">
                <HeaderBtn column="rank" label="Rank" />
              </th>
              <th className="px-4 py-3">
                <HeaderBtn column="name" label="Candidate" />
              </th>
              <th className="px-4 py-3">
                <HeaderBtn column="score" label="Score" />
              </th>
              <th className="px-4 py-3">
                <HeaderBtn column="skills" label="Skills" />
              </th>
              <th className="px-4 py-3">
                <HeaderBtn column="experience" label="Experience" />
              </th>
              <th className="px-4 py-3">
                <HeaderBtn column="verdict" label="Verdict" />
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c) => {
              const rank = scoreRankMap.get(c.id) ?? 0;
              const medal = medalForRank(rank);
              const pct = Math.max(0, Math.min(100, c.score));
              return (
                <tr
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(c.id);
                      setPage('candidate');
                    }
                  }}
                  onClick={() => {
                    setSelected(c.id);
                    setPage('candidate');
                  }}
                  className="group cursor-pointer border-b border-border/80 transition-colors duration-150 last:border-b-0 hover:bg-slate-50/90"
                >
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    <span className="inline-flex min-w-[2.5rem] items-center gap-1">
                      {medal}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 text-sm font-bold text-text-primary ring-1 ring-border">
                        {initials(c.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">
                          {c.name}
                        </p>
                        <p className="text-xs text-text-muted">{c.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: scoreColor(c.score),
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold tabular-nums text-text-primary">
                        {c.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    <span className="font-medium tabular-nums text-text-primary">
                      {c.matchedSkills.length}
                    </span>
                    <span className="text-text-muted"> matched</span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      {c.experienceYears} yrs
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={verdictStyles(c.verdict)}>
                      {verdictLabel(c.verdict)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      className="!p-2 text-text-muted hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCandidate(c.id);
                      }}
                      aria-label={`Delete ${c.name}`}
                    >
                      <Trash2 className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
