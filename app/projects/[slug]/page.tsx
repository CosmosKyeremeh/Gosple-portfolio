import { notFound }      from 'next/navigation'
import type { Metadata } from 'next'
import Link              from 'next/link'
import { MDXRemote }     from 'next-mdx-remote/rsc'
import remarkMath        from 'remark-math'
import rehypeKatex       from 'rehype-katex'
import { ArrowLeft }     from 'lucide-react'
import { getFileBySlug, getFiles } from '@/lib/mdx'

// ✅ params is now a Promise in Next.js 15
interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getFiles('projects')
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params                           // ✅ await first
  const project = await getFileBySlug('projects', slug)
  if (!project) return { title: 'Not Found' }
  return { title: project.metadata.title, description: project.metadata.excerpt }
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params                           // ✅ await first
  const project = await getFileBySlug('projects', slug)
  if (!project) notFound()

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-24">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-300 transition-colors mb-10 group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>

        <article className="glass-panel-3d rounded-3xl p-8 md:p-12 border border-slate-800/40 shadow-2xl">
          <header className="border-b border-slate-800/50 pb-8 mb-8 space-y-4">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block">
              {project!.metadata.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 leading-tight">
              {project!.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
              <span>{project!.metadata.date}</span>
              {project!.metadata.tags?.length > 0 && (
                <>
                  <span>·</span>
                  {project!.metadata.tags.map((t: string) => (
                    <span key={t} className="text-blue-500/60">#{t}</span>
                  ))}
                </>
              )}
            </div>
            {project!.metadata.excerpt && (
              <p className="text-slate-400 text-sm italic border-l-2 border-blue-800/50 pl-4 leading-relaxed">
                {project!.metadata.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-invert max-w-none mdx-content
            prose-headings:font-serif prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-slate-400 prose-p:leading-relaxed
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-slate-200
            prose-blockquote:border-l-blue-500/40 prose-blockquote:text-slate-400 prose-blockquote:italic
            prose-hr:border-slate-800/40 prose-li:text-slate-400
            prose-pre:bg-slate-950/80 prose-pre:border prose-pre:border-slate-800/50 prose-pre:rounded-xl"
          >
            <MDXRemote
              source={project!.content}
              options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}