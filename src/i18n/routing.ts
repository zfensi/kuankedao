import type { Locale } from './translations'

export type AppPage = 'home' | 'resources' | 'request' | 'community' | 'blog' | 'partners' | 'about'

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'zh', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'zh-tw', label: '繁体中文' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
]

function getLocalePrefix(locale: Locale) {
  return locale === 'zh' ? '' : `/${locale}`
}

export function buildPagePath(locale: Locale, page: AppPage) {
  const prefix = getLocalePrefix(locale)

  switch (page) {
    case 'home':
      return `${prefix}/index.html`
    case 'resources':
      return `${prefix}/resources.html`
    case 'request':
      return `${prefix}/request.html`
    case 'community':
      return `${prefix}/community.html`
    case 'blog':
      return `${prefix}/blog.html`
    case 'partners':
      return `${prefix}/partners.html`
    case 'about':
      return `${prefix}/about.html`
  }
}

export function buildResourcePath(locale: Locale, slug: string) {
  return `${getLocalePrefix(locale)}/resources/${slug}.html`
}

export function buildArticlePath(locale: Locale, slug: string) {
  return `${getLocalePrefix(locale)}/community/${slug}.html`
}

export function buildBlogArticlePath(locale: Locale, slug: string) {
  return `${getLocalePrefix(locale)}/blog/${slug}.html`
}

function parsePathname(pathname: string) {
  const normalizedPath = pathname === '/' ? '/index.html' : pathname.replace(/\/+$/, '') || '/index.html'
  const matchedLocale = localeOptions.find((option) => normalizedPath === `/${option.value}` || normalizedPath.startsWith(`/${option.value}/`))
  const locale = matchedLocale?.value ?? 'zh'
  const rest = matchedLocale ? normalizedPath.slice(`/${matchedLocale.value}`.length) || '/index.html' : normalizedPath

  if (rest === '/index.html') {
    return { locale, page: 'home' as const }
  }
  if (rest === '/resources.html') {
    return { locale, page: 'resources' as const }
  }
  if (rest === '/request.html') {
    return { locale, page: 'request' as const }
  }
  if (rest === '/community.html') {
    return { locale, page: 'community' as const }
  }
  if (rest === '/blog.html') {
    return { locale, page: 'blog' as const }
  }
  if (rest === '/partners.html') {
    return { locale, page: 'partners' as const }
  }
  if (rest === '/about.html') {
    return { locale, page: 'about' as const }
  }

  const resourceMatch = rest.match(/^\/resources\/([^/]+)\.html$/)
  if (resourceMatch) {
    return { locale, page: 'resource-detail' as const, slug: resourceMatch[1] }
  }

  const articleMatch = rest.match(/^\/community\/([^/]+)\.html$/)
  if (articleMatch) {
    return { locale, page: 'article-detail' as const, slug: articleMatch[1] }
  }

  const blogMatch = rest.match(/^\/blog\/([^/]+)\.html$/)
  if (blogMatch) {
    return { locale, page: 'blog-detail' as const, slug: blogMatch[1] }
  }

  return { locale, page: 'home' as const }
}

export function detectLocaleFromPathname(pathname: string): Locale {
  return parsePathname(pathname).locale
}

export function translatePathname(pathname: string, locale: Locale) {
  const parsed = parsePathname(pathname)

  switch (parsed.page) {
    case 'home':
    case 'resources':
    case 'request':
    case 'community':
    case 'blog':
    case 'partners':
    case 'about':
      return buildPagePath(locale, parsed.page)
    case 'resource-detail':
      return buildResourcePath(locale, parsed.slug)
    case 'article-detail':
      return buildArticlePath(locale, parsed.slug)
    case 'blog-detail':
      return buildBlogArticlePath(locale, parsed.slug)
  }
}
