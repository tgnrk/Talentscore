export type Verdict = 'STRONG_YES' | 'YES' | 'MAYBE' | 'NO';

export type InterviewQuestionCategory =
  | 'Technical'
  | 'Experience'
  | 'Behavioral'
  | 'Culture Fit';

export interface InterviewQuestion {
  category: InterviewQuestionCategory;
  question: string;
  rationale: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year?: string;
}

export interface CandidateScores {
  overall: number;
  skills: number;
  experience: number;
  education: number;
  culture: number;
}

export interface RadarScores {
  technical: number;
  communication: number;
  leadership: number;
  problemSolving: number;
  adaptability: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  location: string;
  experienceYears: number;
  skills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  score: number;
  verdict: Verdict;
  strengths: string[];
  concerns: string[];
  interviewQuestions: InterviewQuestion[];
  workHistory: WorkExperience[];
  education: Education[];
  summary: string;
  aiRecommendation: string;
  scores: CandidateScores;
  radarScores: RadarScores;
}

export type AppPage = 'dashboard' | 'candidate' | 'upload' | 'job';

export type SortColumn =
  | 'rank'
  | 'name'
  | 'score'
  | 'skills'
  | 'experience'
  | 'verdict';

export type SortDirection = 'asc' | 'desc';

export interface ProcessedUpload {
  id: string;
  fileName: string;
  status: 'processing' | 'done' | 'error';
  errorMessage?: string;
  candidateId?: string;
  score?: number;
}
