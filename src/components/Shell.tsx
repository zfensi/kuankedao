import { useEffect, type ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Languages, Moon, Sun } from 'lucide-react'
import { getTrustPageContent, getTrustPageLinks } from '@/content/trustPages'
import { BrandLogo } from '@/components/BrandLogo'
import { cn } from '@/lib/utils'
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

function ensureJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-seo-id="${id}"]`)
  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    element.setAttribute('data-seo-id', id)
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(data)
}

function removeJsonLd(id: string) {
  const element = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-seo-id="${id}"]`)
  element?.parentElement?.removeChild(element)
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
    ensureMetaContent('property', 'og:url', absoluteUrl)
    ensureMetaContent('property', 'og:locale', locale === 'zh' ? 'zh_CN' : locale.replace('-', '_'))
    ensureMetaContent('name', 'twitter:title', title)
    ensureMetaContent('name', 'twitter:description', description)

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

    ensureJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: t('brandName'),
      alternateName: t('brandNameEn'),
      url: window.location.origin,
      description,
    })

    ensureJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: t('brandName'),
      url: window.location.origin,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      description,
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

    ensureJsonLd('breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    })

    if (currentRoute.page === 'home' || currentRoute.page === 'resources') {
      const faqData =
        currentRoute.page === 'home'
          ? [
              {
                '@type': 'Question',
                name:
                  locale === 'zh-tw'
                    ? '首頁主要覆蓋哪些搜尋詞？'
                    : locale === 'zh'
                      ? '首页主要覆盖哪些搜索词？'
                      : 'What search terms does the homepage target?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    locale === 'zh-tw'
                      ? '首頁重點承接 Guest Post、SEO 外鏈、免費外鏈、外鏈平台、Google 外鏈與高權重外鏈等搜尋需求。'
                      : locale === 'zh'
                        ? '首页重点承接 Guest Post、SEO 外链、免费外链、外链平台、谷歌外链与高权重外链等搜索需求。'
                        : 'The homepage targets terms such as guest post, free backlinks, dofollow backlinks, link building services, and related discovery keywords.',
                },
              },
              {
                '@type': 'Question',
                name:
                  locale === 'zh-tw'
                    ? '可以先看免費外鏈和投稿站點嗎？'
                    : locale === 'zh'
                      ? '可以先看免费外链和投稿站点吗？'
                      : 'Can users start with free backlinks and guest post sites?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    locale === 'zh-tw'
                      ? '可以，首頁會先把免費外鏈、Guest Post 與外鏈交換相關入口集中展示。'
                      : locale === 'zh'
                        ? '可以，首页会先把免费外链、Guest Post 与外链交换相关入口集中展示。'
                        : 'Yes. The homepage highlights free backlinks, guest post, and backlink exchange entry points first.',
                },
              },
            ]
          : [
              {
                '@type': 'Question',
                name:
                  locale === 'zh-tw'
                    ? '資源頁可以找 Guest Post 站點嗎？'
                    : locale === 'zh'
                      ? '资源页可以找 Guest Post 站点吗？'
                      : 'Can this page be used to find guest post sites?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    locale === 'zh-tw'
                      ? '可以，資源頁支援 Guest Post、投稿站點、免費外鏈與外鏈交換等方向的篩選。'
                      : locale === 'zh'
                        ? '可以，资源页支持 Guest Post、投稿站点、免费外链与外链交换等方向的筛选。'
                        : 'Yes. The resources page supports guest post sites, free backlinks, backlink exchange, and related filtering.',
                },
              },
              {
                '@type': 'Question',
                name:
                  locale === 'zh-tw'
                    ? '可以按分類與地區收斂嗎？'
                    : locale === 'zh'
                      ? '可以按分类与地区收敛吗？'
                      : 'Can users narrow results by category and region?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    locale === 'zh-tw'
                      ? '可以，資源頁支援關鍵詞、分類與地區篩選。'
                      : locale === 'zh'
                        ? '可以，资源页支持关键词、分类与地区筛选。'
                        : 'Yes. The resources page supports keyword, category, and region filters.',
                },
              },
            ]

      ensureJsonLd('faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqData,
      })
    } else {
      removeJsonLd('faq')
    }
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
