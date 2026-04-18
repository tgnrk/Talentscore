import type { Candidate } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface InterviewTabProps {
  candidate: Candidate;
}

export function InterviewTab({ candidate }: InterviewTabProps) {
  return (
    <div className="space-y-3">
      {candidate.interviewQuestions.map((q, idx) => (
        <Card key={`${q.question}-${idx}`}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-50 text-blue-800 border-blue-200">
              {q.category}
            </Badge>
            <span className="text-xs font-semibold text-text-muted">
              Question {idx + 1}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-text-primary">
            {q.question}
          </p>
          <p className="mt-2 text-sm italic text-text-secondary">
            {q.rationale}
          </p>
        </Card>
      ))}
    </div>
  );
}
