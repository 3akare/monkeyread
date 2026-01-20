/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Roboto Mono"', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        main: 'var(--main)',
        caret: 'var(--caret)',
        sub: 'var(--sub)',
        text: 'var(--text)',
        error: 'var(--error)',
        'error-extra': 'var(--error-extra)',
        'colorful-error': 'var(--colorful-error)',
        'colorful-error-extra': 'var(--colorful-error-extra)',
      },
    },
  },
  plugins: [],
}
