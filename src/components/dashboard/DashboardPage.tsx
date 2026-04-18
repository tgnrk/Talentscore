import { CandidateTable } from './CandidateTable';
import { ComparisonChart } from './ComparisonChart';
import { StatCards } from './StatCards';
import { TopCandidateSpotlight } from './TopCandidateSpotlight';
import { VerdictPieChart } from './VerdictPieChart';
import { useStore } from '../../store/useStore';

export function DashboardPage() {
  const candidates = useStore((s) => s.candidates);
  const top = [...candidates].sort((a, b) => b.score - a.score)[0];

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Hiring dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          Live read on your pipeline health, match quality, and standout talent.
        </p>
      </div>

      <StatCards candidates={candidates} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ComparisonChart candidates={candidates} />
        </div>
        <div className="lg:col-span-2">
          <VerdictPieChart candidates={candidates} />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Candidate ranking
            </h2>
            <p className="text-sm text-text-secondary">
              Click a row to open AI breakdown and interview plan.
            </p>
          </div>
        </div>
        <CandidateTable candidates={candidates} />
      </div>

      <TopCandidateSpotlight candidate={top} />
    </div>
  );
}
