import { useStore } from '../../store/useStore';
import { Card } from '../ui/Card';

export function JobBriefPage() {
  const jobDescription = useStore((s) => s.jobDescription);
  const setJobDescription = useStore((s) => s.setJobDescription);

  return (
    <div className="page-enter space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Job brief
        </h1>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          Candidates are scored against this description
        </p>
      </div>

      <Card>
        <label className="text-sm font-semibold text-text-primary">
          Active job description
        </label>
        <p className="mt-1 text-xs text-text-secondary">
          Updates apply to the next CV analysis run and contextualizes demo
          scoring.
        </p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="mt-3 min-h-[560px] w-full resize-y rounded-xl border border-border bg-white px-3 py-3 text-sm leading-relaxed text-text-primary shadow-sm outline-none transition-shadow focus:ring-2 focus:ring-accent/25"
          spellCheck
        />
      </Card>
    </div>
  );
}
