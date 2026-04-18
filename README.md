# TalentScore AI

TalentScore AI is a browser-based recruiter dashboard for AI-assisted CV screening. It ships with rich demo data for screenshots and portfolios, and optionally calls the Anthropic Claude API for real resume analysis when you provide a key.

## Tech

- React 18 + Vite 5 + TypeScript
- Tailwind CSS
- Zustand, Recharts, Mammoth (DOCX), React Hot Toast, Lucide icons

## How to run

```powershell
cd ~/Desktop/talentscore
npm install
npm run dev
```

Open http://localhost:5173 in the browser.

## Optional: Anthropic API key

Copy `.env.example` to `.env` and set:

```bash
VITE_ANTHROPIC_API_KEY=your_key_here
```

> **Note:** Browser calls to `api.anthropic.com` are often blocked by CORS. This project implements the client-side `fetch` flow as requested for a portfolio demo; if you hit CORS errors in production, use a minimal server-side proxy or Anthropic’s recommended integration pattern.

Without a key, uploads still run using an **offline heuristic scorer** so the workflow stays demo-ready, and you’ll see an informational toast the first time you analyze a file.

## How to take screenshots for LinkedIn / GitHub

1. **Dashboard:** Capture the overview with all four demo candidates plus charts — ideal as a GitHub README hero image.
2. **Sarah Chen → Overview:** Score rings + competency radar to showcase “AI-style” analysis.
3. **Sarah Chen → Skills:** Matched vs missing skill tags.
4. **Sarah Chen → Interview:** Question cards with categories and rationale.
5. **Upload CVs:** Drop zone + job description split layout + processed list after a sample upload.

## Push to GitHub

```powershell
cd ~/Desktop/talentscore
git init
git add .
git commit -m "Initial commit: TalentScore AI - AI-powered candidate screening platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/talentscore-ai.git
git push -u origin main
```

## License

MIT — use freely for portfolios and learning.
