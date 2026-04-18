import { useCallback, useRef, useState } from 'react';
import { CloudUpload } from 'lucide-react';
import { Card } from '../ui/Card';

interface DropZoneProps {
  onFiles: (files: FileList | File[]) => void;
  disabled?: boolean;
}

export function DropZone({ onFiles, disabled }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [drag, setDrag] = useState(false);

  const pick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  return (
    <Card
      className={[
        'relative border-dashed transition-colors',
        drag ? 'border-accent bg-blue-50/40' : 'border-border',
        disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer hover:border-accent/60',
      ].join(' ')}
      padding
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,.txt,.md"
        multiple
        disabled={disabled}
        onChange={(e) => {
          const list = e.target.files;
          if (list?.length) onFiles(list);
          e.target.value = '';
        }}
      />

      <button
        type="button"
        onClick={pick}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
          if (disabled) return;
          if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center gap-3 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-accent shadow-sm ring-1 ring-blue-100">
          <CloudUpload className="h-7 w-7" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Drop files or click to browse
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Accepts <span className="font-semibold">.pdf</span>,{' '}
            <span className="font-semibold">.docx</span>,{' '}
            <span className="font-semibold">.txt</span>, and{' '}
            <span className="font-semibold">.md</span>
          </p>
        </div>
      </button>
    </Card>
  );
}
