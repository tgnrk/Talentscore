import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card } from '../ui/Card';
import type { Candidate } from '../../types';

interface ComparisonChartProps {
  candidates: Candidate[];
}

export function ComparisonChart({ candidates }: ComparisonChartProps) {
  const data = [...candidates]
    .sort((a, b) => b.score - a.score)
    .map((c) => ({
      name: c.name.split(' ')[0],
      Overall: c.scores.overall,
      Skills: c.scores.skills,
      Experience: c.scores.experience,
    }));

  if (!data.length) {
    return (
      <Card>
        <h3 className="text-base font-semibold text-text-primary">
          Score comparison
        </h3>
        <p className="mt-2 text-sm text-text-secondary">
          Add candidates to see chart data.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            Score comparison
          </h3>
          <p className="text-sm text-text-secondary">
            Overall, skills, and experience sub-scores by candidate
          </p>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="4 6" stroke="#e8ecf1" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e8ecf1' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e8ecf1' }}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: 'rgba(59, 130, 246, 0.06)' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e8ecf1',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            />
            <Legend />
            <Bar dataKey="Overall" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Skills" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar
              dataKey="Experience"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
