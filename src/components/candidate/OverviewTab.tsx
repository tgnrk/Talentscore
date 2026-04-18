import type { Candidate } from '../../types';
import { Card } from '../ui/Card';
import { ScoreRing } from './ScoreRing';
import { CompetencyRadar } from './CompetencyRadar';

interface OverviewTabProps {
  candidate: Candidate;
}

export function OverviewTab({ candidate }: OverviewTabProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          Score breakdown
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          Sub-scores across key dimensions
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ScoreRing value={candidate.scores.skills} label="Skills" />
          <ScoreRing value={candidate.scores.experience} label="Experience" />
          <ScoreRing value={candidate.scores.education} label="Education" />
          <ScoreRing value={candidate.scores.culture} label="Culture" />
        </div>
        <div className="mt-5 rounded-xl border border-border bg-slate-50/70 p-4 text-sm leading-relaxed text-text-secondary">
          <p className="font-semibold text-text-primary">AI recommendation</p>
          <p className="mt-2">{candidate.aiRecommendation}</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-text-primary">
          Competency radar
        </h3>
        <p className="mt-1 text-xs text-text-secondary">
          Relative strength across behavioral and technical signals
        </p>
        <div className="mt-2">
          <CompetencyRadar scores={candidate.radarScores} />
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Strengths
            </h3>
            <ul className="mt-3 space-y-2">
              {candidate.strengths.map((s) => (
                <li
                  key={s}
                  className="border-l-4 border-emerald-500 bg-slate-50/60 pl-3 text-sm text-text-secondary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Concerns</h3>
            <ul className="mt-3 space-y-2">
              {candidate.concerns.map((s) => (
                <li
                  key={s}
                  className="border-l-4 border-red-500 bg-slate-50/60 pl-3 text-sm text-text-secondary"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
