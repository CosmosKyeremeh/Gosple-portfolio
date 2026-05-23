import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { getAllContent } from '@/lib/mdx'

const mathAreas = [
  { sym: 'Σ', label: 'Discrete Mathematics', desc: 'Combinatorics, graph theory, formal proofs.', color: 'text-blue-400',   border: 'border-blue-400/10',   bg: 'bg-blue-400/5'   },
  { sym: '∇', label: 'Linear Algebra',        desc: 'Vector spaces, transformations, eigenstructures.', color: 'text-violet-400', border: 'border-violet-400/10', bg: 'bg-violet-400/5' },
  { sym: '∫', label: 'Real Analysis',         desc: 'Sequences, convergence, continuity.', color: 'text-emerald-400', border: 'border-emerald-400/10', bg: 'bg-emerald-400/5' },
  { sym: 'λ', label: 'Algorithm Design',      desc: 'Complexity, dynamic programming, optimality.', color: 'text-amber-400',  border: 'border-amber-400/10',  bg: 'bg-amber-400/5'  },
]

export default async function HomePage() {
  const posts    = await getAllContent('blog').then((r) => r.slice(0, 3))
  const projects = await getAllContent('projects').then((r) => r.slice(0, 2))

  return (
    <div className="relative min-h-screen math-coordinate-grid overflow-x-hidden">

      {/* ── Ambient blobs ───────────────────────────── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/4 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-[110px]" />
      </div>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative">
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm text-xs font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            BSc. Computer Science & Engineering
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-slate-100 leading-[1.02]">
            Gosple
          </h1>

          <p className="font-serif text-xl md:text-2xl text-slate-400 italic max-w-xl mx-auto leading-relaxed">
            Making mathematical thinking{' '}
            <span className="text-amber-400 not-italic font-semibold">visible</span>.
          </p>

          <p className="text-sm text-slate-600 font-mono max-w-md mx-auto">
            Not shipping apps. Proving ideas.{' '}
            <span className="text-slate-400">Every project is a proof of thought.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/40 font-mono text-sm transition-all duration-200 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600 font-mono text-sm transition-all duration-200"
            >
              Read Insights
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </div>
      </section>

      {/* ── Math Areas ──────────────────────────────── */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-2">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">Areas of Study</p>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-bold">What I think about</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mathAreas.map(({ sym, label, desc, color, border, bg }) => (
            <div key={label} className={`glass-panel-3d rounded-2xl p-6 space-y-3 border ${border} hover:scale-[1.02] transition-transform duration-200`}>
              <div className={`text-4xl font-serif ${color}`}>{sym}</div>
              <h3 className={`font-mono text-xs font-bold ${color}`}>{label}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────── */}
      {projects.length > 0 && (
        <section className="px-4 py-16 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-1">Selected Work</p>
              <h2 className="font-serif text-3xl text-slate-100 font-bold">Projects</h2>
            </div>
            <Link href="/projects" className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group">
              All projects <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map(({ slug, metadata }) => (
              <Link href={`/projects/${slug}`} key={slug} className="group block">
                <div className="glass-panel-3d rounded-2xl p-7 border border-slate-800/40 hover:border-blue-500/20 transition-all duration-300 h-full space-y-3">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{metadata.category as string}</span>
                  <h3 className="font-serif text-xl text-slate-100 group-hover:text-blue-300 transition-colors font-bold">{metadata.title as string}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{metadata.excerpt as string}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(metadata.tags as string[])?.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-500 border border-slate-700/30">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Recent Blog Posts ────────────────────────── */}
      {posts.length > 0 && (
        <section className="px-4 py-16 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-1">Insights</p>
              <h2 className="font-serif text-3xl text-slate-100 font-bold">Latest Writing</h2>
            </div>
            <Link href="/blog" className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group">
              All posts <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="space-y-3">
            {posts.map(({ slug, metadata }) => (
              <Link href={`/blog/${slug}`} key={slug} className="group block">
                <div className="glass-panel-3d rounded-xl p-5 border border-slate-800/40 hover:border-purple-500/20 transition-all duration-200 flex items-start gap-4">
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">{metadata.category as string}</span>
                    <h3 className="font-serif text-lg text-slate-200 group-hover:text-purple-300 transition-colors font-semibold">{metadata.title as string}</h3>
                    <p className="text-xs text-slate-600">{metadata.date as string}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Quote ───────────────────────────────────── */}
      <section className="px-4 py-24 max-w-3xl mx-auto text-center">
        <blockquote className="space-y-4">
          <p className="font-serif text-2xl md:text-3xl text-slate-400 italic leading-relaxed">
            "Mathematics is not about numbers, equations, or algorithms:{' '}
            <span className="text-amber-400">it is about understanding."</span>
          </p>
          <cite className="text-xs font-mono text-slate-700 not-italic">— William Paul Thurston</cite>
        </blockquote>
      </section>
    </div>
  )
}