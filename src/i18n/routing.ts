import type { Locale } from './translations'

export type AppPage =
  | 'home'
  | 'resources'
  | 'community'
  | 'blog'
  | 'price'
  | 'link-building-services'
  | 'partners'
  | 'about'
  | 'terms'
  | 'privacy'
  | 'refund'
  | 'contact'
  | 'support'

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: 'zh', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'zh-tw', label: '繁体中文' },
]

export type ParsedRoute =
  | { locale: Locale; page: AppPage }
  | { locale: Locale; page: 'resource-detail'; slug: string }
  | { locale: Locale; page: 'article-detail'; slug: string }
  | { locale: Locale; page: 'blog-detail'; slug: string }

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
    case 'community':
      return `${prefix}/community.html`
    case 'blog':
      return `${prefix}/blog.html`
    case 'price':
      return `${prefix}/price.html`
    case 'link-building-services':
      return `${prefix}/link-building-services.html`
    case 'partners':
      return `${prefix}/partners.html`
    case 'about':
      return `${prefix}/about.html`
    case 'terms':
      return `${prefix}/terms.html`
    case 'privacy':
      return `${prefix}/privacy.html`
    case 'refund':
      return `${prefix}/Our-Process-Refund.html`
    case 'contact':
      return `${prefix}/contact.html`
    case 'support':
      return `${prefix}/support.html`
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

export function parsePathname(pathname: string): ParsedRoute {
  const normalizedPath = pathname === '/' ? '/index.html' : pathname.replace(/\/+$/, '') || '/index.html'
  const matchedLocale = localeOptions.find((option) => normalizedPath === `/${option.value}` || normalizedPath.startsWith(`/${option.value}/`))
  const locale = matchedLocale?.value ?? 'zh'
  const rest = matchedLocale ? normalizedPath.slice(`/${matchedLocale.value}`.length) || '/index.html' : normalizedPath
  const restLower = rest.toLowerCase()

  if (rest === '/index.html') {
    return { locale, page: 'home' as const }
  }
  if (restLower === '/resources.html') {
    return { locale, page: 'resources' as const }
  }
  if (restLower === '/community.html') {
    return { locale, page: 'community' as const }
  }
  if (restLower === '/blog.html') {
    return { locale, page: 'blog' as const }
  }
  if (restLower === '/price.html') {
    return { locale, page: 'price' as const }
  }
  if (restLower === '/link-building-services.html') {
    return { locale, page: 'link-building-services' as const }
  }
  if (restLower === '/partners.html') {
    return { locale, page: 'partners' as const }
  }
  if (restLower === '/about.html') {
    return { locale, page: 'about' as const }
  }
  if (restLower === '/terms.html') {
    return { locale, page: 'terms' as const }
  }
  if (restLower === '/privacy.html') {
    return { locale, page: 'privacy' as const }
  }
  if (restLower === '/our-process-refund.html') {
    return { locale, page: 'refund' as const }
  }
  if (restLower === '/contact.html') {
    return { locale, page: 'contact' as const }
  }
  if (restLower === '/support.html') {
    return { locale, page: 'support' as const }
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
    case 'community':
    case 'blog':
    case 'price':
    case 'link-building-services':
    case 'partners':
    case 'about':
    case 'terms':
    case 'privacy':
    case 'refund':
    case 'contact':
    case 'support':
      return buildPagePath(locale, parsed.page)
    case 'resource-detail':
      return buildResourcePath(locale, parsed.slug)
    case 'article-detail':
      return buildArticlePath(locale, parsed.slug)
    case 'blog-detail':
      return buildBlogArticlePath(locale, parsed.slug)
  }
}
