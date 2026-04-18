import type { Candidate } from '../../types';
import { Card } from '../ui/Card';

interface ProfileTabProps {
  candidate: Candidate;
}

export function ProfileTab({ candidate }: ProfileTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          Work experience
        </h3>
        <div className="mt-4 space-y-3">
          {candidate.workHistory.map((w) => (
            <div
              key={`${w.company}-${w.period}`}
              className="rounded-xl border border-border bg-white pl-4 pr-3 py-3 shadow-sm border-l-4 border-l-accent"
            >
              <p className="text-sm font-bold text-text-primary">{w.title}</p>
              <p className="text-xs font-semibold text-text-secondary">
                {w.company} · {w.period}
              </p>
              {w.description ? (
                <p className="mt-2 text-sm text-text-secondary">{w.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary">Education</h3>
        <div className="mt-4 space-y-3">
          {candidate.education.map((e) => (
            <div
              key={`${e.institution}-${e.degree}`}
              className="rounded-xl border border-border bg-white pl-4 pr-3 py-3 shadow-sm border-l-4 border-l-purple-500"
            >
              <p className="text-sm font-bold text-text-primary">{e.degree}</p>
              <p className="text-xs font-semibold text-text-secondary">
                {e.institution}
                {e.year ? ` · ${e.year}` : ''}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
