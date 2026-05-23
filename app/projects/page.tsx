import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllContent } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Mathematical explorations and algorithmic projects.',
}

export default async function ProjectsPage() {
  const projects = await getAllContent('projects')

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-24">

        <div className="mb-14 space-y-3">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">Work</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-100">Projects</h1>
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            Not apps for users — demonstrations of mathematical understanding.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="font-mono text-slate-600 text-sm text-center py-20">No projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {projects.map(({ slug, metadata }) => (
              <Link href={`/projects/${slug}`} key={slug} className="group block">
                <article className="glass-panel-3d rounded-2xl p-7 border border-slate-800/40 hover:border-blue-500/20 transition-all duration-300 h-full flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{metadata.category as string}</span>
                  <h2 className="font-serif text-xl text-slate-100 group-hover:text-blue-300 transition-colors font-bold leading-snug">
                    {metadata.title as string}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{metadata.excerpt as string}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {(metadata.tags as string[])?.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-500 border border-slate-700/20">{t}</span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}