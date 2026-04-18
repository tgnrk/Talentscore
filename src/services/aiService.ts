import type { Candidate, InterviewQuestion, Verdict } from '../types';
import toast from 'react-hot-toast';

const MODEL = 'claude-sonnet-4-20250514';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

export function getAnthropicKey(): string | undefined {
  const k = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
  return k?.trim() || undefined;
}

export function notifyDemoModeIfNoKey(): void {
  if (!getAnthropicKey()) {
    toast(
      'Running in demo mode — add an API key in .env to analyse real CVs (VITE_ANTHROPIC_API_KEY).',
      { icon: 'ℹ️', duration: 4500 },
    );
  }
}

const SKILL_LEXICON = [
  'react',
  'typescript',
  'javascript',
  'node.js',
  'nodejs',
  'node',
  'python',
  'fastapi',
  'django',
  'flask',
  'postgresql',
  'postgres',
  'mongodb',
  'mongo',
  'aws',
  'gcp',
  'azure',
  'docker',
  'kubernetes',
  'k8s',
  'graphql',
  'redis',
  'terraform',
  'ci/cd',
  'cicd',
  'git',
  'linux',
  'sql',
  'pandas',
  'machine learning',
  'ml',
  'tailwind',
  'next.js',
  'express',
];

function titleCaseSkill(s: string): string {
  if (s.length <= 4) return s.toUpperCase();
  return s
    .split(/[\s/-]+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

function normalizeSkillToken(raw: string): string {
  const t = raw.trim().toLowerCase();
  if (t === 'nodejs' || t === 'node.js' || t === 'node') return 'Node.js';
  if (t === 'postgres' || t === 'postgresql') return 'PostgreSQL';
  if (t === 'mongo' || t === 'mongodb') return 'MongoDB';
  if (t === 'k8s') return 'Kubernetes';
  if (t === 'cicd' || t === 'ci/cd') return 'CI/CD';
  if (t === 'typescript') return 'TypeScript';
  if (t === 'javascript') return 'JavaScript';
  if (t === 'python') return 'Python';
  if (t === 'react') return 'React';
  if (t === 'docker') return 'Docker';
  if (t === 'graphql') return 'GraphQL';
  if (t === 'fastapi') return 'FastAPI';
  if (t === 'django') return 'Django';
  if (t === 'kubernetes') return 'Kubernetes';
  if (t === 'tailwind') return 'Tailwind';
  if (t === 'pandas') return 'Pandas';
  return titleCaseSkill(t);
}

export function buildDemoAnalysisCandidate(
  cvText: string,
  fileName: string,
  jobDescription: string,
): Candidate {
  const lines = cvText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const firstLine = lines[0] || 'Uploaded Candidate';
  const nameGuess = firstLine.replace(/^cv\s*[|:>-]?\s*/i, '').slice(0, 80);
  const safeName = nameGuess.length > 2 ? nameGuess : fileName.replace(/\.[^.]+$/, '');
  const emailMatch = cvText.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  const email = emailMatch?.[0] || 'candidate@upload.local';

  const hay = cvText.toLowerCase();
  const hits = new Set<string>();
  for (const term of SKILL_LEXICON) {
    if (term.includes(' ')) {
      if (hay.includes(term)) hits.add(normalizeSkillToken(term));
    } else if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(hay)) {
      hits.add(normalizeSkillToken(term));
    }
  }
  const skills = Array.from(hits);
  if (skills.length === 0) skills.push('General Engineering');

  const jd = jobDescription.toLowerCase();
  const must = [
    'react',
    'typescript',
    'node',
    'python',
    'fastapi',
    'django',
    'postgresql',
    'mongo',
    'aws',
    'ci/cd',
    'docker',
    'kubernetes',
  ];
  const matchedSkills = skills.filter((s) => jd.includes(s.toLowerCase()));
  const missingSkills = must
    .map(normalizeSkillToken)
    .filter((m, i, arr) => arr.indexOf(m) === i)
    .filter((m) => !skills.some((s) => s.toLowerCase() === m.toLowerCase()))
    .slice(0, 6);

  const matchCount = matchedSkills.length;
  const score = Math.max(
    38,
    Math.min(86, Math.round(44 + matchCount * 6 + Math.min(10, skills.length))),
  );
  let verdict: Verdict = 'MAYBE';
  if (score >= 88) verdict = 'STRONG_YES';
  else if (score >= 74) verdict = 'YES';
  else if (score < 55) verdict = 'NO';

  const id = `demo-${safeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 28)}-${Date.now().toString(36)}`;

  return {
    id,
    name: safeName,
    email,
    location: '—',
    experienceYears: Math.min(12, Math.max(1, Math.round(2 + matchCount * 0.75))),
    skills,
    matchedSkills: matchedSkills.length ? matchedSkills : skills.slice(0, 4),
    missingSkills,
    score,
    verdict,
    strengths: [
      'Demo screening highlights credible keyword coverage versus the job brief.',
      skills.length > 4 ? 'Breadth across multiple modern stack keywords.' : 'Focused skill footprint detected in CV text.',
    ],
    concerns: [
      'Demo mode uses keyword heuristics — not a substitute for Claude review.',
      missingSkills.length ? `Potential gaps vs posting: ${missingSkills.slice(0, 3).join(', ')}` : 'Some requirements may still need human validation.',
    ],
    interviewQuestions: [
      {
        category: 'Technical',
        question:
          'Walk me through a recent feature you shipped end-to-end. What trade-offs did you make between speed and maintainability?',
        rationale: 'General depth check while demo mode lacks full AI extraction.',
      },
      {
        category: 'Experience',
        question:
          'Where does your experience overlap most closely with our stack, and what would you need to ramp on first?',
        rationale: 'Surfaces honest fit boundaries for this requisition.',
      },
      {
        category: 'Behavioral',
        question:
          'Tell me about a disagreement with a stakeholder. How did you align the team and ship?',
        rationale: 'Maps to collaboration requirements in the job description.',
      },
      {
        category: 'Culture Fit',
        question:
          'How do you balance customer urgency with engineering quality on a SaaS product?',
        rationale: 'Relevant framing for HR tech product realities.',
      },
      {
        category: 'Technical',
        question:
          missingSkills[0]
            ? `Your recent roles didn’t emphasize ${missingSkills[0]}. How would you approach closing that gap in 60 days?`
            : 'Pick one part of our stack you’re least familiar with — how would you build confidence quickly?',
        rationale: 'Targets a concrete gap inferred from demo parsing.',
      },
    ],
    workHistory: [
      {
        title: 'Experience (extracted)',
        company: 'See CV upload',
        period: '—',
        description: 'Import your Anthropic key for structured employer history extraction.',
      },
    ],
    education: [
      {
        degree: 'Education (demo)',
        institution: 'See original CV',
      },
    ],
    summary:
      'Offline demo analysis: keyword-based fit score generated in-browser. Add VITE_ANTHROPIC_API_KEY for Claude-structured screening.',
    aiRecommendation:
      'Use this result for UI demos only. With Claude enabled, you will get fully structured scoring, narratives, and sharper gap analysis.',
    scores: {
      overall: score,
      skills: Math.max(30, Math.min(95, score + 4)),
      experience: Math.max(30, Math.min(95, score - 6)),
      education: 68,
      culture: 72,
    },
    radarScores: {
      technical: Math.max(30, Math.min(95, score + 2)),
      communication: 72,
      leadership: Math.max(35, score - 10),
      problemSolving: Math.max(35, score - 4),
      adaptability: Math.max(40, Math.min(90, score)),
    },
  };
}

interface ParsedAiCandidate {
  name?: string;
  email?: string;
  location?: string;
  experienceYears?: number;
  skills?: string[];
  matchedSkills?: string[];
  missingSkills?: string[];
  score?: number;
  verdict?: string;
  strengths?: string[];
  concerns?: string[];
  interviewQuestions?: Array<{
    category?: string;
    question?: string;
    rationale?: string;
  }>;
  workHistory?: Array<{
    title?: string;
    company?: string;
    period?: string;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
  }>;
  summary?: string;
  aiRecommendation?: string;
  scores?: {
    overall?: number;
    skills?: number;
    experience?: number;
    education?: number;
    culture?: number;
  };
  radarScores?: {
    technical?: number;
    communication?: number;
    leadership?: number;
    problemSolving?: number;
    adaptability?: number;
  };
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function normalizeVerdict(v: string | undefined): Verdict {
  const u = (v || '').toUpperCase().replace(/\s+/g, '_');
  if (u === 'STRONG_YES' || u === 'STRONGYES') return 'STRONG_YES';
  if (u === 'YES') return 'YES';
  if (u === 'MAYBE') return 'MAYBE';
  if (u === 'NO' || u === 'PASS') return 'NO';
  return 'MAYBE';
}

function safeQuestions(raw: ParsedAiCandidate['interviewQuestions']): InterviewQuestion[] {
  const cats = new Set(['Technical', 'Experience', 'Behavioral', 'Culture Fit']);
  const list = Array.isArray(raw) ? raw : [];
  return list.slice(0, 8).map((q) => {
    const cat = (q.category || 'Technical').trim();
    const category = cats.has(cat)
      ? (cat as InterviewQuestion['category'])
      : 'Technical';
    return {
      category,
      question: String(q.question || '').trim() || 'Follow-up question',
      rationale: String(q.rationale || '').trim() || '—',
    };
  });
}

export function mapParsedToCandidate(parsed: ParsedAiCandidate, cvText: string): Candidate {
  const score = clamp(Math.round(Number(parsed.score ?? 50)), 0, 100);
  const verdict = normalizeVerdict(parsed.verdict);
  const skills = Array.isArray(parsed.skills) ? parsed.skills.map(String) : [];
  const matched = Array.isArray(parsed.matchedSkills)
    ? parsed.matchedSkills.map(String)
    : skills.slice(0, 6);
  const missing = Array.isArray(parsed.missingSkills) ? parsed.missingSkills.map(String) : [];

  const overall = clamp(Math.round(Number(parsed.scores?.overall ?? score)), 0, 100);
  const skillsScore = clamp(Math.round(Number(parsed.scores?.skills ?? overall)), 0, 100);
  const expScore = clamp(Math.round(Number(parsed.scores?.experience ?? overall)), 0, 100);
  const eduScore = clamp(Math.round(Number(parsed.scores?.education ?? 70)), 0, 100);
  const cultScore = clamp(Math.round(Number(parsed.scores?.culture ?? 72)), 0, 100);

  const r = parsed.radarScores || {};
  const radarScores = {
    technical: clamp(Math.round(Number(r.technical ?? skillsScore)), 0, 100),
    communication: clamp(Math.round(Number(r.communication ?? cultScore)), 0, 100),
    leadership: clamp(Math.round(Number(r.leadership ?? expScore)), 0, 100),
    problemSolving: clamp(Math.round(Number(r.problemSolving ?? skillsScore)), 0, 100),
    adaptability: clamp(Math.round(Number(r.adaptability ?? cultScore)), 0, 100),
  };

  const name = String(parsed.name || 'Unknown Candidate').trim() || 'Unknown Candidate';
  const emailRaw = String(parsed.email || '').trim();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
  const id = `upload-${slug}-${Date.now().toString(36)}`;

  return {
    id,
    name,
    email:
      emailRaw ||
      `${slug.replace(/(^-|-$)/g, '') || 'candidate'}@upload.local`,
    location: String(parsed.location || '—').trim() || '—',
    experienceYears: clamp(Math.round(Number(parsed.experienceYears ?? 3)), 0, 60),
    skills: skills.length ? skills : ['—'],
    matchedSkills: matched.length ? matched : skills.slice(0, 4),
    missingSkills: missing,
    score: overall,
    verdict,
    strengths: Array.isArray(parsed.strengths)
      ? parsed.strengths.map((s) => String(s))
      : ['Strong alignment in extracted CV signals'],
    concerns: Array.isArray(parsed.concerns)
      ? parsed.concerns.map((s) => String(s))
      : ['Some requirements need validation in interview'],
    interviewQuestions: safeQuestions(parsed.interviewQuestions).slice(0, 5),
    workHistory: Array.isArray(parsed.workHistory)
      ? parsed.workHistory.map((w) => ({
          title: String(w.title || 'Role'),
          company: String(w.company || 'Company'),
          period: String(w.period || ''),
          description: w.description ? String(w.description) : undefined,
        }))
      : [],
    education: Array.isArray(parsed.education)
      ? parsed.education.map((e) => ({
          degree: String(e.degree || ''),
          institution: String(e.institution || ''),
          year: e.year ? String(e.year) : undefined,
        }))
      : [],
    summary:
      String(parsed.summary || '').trim() ||
      cvText.slice(0, 480).trim() ||
      'Summary generated from uploaded CV.',
    aiRecommendation:
      String(parsed.aiRecommendation || '').trim() ||
      'Proceed based on team bar: validate gaps in technical interview.',
    scores: {
      overall,
      skills: skillsScore,
      experience: expScore,
      education: eduScore,
      culture: cultScore,
    },
    radarScores,
  };
}

function extractJsonPayload(text: string): string {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) return fence[1].trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

export async function analyzeResumeWithAi(
  cvText: string,
  jobDescription: string,
): Promise<Candidate> {
  const apiKey = getAnthropicKey();
  if (!apiKey) {
    throw new Error('Missing VITE_ANTHROPIC_API_KEY. Add it to a .env file to enable AI analysis.');
  }

  const instructions = `You are an expert technical recruiter. Score this candidate against the job description.

Return ONLY JSON (no markdown) with this exact shape:
{
  "name": string,
  "email": string,
  "location": string,
  "experienceYears": number,
  "skills": string[],
  "matchedSkills": string[],
  "missingSkills": string[],
  "score": number,
  "verdict": "STRONG_YES" | "YES" | "MAYBE" | "NO",
  "strengths": string[],
  "concerns": string[],
  "interviewQuestions": [{"category":"Technical"|"Experience"|"Behavioral"|"Culture Fit","question":string,"rationale":string}],
  "workHistory": [{"title":string,"company":string,"period":string,"description"?:string}],
  "education": [{"degree":string,"institution":string,"year"?:string}],
  "summary": string,
  "aiRecommendation": string,
  "scores": {"overall":number,"skills":number,"experience":number,"education":number,"culture":number},
  "radarScores": {"technical":number,"communication":number,"leadership":number,"problemSolving":number,"adaptability":number}
}

Rules:
- All scores are integers 0-100.
- verdict MUST match the overall fit implied by score (>=88 STRONG_YES, 74-87 YES, 55-73 MAYBE, <55 NO).
- Provide exactly 5 interviewQuestions targeting gaps.
- matchedSkills/missingSkills must reference the job description requirements.

JOB DESCRIPTION:
${jobDescription}

CV TEXT:
${cvText.slice(0, 24000)}`;

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      messages: [{ role: 'user', content: instructions }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(
      `Anthropic API error (${res.status}). If this is a browser CORS issue, run analysis via a small local proxy or use Anthropic’s recommended server integration. ${errText.slice(0, 240)}`,
    );
  }

  const data = (await res.json()) as {
    content?: Array<{ type?: string; text?: string }>;
    error?: { message?: string };
  };

  if (data.error?.message) {
    throw new Error(data.error.message);
  }

  const text =
    data.content?.find((c) => c.type === 'text')?.text ||
    data.content?.[0]?.text ||
    '';
  if (!text) {
    throw new Error('Empty response from AI model.');
  }

  let parsed: ParsedAiCandidate;
  try {
    parsed = JSON.parse(extractJsonPayload(text)) as ParsedAiCandidate;
  } catch {
    throw new Error('Could not parse AI JSON. Try again with a shorter CV.');
  }

  return mapParsedToCandidate(parsed, cvText);
}
