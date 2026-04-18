/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f6f8fb',
        card: '#ffffff',
        border: '#e8ecf1',
        accent: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '8px',
        tag: '6px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
