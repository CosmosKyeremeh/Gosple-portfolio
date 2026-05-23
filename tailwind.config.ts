import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['var(--font-crimson)', 'Georgia', 'serif'],
        sans:   ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:   ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config