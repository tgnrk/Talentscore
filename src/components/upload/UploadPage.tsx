import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '../../store/useStore';
import type { ProcessedUpload } from '../../types';
import {
  analyzeResumeWithAi,
  buildDemoAnalysisCandidate,
  getAnthropicKey,
  notifyDemoModeIfNoKey,
} from '../../services/aiService';
import { extractTextFromFile } from '../../services/fileParser';
import { Card } from '../ui/Card';
import { DropZone } from './DropZone';
import { ProcessedFileList } from './ProcessedFileList';

export function UploadPage() {
  const jobDescription = useStore((s) => s.jobDescription);
  const setJobDescription = useStore((s) => s.setJobDescription);
  const addCandidate = useStore((s) => s.addCandidate);

  const [uploads, setUploads] = useState<ProcessedUpload[]>([]);
  const [busy, setBusy] = useState(false);
  const demoWarned = useRef(false);

  const processFile = async (file: File) => {
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${file.name}-${Date.now()}`;
    setUploads((prev) => [
      {
        id,
        fileName: file.name,
        status: 'processing',
      },
      ...prev,
    ]);

    try {
      const text = await extractTextFromFile(file);
      const hasKey = Boolean(getAnthropicKey());
      if (!hasKey && !demoWarned.current) {
        demoWarned.current = true;
        notifyDemoModeIfNoKey();
      }
      const candidate = hasKey
        ? await analyzeResumeWithAi(text, jobDescription)
        : buildDemoAnalysisCandidate(text, file.name, jobDescription);

      addCandidate(candidate);
      setUploads((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                status: 'done' as const,
                candidateId: candidate.id,
                score: candidate.score,
              }
            : u,
        ),
      );
      toast.success(`Analyzed ${file.name}`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Upload failed';
      setUploads((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: 'error' as const, errorMessage: msg } : u,
        ),
      );
      toast.error(msg);
    }
  };

  const onFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    const allowed = list.filter((f) =>
      /\.(pdf|docx|txt|md)$/i.test(f.name),
    );
    if (!allowed.length) {
      toast.error('Please upload .pdf, .docx, .txt, or .md files.');
      return;
    }
    setBusy(true);
    try {
      for (const f of allowed) {
        await processFile(f);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-enter space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Upload CVs
        </h1>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          Paste your live job description, drop resumes, and generate structured
          scores instantly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <label className="text-sm font-semibold text-text-primary">
            Job description
          </label>
          <p className="mt-1 text-xs text-text-secondary">
            Candidates are scored against this brief (demo data ships with a
            default posting you can edit).
          </p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="mt-3 h-[420px] w-full resize-y rounded-xl border border-border bg-white px-3 py-3 text-sm leading-relaxed text-text-primary shadow-sm outline-none transition-shadow focus:ring-2 focus:ring-accent/25"
            spellCheck
          />
        </Card>

        <div className="space-y-4">
          <DropZone onFiles={onFiles} disabled={busy} />
          <ProcessedFileList items={uploads} />
        </div>
      </div>
    </div>
  );
}
