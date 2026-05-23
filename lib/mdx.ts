import fs   from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

/** All slugs for a content type */
export async function getFiles(type: 'blog' | 'projects') {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => ({ slug: filename.replace(/\.mdx$/, '') }))
}

/** Single file: frontmatter + raw MDX string */
export async function getFileBySlug(type: 'blog' | 'projects', slug: string) {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    metadata: {
      title:    (data.title    as string)   ?? 'Untitled',
      excerpt:  (data.excerpt  as string)   ?? '',
      category: (data.category as string)   ?? 'General',
      date:     (data.date     as string)   ?? '',
      tags:     (data.tags     as string[]) ?? [],
      ...data,
    },
    content,
  }
}

/** All content sorted newest-first */
export async function getAllContent(type: 'blog' | 'projects') {
  const slugs = await getFiles(type)

  const items = (
    await Promise.all(
      slugs.map(async ({ slug }) => {
        const file = await getFileBySlug(type, slug)
        return file ? { slug, metadata: file.metadata } : null
      })
    )
  ).filter(Boolean) as { slug: string; metadata: Record<string, unknown> }[]

  return items.sort(
    (a, b) =>
      new Date(b.metadata.date as string).getTime() -
      new Date(a.metadata.date as string).getTime()
  )
}