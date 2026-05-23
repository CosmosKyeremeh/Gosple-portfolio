import Link from 'next/link'
import { Mail, Sigma } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/40 mt-24">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Sigma className="w-3 h-3 text-blue-400" />
          </div>
          <span className="font-mono text-xs text-slate-500">
            Gosple — {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-300 transition-colors"
            aria-label="GitHub"
          >
            {/* Native SVG replacement matching identical Lucide structural rules */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>
          <Link
            href="mailto:you@email.com"
            className="text-slate-600 hover:text-slate-300 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>

        <p className="font-mono text-[10px] text-slate-700 tracking-[0.2em]">
          PROOF OF THOUGHT
        </p>
      </div>
    </footer>
  )
}