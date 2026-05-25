import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllContent } from '@/lib/mdx'
import { StaggerContainer, StaggerItem } from '@/components/ui/Stagger'
import AnimateIn from '@/components/ui/AnimateIn'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Mathematical explorations, algorithmic breakdowns, and analytical writing.',
}

export default async function BlogPage() {
  const posts = await getAllContent('blog')

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-24">

        <AnimateIn className="mb-14 space-y-3">
          <p className="font-mono text-xs text-slate-600 uppercase tracking-widest">Writing</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-100">Insights</h1>
          <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
            Mathematical explorations and algorithm breakdowns. Each post is a proof of understanding.
          </p>
        </AnimateIn>

        {posts.length === 0 ? (
          <p className="font-mono text-slate-600 text-sm text-center py-20">No posts yet.</p>
        ) : (
          <StaggerContainer className="space-y-4">
            {posts.map(({ slug, metadata }) => (
              <StaggerItem key={slug}>
                <Link href={`/blog/${slug}`} className="group block">
                  <article className="glass-panel-3d rounded-2xl p-6 border border-slate-800/40 hover:border-purple-500/20 transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">{metadata.category as string}</span>
                          <span className="text-[10px] font-mono text-slate-600">{metadata.date as string}</span>
                        </div>
                        <h2 className="font-serif text-xl text-slate-100 group-hover:text-purple-300 transition-colors font-semibold">
                          {metadata.title as string}
                        </h2>
                        <p className="text-sm text-slate-500 leading-relaxed">{metadata.excerpt as string}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(metadata.tags as string[])?.map((t) => (
                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-500 border border-slate-700/30">{t}</span>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  )
}