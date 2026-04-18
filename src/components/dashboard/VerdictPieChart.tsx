import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui/Card';
import type { Candidate, Verdict } from '../../types';
import { verdictLabel } from '../../utils/helpers';

interface VerdictPieChartProps {
  candidates: Candidate[];
}

const COLORS: Record<Verdict, string> = {
  STRONG_YES: '#22c55e',
  YES: '#3b82f6',
  MAYBE: '#f59e0b',
  NO: '#ef4444',
};

export function VerdictPieChart({ candidates }: VerdictPieChartProps) {
  const counts: Record<Verdict, number> = {
    STRONG_YES: 0,
    YES: 0,
    MAYBE: 0,
    NO: 0,
  };
  candidates.forEach((c) => {
    counts[c.verdict] += 1;
  });

  const data = (Object.keys(counts) as Verdict[])
    .map((k) => ({
      name: verdictLabel(k),
      key: k,
      value: counts[k],
    }))
    .filter((d) => d.value > 0);

  if (!candidates.length) {
    return (
      <Card className="h-full">
        <h3 className="text-base font-semibold text-text-primary">
          Verdict breakdown
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Add candidates to see verdict distribution.
        </p>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-text-primary">
          Verdict breakdown
        </h3>
        <p className="text-sm text-text-secondary">
          Distribution across the current cohort
        </p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={COLORS[entry.key]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e8ecf1',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(COLORS) as Verdict[]).map((k) => (
          <div
            key={k}
            className="flex items-center gap-2 rounded-lg border border-border bg-slate-50 px-2 py-1 text-xs font-medium text-text-secondary"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: COLORS[k] }}
            />
            {verdictLabel(k)} · {counts[k]}
          </div>
        ))}
      </div>
    </Card>
  );
}
