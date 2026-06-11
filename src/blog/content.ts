type FrontmatterValue = string | boolean | string[]

export type BlogPost = {
  slug: string
  title: string
  description: string
  image: string
  publishDate: string
  category: string
  tags: string[]
  featured: boolean
  readingTime: string
  content: string
}

const blogModules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseScalar(value: string): FrontmatterValue {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string')
      }
    } catch {
      return []
    }
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(raw: string) {
  const normalizedRaw = raw.replace(/^\uFEFF/, '')
  const candidate = normalizedRaw.startsWith('---') ? normalizedRaw : normalizedRaw.trimStart()
  const match = candidate.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { meta: {}, content: normalizedRaw.trim() }
  }

  const [, frontmatter, content] = match
  const meta: Record<string, FrontmatterValue> = {}

  frontmatter.split(/\r?\n/).forEach((line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex <= 0) return

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    meta[key] = parseScalar(value)
  })

  return { meta, content: content.trim() }
}

function getSlug(filePath: string) {
  const filename = filePath.split('/').pop() ?? filePath
  return filename.replace(/\.md$/i, '')
}

function normalizePost(filePath: string, raw: string): BlogPost {
  const { meta, content } = parseFrontmatter(raw)

  return {
    slug: getSlug(filePath),
    title: typeof meta.title === 'string' ? meta.title : getSlug(filePath),
    description: typeof meta.description === 'string' ? meta.description : '',
    image: typeof meta.image === 'string' ? meta.image : '',
    publishDate: typeof meta.publishDate === 'string' ? meta.publishDate : '',
    category: typeof meta.category === 'string' ? meta.category : '',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    featured: meta.featured === true,
    readingTime: typeof meta.readingTime === 'string' ? meta.readingTime : '',
    content,
  }
}

const posts = Object.entries(blogModules)
  .map(([filePath, raw]) => normalizePost(filePath, raw))
  .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

export function listBlogPosts() {
  return posts
}

export function listBlogCategories() {
  return Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort((a, b) => a.localeCompare(b))
}

export function getBlogPost(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null
}
