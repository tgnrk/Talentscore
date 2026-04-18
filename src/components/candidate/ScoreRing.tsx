import { useEffect, useState } from 'react';
import { scoreColor } from '../../utils/helpers';

interface ScoreRingProps {
  value: number;
  label: string;
  size?: 'sm' | 'lg';
}

export function ScoreRing({ value, label, size = 'sm' }: ScoreRingProps) {
  const dim = size === 'lg' ? 140 : 88;
  const stroke = size === 'lg' ? 10 : 8;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const [offset, setOffset] = useState(c);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(c * (1 - pct / 100)));
    return () => cancelAnimationFrame(id);
  }, [c, pct]);

  const color = scoreColor(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative grid place-items-center"
        style={{ width: dim, height: dim }}
      >
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            stroke="#e8ecf1"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <p
            className={
              size === 'lg'
                ? 'text-3xl font-bold tabular-nums text-text-primary'
                : 'text-lg font-bold tabular-nums text-text-primary'
            }
          >
            {Math.round(value)}
          </p>
        </div>
      </div>
      <p className="text-center text-xs font-semibold text-text-secondary">
        {label}
      </p>
    </div>
  );
}
