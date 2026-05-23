import { notFound }      from 'next/navigation'
import type { Metadata } from 'next'
import Link              from 'next/link'
import { MDXRemote }     from 'next-mdx-remote/rsc'
import remarkMath        from 'remark-math'
import rehypeKatex       from 'rehype-katex'
import { ArrowLeft }     from 'lucide-react'
import { getFileBySlug, getFiles } from '@/lib/mdx'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await getFiles('blog')
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getFileBySlug('blog', params.slug)
  if (!post) return { title: 'Not Found' }
  return { title: post.metadata.title, description: post.metadata.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getFileBySlug('blog', params.slug)
  if (!post) notFound()

  return (
    <div className="relative min-h-screen math-coordinate-grid">
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-28 pb-24">

        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-slate-300 transition-colors mb-10 group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          Back to Insights
        </Link>

        <article className="glass-panel-3d rounded-3xl p-8 md:p-12 border border-slate-800/40 shadow-2xl">
          <header className="border-b border-slate-800/50 pb-8 mb-8 space-y-4">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest block">
              {post.metadata.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-100 leading-tight">
              {post.metadata.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
              <span>{post.metadata.date}</span>
              {post.metadata.tags?.length > 0 && (
                <>
                  <span>·</span>
                  {post.metadata.tags.map((t: string) => (
                    <span key={t} className="text-purple-500/60">#{t}</span>
                  ))}
                </>
              )}
            </div>
            {post.metadata.excerpt && (
              <p className="text-slate-400 text-sm italic border-l-2 border-slate-700 pl-4 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}
          </header>

          <div className="prose prose-invert max-w-none mdx-content
            prose-headings:font-serif prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-slate-400 prose-p:leading-relaxed
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
            prose-strong:text-slate-200
            prose-blockquote:border-l-purple-500/40 prose-blockquote:text-slate-400 prose-blockquote:italic
            prose-hr:border-slate-800/40 prose-li:text-slate-400
            prose-pre:bg-slate-950/80 prose-pre:border prose-pre:border-slate-800/50 prose-pre:rounded-xl"
          >
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}