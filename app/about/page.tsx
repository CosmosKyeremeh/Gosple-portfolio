import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, philosophy, and mathematical interests.',
}

const timeline = [
  { year: '2022',  title: 'Started BSc. CS & Engineering',   desc: 'Began with a deliberate focus on mathematical foundations over software delivery.',      dot: 'bg-blue-400'   },
  { year: '2023',  title: 'Deepened Mathematical Study',      desc: 'Intensive work on Linear Algebra, Discrete Mathematics, and Algorithm Analysis.',        dot: 'bg-violet-400' },
  { year: '2024',  title: 'Group Projects & Applied Work',    desc: 'Applied mathematical principles to collaborative engineering problems.',                   dot: 'bg-emerald-400'},
  { year: '2025 →',title: 'Building this Portfolio',          desc: 'A living demonstration of mathematical thinking — interactive, written, and honest.',     dot: 'bg-amber-400'  },
]

const interests = [
  { field: 'Graph Theory',       icon: '◈', desc: 'Networks, traversal algorithms, structural properties.'      },
  { field: 'Linear Algebra',     icon: '⊞', desc: 'Transformations, eigenvalues, vector space geometry.'        },
  { field: 'Combinatorics',      icon: '∩', desc: 'Counting principles, permutations, combinatorial proofs.'    },
  { field: 'Numerical Methods',  icon: '≈', desc: 'Root-finding, approximation, convergence analysis.'          },
  { field: 'Probability Theory', icon: 'Ω', desc: 'Stochastic processes and measure-theoretic probability.'     },
  { field: 'Algorithm Analysis', icon: 'O', desc: 'Complexity bounds, time-space trade-offs, optimality.'       },
]

export default function AboutPage() {
  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/4 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/4 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-24 space-y-20">

        {/* Intro */}
        <div className="space-y-5">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">About</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-100 leading-tight">
            Proof of <span className="text-amber-400 italic">Thought</span>
          </h1>
          <div className="max-w-2xl space-y-4 text-slate-400 text-base leading-relaxed">
            <p>
              I am a Computer Science & Engineering student with a strong, deliberate focus on
              mathematics. While most of my peers build apps, I spend time understanding{' '}
              <span className="text-slate-200">why algorithms work</span>, what makes a proof
              elegant, and how abstract structures map onto real computational problems.
            </p>
            <p>
              This portfolio is not a list of deployed projects. It is a{' '}
              <span className="text-slate-200 font-medium">living document of my thinking</span> —
              interactive demonstrations of concepts I have internalized, and written breakdowns of
              problems I have genuinely solved.
            </p>
          </div>
        </div>

        {/* Mathematical Interests */}
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-2">Focus Areas</p>
            <h2 className="font-serif text-3xl text-slate-100 font-bold">Where my mind lives</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {interests.map(({ field, icon, desc }) => (
              <div key={field} className="glass-panel-3d rounded-xl p-5 border border-slate-800/40 hover:border-slate-700/60 transition-all duration-200 space-y-2">
                <span className="text-2xl font-mono text-slate-400">{icon}</span>
                <h3 className="font-mono text-xs font-bold text-slate-200">{field}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs text-slate-600 uppercase tracking-widest mb-2">Timeline</p>
            <h2 className="font-serif text-3xl text-slate-100 font-bold">Academic Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/30 via-violet-500/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map(({ year, title, desc, dot }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className={`w-6 h-6 rounded-full ${dot} flex-shrink-0 mt-0.5 shadow-lg`} />
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-slate-500 font-bold">{year}</span>
                    <h3 className="font-serif text-lg text-slate-100 font-semibold">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="glass-panel-3d rounded-2xl p-8 md:p-10 border border-amber-500/10">
          <p className="font-mono text-xs text-amber-400/50 uppercase tracking-widest mb-4">Philosophy</p>
          <blockquote className="font-serif text-xl md:text-2xl text-slate-300 italic leading-relaxed">
            The deepest engineering skill is not knowing how to build — it is knowing{' '}
            <span className="text-amber-400 not-italic font-semibold">why something works</span>.
            Every concept I study is a lens that sharpens how I see every problem.
          </blockquote>
        </div>
      </div>
    </div>
  )
}