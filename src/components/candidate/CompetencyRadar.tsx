import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { RadarScores } from '../../types';

interface CompetencyRadarProps {
  scores: RadarScores;
}

export function CompetencyRadar({ scores }: CompetencyRadarProps) {
  const data = [
    { subject: 'Technical', value: scores.technical },
    { subject: 'Communication', value: scores.communication },
    { subject: 'Leadership', value: scores.leadership },
    { subject: 'Problem solving', value: scores.problemSolving },
    { subject: 'Adaptability', value: scores.adaptability },
  ];

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
          <PolarGrid stroke="#e8ecf1" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#64748b', fontSize: 11 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.22}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #e8ecf1',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
