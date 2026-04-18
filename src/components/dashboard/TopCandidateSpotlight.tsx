import { ArrowRight, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { Candidate } from '../../types';
import {
  initials,
  verdictLabel,
  verdictStyles,
} from '../../utils/helpers';
import { useStore } from '../../store/useStore';

interface TopCandidateSpotlightProps {
  candidate: Candidate | undefined;
}

export function TopCandidateSpotlight({ candidate }: TopCandidateSpotlightProps) {
  const setPage = useStore((s) => s.setPage);
  const setSelected = useStore((s) => s.setSelectedCandidate);

  if (!candidate) {
    return (
      <Card>
        <p className="text-sm text-text-secondary">
          Add candidates to spotlight your strongest lead.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/40">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-white shadow-sm">
            {initials(candidate.name)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-text-primary">
                Spotlight: {candidate.name}
              </h3>
              <Badge className={verdictStyles(candidate.verdict)}>
                {verdictLabel(candidate.verdict)}
              </Badge>
            </div>
            <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
              <MapPin className="h-4 w-4" strokeWidth={2} />
              {candidate.location}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {candidate.summary}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-2 md:items-end">
          <div className="rounded-xl border border-border bg-white px-4 py-3 text-center shadow-sm md:text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Match score
            </p>
            <p className="text-3xl font-bold text-accent">{candidate.score}</p>
          </div>
          <Button
            className="w-full md:w-auto"
            onClick={() => {
              setSelected(candidate.id);
              setPage('candidate');
            }}
          >
            View
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
