import { useStore } from '../../store/useStore';
import type { AppPage } from '../../types';

const nav: { id: AppPage; label: string; emoji: string }[] = [
  { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
  { id: 'upload', label: 'Upload CVs', emoji: '📤' },
  { id: 'job', label: 'Job Brief', emoji: '📋' },
];

export function Header() {
  const candidates = useStore((s) => s.candidates);
  const currentPage = useStore((s) => s.currentPage);
  const setPage = useStore((s) => s.setPage);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setPage('dashboard')}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-lg font-bold text-white shadow-sm">
            T
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-text-primary sm:text-lg">
                TalentScore
              </span>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                AI
              </span>
            </div>
            <p className="hidden text-xs text-text-muted sm:block">
              Candidate screening for modern teams
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={[
                  'rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150',
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:bg-slate-100 hover:text-text-primary',
                ].join(' ')}
              >
                <span className="mr-1.5">{item.emoji}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-border bg-slate-50 px-3 py-1 text-xs font-semibold text-text-secondary sm:inline-flex">
            {candidates.length} candidates
          </span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm"
            title="Recruiter"
          >
            R
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-white px-4 py-2 md:hidden">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {nav.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={[
                  'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
                  active
                    ? 'bg-accent text-white'
                    : 'bg-slate-50 text-text-secondary',
                ].join(' ')}
              >
                {item.emoji} {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
