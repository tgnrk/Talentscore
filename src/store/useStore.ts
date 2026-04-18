import { create } from 'zustand';
import type {
  AppPage,
  Candidate,
  SortColumn,
  SortDirection,
} from '../types';
import { DEFAULT_JOB_DESCRIPTION, demoCandidates } from '../data/demoData';

export interface AppState {
  candidates: Candidate[];
  jobDescription: string;
  selectedCandidateId: string | null;
  currentPage: AppPage;
  sortBy: SortColumn;
  sortDirection: SortDirection;
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: string) => void;
  setSelectedCandidate: (id: string | null) => void;
  setPage: (page: AppPage) => void;
  setJobDescription: (text: string) => void;
  toggleSort: (column: SortColumn) => void;
}

export const useStore = create<AppState>((set, get) => ({
  candidates: demoCandidates,
  jobDescription: DEFAULT_JOB_DESCRIPTION,
  selectedCandidateId: null,
  currentPage: 'dashboard',
  sortBy: 'score',
  sortDirection: 'desc',
  addCandidate: (candidate) =>
    set((s) => ({ candidates: [candidate, ...s.candidates] })),
  removeCandidate: (id) =>
    set((s) => ({
      candidates: s.candidates.filter((c) => c.id !== id),
      selectedCandidateId:
        s.selectedCandidateId === id ? null : s.selectedCandidateId,
    })),
  setSelectedCandidate: (id) => set({ selectedCandidateId: id }),
  setPage: (page) => set({ currentPage: page }),
  setJobDescription: (text) => set({ jobDescription: text }),
  toggleSort: (column) => {
    const { sortBy, sortDirection } = get();
    if (sortBy === column) {
      set({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      set({
        sortBy: column,
        sortDirection:
          column === 'name' || column === 'rank' || column === 'verdict'
            ? 'asc'
            : 'desc',
      });
    }
  },
}));
