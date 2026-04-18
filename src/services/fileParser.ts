import mammoth from 'mammoth';

const PDF_MIN_CHARS = 24;

function decodePdfLiteral(text: string): string {
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '\\' && i + 1 < text.length) {
      const n = text[i + 1];
      if (n === 'n') {
        out += '\n';
        i += 2;
        continue;
      }
      if (n === 'r') {
        out += '\r';
        i += 2;
        continue;
      }
      if (n === 't') {
        out += '\t';
        i += 2;
        continue;
      }
      if (n === 'b') {
        out += '\b';
        i += 2;
        continue;
      }
      if (n === 'f') {
        out += '\f';
        i += 2;
        continue;
      }
      if (n === '(' || n === ')' || n === '\\') {
        out += n;
        i += 2;
        continue;
      }
      if (/[0-7]/.test(n)) {
        let oct = '';
        let j = i + 1;
        while (j < text.length && oct.length < 3 && /[0-7]/.test(text[j])) {
          oct += text[j];
          j++;
        }
        if (oct) {
          out += String.fromCharCode(parseInt(oct, 8));
          i = j;
          continue;
        }
      }
      out += n;
      i += 2;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

function extractParentheticStrings(raw: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < raw.length) {
    if (raw[i] === '(') {
      i++;
      let depth = 1;
      let chunk = '';
      while (i < raw.length && depth > 0) {
        const c = raw[i];
        if (c === '\\' && i + 1 < raw.length) {
          chunk += c + raw[i + 1];
          i += 2;
          continue;
        }
        if (c === '(') depth++;
        if (c === ')') depth--;
        if (depth > 0) chunk += c;
        i++;
      }
      const decoded = decodePdfLiteral(chunk).trim();
      if (decoded.length >= 2 && /[a-zA-Z]/.test(decoded)) {
        out.push(decoded);
      }
      continue;
    }
    i++;
  }
  return out;
}

function extractHexStrings(raw: string): string[] {
  const out: string[] = [];
  const re = /<([0-9A-Fa-f\s]+)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const hex = m[1].replace(/\s+/g, '');
    if (hex.length < 4) continue;
    try {
      let s = '';
      for (let k = 0; k + 1 < hex.length; k += 2) {
        s += String.fromCharCode(parseInt(hex.slice(k, k + 2), 16));
      }
      const t = s.replace(/\0/g, '').trim();
      if (t.length >= 2 && /[a-zA-Z]/.test(t)) out.push(t);
    } catch {
      /* ignore */
    }
  }
  return out;
}

export async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  const raw = new TextDecoder('latin1').decode(arrayBuffer);
  const a = extractParentheticStrings(raw);
  const b = extractHexStrings(raw);
  const merged = [...a, ...b];
  const text = merged.join('\n').replace(/\u0000/g, '');
  const cleaned = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 1)
    .join('\n');

  if (cleaned.trim().length < PDF_MIN_CHARS) {
    throw new Error(
      'Could not extract readable text from this PDF. Try a .docx or .txt export, or a text-based PDF.',
    );
  }
  return cleaned;
}

export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return file.text();
  }
  if (name.endsWith('.docx')) {
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buf });
    const text = result.value?.trim() ?? '';
    if (!text) {
      throw new Error('No text found in DOCX. The file might be empty or corrupted.');
    }
    return text;
  }
  if (name.endsWith('.pdf')) {
    const buf = await file.arrayBuffer();
    return extractTextFromPdf(buf);
  }
  throw new Error('Unsupported file type. Please upload .pdf, .docx, .txt, or .md.');
}
