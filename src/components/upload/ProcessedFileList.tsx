import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import type { ProcessedUpload } from '../../types';
import { Card } from '../ui/Card';

interface ProcessedFileListProps {
  items: ProcessedUpload[];
}

export function ProcessedFileList({ items }: ProcessedFileListProps) {
  if (!items.length) return null;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-primary">
        Processed uploads
      </h3>
      <p className="mt-1 text-xs text-text-secondary">
        Status for each file in this session
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-border bg-slate-50/60 px-3 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                {it.fileName}
              </p>
              {it.status === 'processing' ? (
                <p className="mt-1 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  Analyzing {it.fileName}...
                </p>
              ) : null}
              {it.status === 'error' ? (
                <p className="mt-1 text-xs text-red-700">{it.errorMessage}</p>
              ) : null}
              {it.status === 'done' ? (
                <p className="mt-1 text-xs text-text-secondary">
                  Match score{' '}
                  <span className="font-bold text-text-primary">
                    {typeof it.score === 'number' ? it.score : '—'}
                  </span>
                  . Open the candidate record for full AI breakdown.
                </p>
              ) : null}
            </div>
            <div className="shrink-0 pt-0.5">
              {it.status === 'processing' ? (
                <Loader2 className="h-5 w-5 animate-spin text-accent" />
              ) : null}
              {it.status === 'done' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              ) : null}
              {it.status === 'error' ? (
                <XCircle className="h-5 w-5 text-red-600" strokeWidth={2} />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
