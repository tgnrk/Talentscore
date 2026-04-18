import type { Candidate } from '../../types';
import { Card } from '../ui/Card';
import { SkillTag } from '../ui/SkillTag';

interface SkillsTabProps {
  candidate: Candidate;
}

export function SkillsTab({ candidate }: SkillsTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          Matched skills
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          Strong overlap with the job brief
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.matchedSkills.map((s) => (
            <SkillTag key={s} label={s} variant="success" icon="check" />
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          Missing / gap skills
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          Target these in screening and tech deep-dives
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.missingSkills.length ? (
            candidate.missingSkills.map((s) => (
              <SkillTag key={s} label={s} variant="danger" icon="x" />
            ))
          ) : (
            <p className="text-sm text-text-muted">No major gaps flagged.</p>
          )}
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          All skills (CV)
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          Full extracted skill inventory
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.map((s) => (
            <SkillTag key={s} label={s} variant="muted" />
          ))}
        </div>
      </Card>
    </div>
  );
}
