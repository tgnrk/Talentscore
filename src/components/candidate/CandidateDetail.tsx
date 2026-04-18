import { useMemo, useState } from 'react';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { ScoreRing } from './ScoreRing';
import { OverviewTab } from './OverviewTab';
import { SkillsTab } from './SkillsTab';
import { InterviewTab } from './InterviewTab';
import { ProfileTab } from './ProfileTab';
import { initials, verdictLabel, verdictStyles } from '../../utils/helpers';

type TabId = 'overview' | 'skills' | 'interview' | 'profile';

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'skills', label: 'Skills' },
  { id: 'interview', label: 'Interview' },
  { id: 'profile', label: 'Profile' },
];

export function CandidateDetail() {
  const selectedId = useStore((s) => s.selectedCandidateId);
  const candidates = useStore((s) => s.candidates);
  const setPage = useStore((s) => s.setPage);
  const setSelected = useStore((s) => s.setSelectedCandidate);

  const candidate = useMemo(
    () => candidates.find((c) => c.id === selectedId),
    [candidates, selectedId],
  );

  const [tab, setTab] = useState<TabId>('overview');

  if (!candidate) {
    return (
      <div className="page-enter rounded-card border border-border bg-card p-6 shadow-card">
        <p className="text-sm text-text-secondary">
          Candidate not found. Return to the dashboard.
        </p>
        <button
          type="button"
          className="mt-3 text-sm font-semibold text-accent hover:underline"
          onClick={() => setPage('dashboard')}
        >
          ← Back to candidates
        </button>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-4">
      <button
        type="button"
        onClick={() => {
          setSelected(null);
          setPage('dashboard');
        }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to candidates
      </button>

      <Card>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white shadow-sm">
              {initials(candidate.name)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary">
                  {candidate.name}
                </h1>
                <Badge className={verdictStyles(candidate.verdict)}>
                  {verdictLabel(candidate.verdict)}
                </Badge>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" strokeWidth={2} />
                  {candidate.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  {candidate.email}
                </span>
                <span className="font-semibold text-text-primary">
                  {candidate.experienceYears}+ years experience
                </span>
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
                {candidate.summary}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-2">
            <ScoreRing value={candidate.score} label="Overall match" size="lg" />
            <p className="text-xs font-semibold text-text-muted">
              Calibrated to your job brief
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-slate-50 text-text-secondary hover:bg-slate-100',
                  ].join(' ')}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {tab === 'overview' ? <OverviewTab candidate={candidate} /> : null}
      {tab === 'skills' ? <SkillsTab candidate={candidate} /> : null}
      {tab === 'interview' ? <InterviewTab candidate={candidate} /> : null}
      {tab === 'profile' ? <ProfileTab candidate={candidate} /> : null}
    </div>
  );
}
