import { useEffect, type ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Languages, Moon, Sun } from 'lucide-react'
import { getTrustPageContent, getTrustPageLinks } from '@/content/trustPages'
import { BrandLogo } from '@/components/BrandLogo'
import { cn } from '@/lib/utils'
import { removeJsonLd, upsertJsonLd } from '@/lib/seo'
import { useI18n } from '@/i18n/useI18n'
import { buildPagePath, localeOptions, parsePathname, translatePathname } from '@/i18n/routing'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'

const linkBase =
  'rounded-lg px-3 py-2 text-sm text-[rgb(var(--muted))] transition hover:bg-[rgb(var(--card))] hover:text-[rgb(var(--fg))]'

function ensureMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function ensureLinkTag(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    if (hreflang) {
      element.setAttribute('hreflang', hreflang)
    }
    element.setAttribute('data-managed-seo', 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function Shell(props: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, locale, setLocale } = useI18n()
  const { toggleTheme, isDark } = useTheme()
  const trustLinks = getTrustPageLinks(locale)
  const currentRoute = parsePathname(location.pathname)

  useEffect(() => {
    const pathWithoutQuery = location.pathname || '/index.html'
    const absoluteUrl = new URL(`${pathWithoutQuery}${location.search}`, window.location.origin).toString()
    const logoUrl = new URL('/icon-512.svg', window.location.origin).toString()
    const organizationId = `${window.location.origin}#organization`
    const websiteId = `${window.location.origin}#website`
    const breadcrumbId = `${absoluteUrl}#breadcrumb`
    const webpageId = `${absoluteUrl}#webpage`

    let title = t('siteTitle')
    let description = t('siteDescription')

    switch (currentRoute.page) {
      case 'home':
        title = t('siteTitle')
        description = t('siteDescription')
        break
      case 'resources':
        title = t('seoResourcesTitle')
        description = t('seoResourcesDescription')
        break
      case 'partners':
        title = t('seoPartnersTitle')
        description = t('seoPartnersDescription')
        break
      case 'community':
        title = t('seoCommunityTitle')
        description = t('seoCommunityDescription')
        break
      case 'blog':
        title = t('seoBlogTitle')
        description = t('seoBlogDescription')
        break
      case 'price':
        title = t('seoPriceTitle')
        description = t('seoPriceDescription')
        break
      case 'link-building-services':
        title = t('seoLinkBuildingServicesTitle')
        description = t('seoLinkBuildingServicesDescription')
        break
      case 'about':
        title = t('seoAboutTitle')
        description = t('seoAboutDescription')
        break
      case 'terms':
      case 'privacy':
      case 'refund':
      case 'contact':
      case 'support': {
        const content = getTrustPageContent(locale, currentRoute.page)
        title = `${content.title}${t('seoTrustTitleSuffix')}`
        description = content.intro
        break
      }
      case 'resource-detail':
        title = t('seoResourceDetailTitle')
        description = t('seoResourceDetailDescription')
        break
      case 'article-detail':
        title = t('seoArticleDetailTitle')
        description = t('seoArticleDetailDescription')
        break
      case 'blog-detail':
        title = t('seoBlogDetailTitle')
        description = t('seoBlogDetailDescription')
        break
    }

    document.title = title
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale
    ensureMetaContent('name', 'description', description)
    ensureMetaContent('name', 'keywords', t('siteKeywords'))
    ensureMetaContent('property', 'og:title', title)
    ensureMetaContent('property', 'og:description', description)
    ensureMetaContent('property', 'og:type', 'website')
    ensureMetaContent('property', 'og:url', absoluteUrl)
    ensureMetaContent('property', 'og:image', logoUrl)
    ensureMetaContent('property', 'og:locale', locale === 'zh' ? 'zh_CN' : locale.replace('-', '_'))
    ensureMetaContent('name', 'twitter:card', 'summary')
    ensureMetaContent('name', 'twitter:title', title)
    ensureMetaContent('name', 'twitter:description', description)
    ensureMetaContent('name', 'twitter:image', logoUrl)

    document.head
      .querySelectorAll('link[data-managed-seo="true"]')
      .forEach((element) => element.parentElement?.removeChild(element))

    ensureLinkTag('canonical', absoluteUrl)
    localeOptions.forEach((option) => {
      const href = new URL(`${translatePathname(location.pathname, option.value)}${location.search}`, window.location.origin).toString()
      const hreflang = option.value === 'zh' ? 'zh-CN' : option.value
      ensureLinkTag('alternate', href, hreflang)
    })
    ensureLinkTag('alternate', absoluteUrl, 'x-default')

    upsertJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': organizationId,
      name: t('brandName'),
      alternateName: t('brandNameEn'),
      url: window.location.origin,
      description,
      email: 'hi@kuankedao.com',
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hi@kuankedao.com',
          url: new URL(buildPagePath(locale, 'contact'), window.location.origin).toString(),
          availableLanguage: localeOptions.map((option) => (option.value === 'zh' ? 'zh-CN' : option.value)),
        },
      ],
    })

    upsertJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: t('brandName'),
      url: window.location.origin,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      description,
      publisher: {
        '@id': organizationId,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${new URL(buildPagePath(locale, 'resources'), window.location.origin).toString()}?keyword={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    })

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navHome'),
        item: new URL(buildPagePath(locale, 'home'), window.location.origin).toString(),
      },
    ]

    if (currentRoute.page !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: absoluteUrl,
      })
    }

    upsertJsonLd('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: breadcrumbItems,
    })

    const pageType =
      currentRoute.page === 'about'
        ? 'AboutPage'
        : currentRoute.page === 'contact'
          ? 'ContactPage'
          : currentRoute.page === 'resources' || currentRoute.page === 'community' || currentRoute.page === 'blog'
            ? 'CollectionPage'
            : 'WebPage'

    upsertJsonLd('webpage', {
      '@context': 'https://schema.org',
      '@type': pageType,
      '@id': webpageId,
      url: absoluteUrl,
      name: title,
      description,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': organizationId,
      },
      breadcrumb: {
        '@id': breadcrumbId,
      },
    })

    removeJsonLd('faq')
  }, [t, locale, location.pathname, location.search, currentRoute.page])

  const items = [
    { to: buildPagePath(locale, 'home'), label: t('navHome') },
    ...(locale === 'en' ? [] : [{ to: '/en/index.html', label: 'link building services' }]),
    { to: buildPagePath(locale, 'resources'), label: t('navResources') },
    { to: buildPagePath(locale, 'price'), label: t('navPrice') },
    { to: buildPagePath(locale, 'blog'), label: t('navBlog') },
    { to: buildPagePath(locale, 'about'), label: t('navAbout') },
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <BrandLogo className="hidden shrink-0 sm:inline-flex" />
          <BrandLogo compact className="shrink-0 sm:hidden" />

          <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(linkBase, isActive && 'bg-[rgb(var(--card))] text-[rgb(var(--fg))]')
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <Select
                aria-label={t('langLabel')}
                className="w-28 sm:w-32"
                value={locale}
                onChange={(event) => {
                  const nextLocale = event.target.value as typeof locale
                  setLocale(nextLocale)
                  navigate(`${translatePathname(location.pathname, nextLocale)}${location.search}`)
                }}
              >
                {localeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={t('themeLabel')}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
            <div className="flex flex-1 flex-wrap gap-1">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  className={({ isActive }) =>
                    cn('rounded-lg px-3 py-2 text-xs', isActive ? 'bg-[rgb(var(--card))]' : 'text-[rgb(var(--muted))]')
                  }
                >
                  {it.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{props.children}</main>

      <footer className="border-t border-[rgb(var(--border))]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-xs text-[rgb(var(--muted))] md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div>{t('footerNote')}</div>
            <a href="mailto:hi@kuankedao.com" className="inline-flex items-center gap-1 hover:text-[rgb(var(--fg))] hover:underline">
              hi@kuankedao.com
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {trustLinks.map((item) => (
              <NavLink
                key={item.pageId}
                to={buildPagePath(locale, item.pageId)}
                className={({ isActive }) =>
                  cn(
                    'rounded-full border border-[rgb(var(--border))] px-3 py-1.5 transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--fg))]',
                    isActive && 'border-[rgb(var(--accent))] text-[rgb(var(--fg))]',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
