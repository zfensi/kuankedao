import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useI18n } from '@/i18n/useI18n'
import { buildPagePath, buildResourcePath } from '@/i18n/routing'
import { useManagedJsonLd } from '@/lib/seo'
import { listResources } from '@/api/kuankedao'
import type { ResourceItem } from '@/api/types'
import { formatCategory } from '@/utils/category'

export default function Resources() {
  const { t, locale } = useI18n()
  const [sp, setSp] = useSearchParams()
  const [items, setItems] = useState<ResourceItem[] | null>(null)
  const [total, setTotal] = useState<number>(0)
  const isGlobalLocale = ['en', 'ja', 'ko'].includes(locale)

  const keyword = sp.get('keyword') ?? ''
  const category = sp.get('category') ?? ''
  const region = sp.get('region') ?? ''

  useEffect(() => {
    let alive = true
    setItems(null)
    listResources({ keyword: keyword || undefined, category: category || undefined, region: region || undefined, page: 1 })
      .then((res) => {
        if (!alive) return
        setItems(res.items)
        setTotal(res.total)
      })
      .catch(() => {
        if (!alive) return
        setItems([])
        setTotal(0)
      })
    return () => {
      alive = false
    }
  }, [keyword, category, region])

  const categories = useMemo(() => {
    const set = new Set<string>()
    ;(items ?? []).forEach((x) => set.add(x.category))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [items])

  const regions = useMemo(() => {
    const set = new Set<string>()
    ;(items ?? []).forEach((x) => x.regions.forEach((r) => set.add(r)))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [items])

  const seoKeywords = useMemo(() => {
    if (isGlobalLocale) {
      return ['guest post sites', 'guest post opportunities', 'write for us', 'free backlinks', 'backlink exchange', 'dofollow backlinks', 'high authority backlinks']
    }

    if (locale === 'zh-tw') {
      return ['Guest Post', '外鏈平台', '免費外鏈', '外鏈交換', 'Google 外鏈', 'SEO 外鏈', '高權重外鏈']
    }

    return ['Guest Post', '外链平台', '免费外链', '外链交换', '谷歌外链', 'SEO 外链', '高权重外链']
  }, [isGlobalLocale, locale])

  const guideBlocks = useMemo(() => {
    if (isGlobalLocale) {
      return [
        {
          title: 'Find guest post sites faster',
          desc: 'Use the resource page to narrow down guest post sites, guest post opportunities, and write for us style outreach paths before doing manual contact work.',
        },
        {
          title: 'Compare free backlinks and exchange options',
          desc: 'Not every demand starts with a purchase. This page also works for free backlinks, backlink exchange opportunities, and lower-cost discovery.',
        },
        {
          title: 'Filter for quality and commercial intent',
          desc: 'When you already know the direction, this page helps you move from broad exploration to dofollow backlinks, high authority backlinks, and provider shortlists.',
        },
      ]
    }

    if (locale === 'zh-tw') {
      return [
        {
          title: '先找 Guest Post 站點與投稿機會',
          desc: '資源頁適合先整理 guest post sites、guest post opportunities、write for us 這類投稿站點與合作機會，再進一步篩選。',
        },
        {
          title: '也適合看免費外鏈與交換路徑',
          desc: '不是每個需求都要直接成交。這裡也適合先看免費外鏈、外鏈交換與低成本試探型合作資源。',
        },
        {
          title: '再往高權重與服務合作延伸',
          desc: '如果你已有明確方向，資源頁也可以用來縮小到高權重外鏈、Google 外鏈、dofollow backlinks 與服務商篩選。',
        },
      ]
    }

    return [
      {
        title: '先找 Guest Post 站点与投稿机会',
        desc: '资源页适合先整理 guest post sites、guest post opportunities、write for us 这类投稿站点与合作机会，再进一步筛选。',
      },
      {
        title: '也适合看免费外链与交换路径',
        desc: '不是每个需求都要直接成交。这里也适合先看免费外链、外链交换与低成本试探型合作资源。',
      },
      {
        title: '再往高权重与服务合作延伸',
        desc: '如果你已有明确方向，资源页也可以用来缩小到高权重外链、谷歌外链、dofollow backlinks 与服务商筛选。',
      },
    ]
  }, [isGlobalLocale, locale])

  const audienceItems = useMemo(() => {
    if (isGlobalLocale) {
      return [
        'SEO teams building a list of guest post and backlink targets.',
        'Brands comparing free backlink sources and paid outreach options.',
        'Agencies or service providers reviewing categories, regions, and fit before contact.',
      ]
    }

    if (locale === 'zh-tw') {
      return [
        '適合正在整理 Guest Post、網站投稿外鏈與高權重外鏈名單的 SEO 團隊。',
        '適合比較免費外鏈、Google 外鏈與付費外鏈合作路徑的品牌方。',
        '也適合服務商和渠道方快速查看分類、地區與合作匹配度。',
      ]
    }

    return [
      '适合正在整理 Guest Post、网站投稿外链与高权重外链名单的 SEO 团队。',
      '适合比较免费外链、谷歌外链与付费外链合作路径的品牌方。',
      '也适合服务商和渠道方快速查看分类、地区与合作匹配度。',
    ]
  }, [isGlobalLocale, locale])

  const faqItems = useMemo(() => {
    if (isGlobalLocale) {
      return [
        {
          q: 'Can I use this page to find guest post sites?',
          a: 'Yes. The resource page is built to support searches around guest post sites, guest post opportunities, and write for us style outreach.',
        },
        {
          q: 'Does it only list paid options?',
          a: 'No. It also supports free backlinks, backlink exchange paths, and early-stage exploration before a paid decision.',
        },
        {
          q: 'Can I filter by category and region?',
          a: 'Yes. You can use keyword, category, and region filters to narrow down more relevant backlink resources.',
        },
      ]
    }

    if (locale === 'zh-tw') {
      return [
        {
          q: '這個頁面可以用來找 Guest Post 站點嗎？',
          a: '可以。資源頁本來就適合承接 guest post sites、guest post opportunities 與 write for us 類搜尋需求。',
        },
        {
          q: '這裡只有付費資源嗎？',
          a: '不是。也包含免費外鏈、外鏈交換與前期探索型合作路徑，方便先做低成本篩選。',
        },
        {
          q: '可以按分類和地區篩選嗎？',
          a: '可以。你可以結合關鍵詞、分類與地區快速收斂到更合適的外鏈資源。',
        },
      ]
    }

    return [
      {
        q: '这个页面可以用来找 Guest Post 站点吗？',
        a: '可以。资源页本来就适合承接 guest post sites、guest post opportunities 与 write for us 类搜索需求。',
      },
      {
        q: '这里只有付费资源吗？',
        a: '不是。也包含免费外链、外链交换与前期探索型合作路径，方便先做低成本筛选。',
      },
      {
        q: '可以按分类和地区筛选吗？',
        a: '可以。你可以结合关键词、分类与地区快速收敛到更合适的外链资源。',
      },
    ]
  }, [isGlobalLocale, locale])

  const listSchema = useMemo(() => {
    if (items === null) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t('resourcesTitle'),
      url: new URL(`${buildPagePath(locale, 'resources')}${window.location.search}`, window.location.origin).toString(),
      numberOfItems: items.length,
      itemListElement: items.slice(0, 12).map((item: ResourceItem, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(buildResourcePath(locale, item.slug), window.location.origin).toString(),
        name: item.name,
        description: item.summary,
      })),
    }
  }, [items, locale, t])

  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    }),
    [faqItems],
  )

  useManagedJsonLd('resources-list', listSchema)
  useManagedJsonLd('resources-faq', faqSchema)

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((item) => (
              <Badge key={item} className="border-transparent bg-[rgba(14,165,233,0.08)] text-[rgb(var(--fg))]">
                {item}
              </Badge>
            ))}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-4xl">{t('resourcesTitle')}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">
            {t('resourcesDesc')} {total ? `(${total})` : ''}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">
            {isGlobalLocale
              ? 'This page is designed to cover guest post sites, free backlinks, backlink exchange, dofollow backlinks, and other link building discovery scenarios in one place.'
              : locale === 'zh-tw'
                ? '這個頁面不只是資源列表，也用來承接 Guest Post、免費外鏈、外鏈交換、Google 外鏈與高權重外鏈等搜尋需求。'
                : '这个页面不只是资源列表，也用来承接 Guest Post、免费外链、外链交换、谷歌外链与高权重外链等搜索需求。'}
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">
            {isGlobalLocale
              ? 'Browse and filter backlink resources'
              : locale === 'zh-tw'
                ? '瀏覽與篩選外鏈資源'
                : '浏览与筛选外链资源'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[rgb(var(--muted))]">{t('searchPlaceholder')}</p>
        </div>
        <div className="grid w-full gap-2 sm:max-w-xl sm:grid-cols-3">
          <Input
            value={keyword}
            placeholder={t('searchPlaceholder')}
            onChange={(e) => {
              sp.set('keyword', e.target.value)
              if (!e.target.value) sp.delete('keyword')
              setSp(sp, { replace: true })
            }}
          />
          <Select
            value={category}
            onChange={(e) => {
              sp.set('category', e.target.value)
              if (!e.target.value) sp.delete('category')
              setSp(sp, { replace: true })
            }}
          >
            <option value="">{t('filterCategory')}: {t('filterAll')}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {formatCategory(c, locale)}
              </option>
            ))}
          </Select>
          <Select
            value={region}
            onChange={(e) => {
              sp.set('region', e.target.value)
              if (!e.target.value) sp.delete('region')
              setSp(sp, { replace: true })
            }}
          >
            <option value="">{t('filterRegion')}: {t('filterAll')}</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {guideBlocks.map((block) => (
          <Card key={block.title} className="p-5">
            <div className="text-lg font-medium tracking-tight text-[rgb(var(--fg))]">{block.title}</div>
            <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{block.desc}</p>
          </Card>
        ))}
      </section>

      <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items === null &&
          Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="h-4 w-32 animate-pulse rounded bg-[rgb(var(--border))]" />
              <div className="mt-3 h-3 w-52 animate-pulse rounded bg-[rgb(var(--border))]" />
            </Card>
          ))}
        {items?.map((r) => (
          <Link key={r.id} to={buildResourcePath(locale, r.slug)}>
            <Card className="p-4 transition hover:border-[rgb(var(--accent))]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{r.name}</div>
                  <div className="mt-1 text-xs text-[rgb(var(--muted))]">{r.summary}</div>
                </div>
                {r.recommended && <Badge className="text-[rgb(var(--fg))]">Top</Badge>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{formatCategory(r.category, locale)}</Badge>
                {r.tags.slice(0, 2).map((x) => (
                  <Badge key={x}>{x}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-[rgb(var(--muted))]">{r.priceRange}</div>
                <div className="text-xs text-[rgb(var(--muted))]">{t('actionView')}</div>
              </div>
            </Card>
          </Link>
        ))}
        {items !== null && items.length === 0 && (
          <Card className="p-6 md:col-span-2 lg:col-span-3">
            <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('emptyTitle')}</div>
            <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('emptyDesc')}</div>
          </Card>
        )}
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
            {isGlobalLocale
              ? 'Who This Page Helps'
              : locale === 'zh-tw'
                ? '這頁適合誰'
                : '这页适合谁'}
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">
            {isGlobalLocale
              ? 'Built for exploration first, conversion second'
              : locale === 'zh-tw'
                ? '先幫你探索，再幫你收斂到合作'
                : '先帮你探索，再帮你收敛到合作'}
          </h2>
          <div className="mt-5 space-y-3">
            {audienceItems.map((item) => (
              <div key={item} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 p-4 text-sm leading-7 text-[rgb(var(--muted))]">
                {item}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
            {isGlobalLocale
              ? 'Action'
              : locale === 'zh-tw'
                ? '下一步'
                : '下一步'}
          </div>
          <div className="mt-4 space-y-4">
            <Link to={buildPagePath(locale, 'contact')} className="block rounded-2xl border border-[rgb(var(--border))] p-4 transition hover:border-[rgb(var(--accent))]">
              <div className="text-sm font-medium text-[rgb(var(--fg))]">
                {isGlobalLocale ? 'Contact Us' : locale === 'zh-tw' ? '聯絡我們' : '联系我们'}
              </div>
              <div className="mt-2 text-xs leading-6 text-[rgb(var(--muted))]">
                {isGlobalLocale
                  ? 'If you already know your target keywords, budget, and market, contact us directly to continue the discussion.'
                  : locale === 'zh-tw'
                    ? '如果你已經有關鍵詞方向、預算與目標市場，可以直接聯絡我們繼續溝通。'
                    : '如果你已经有关键词方向、预算与目标市场，可以直接联系我们继续沟通。'}
              </div>
            </Link>
            <Link to={buildPagePath(locale, 'partners')} className="block rounded-2xl border border-[rgb(var(--border))] p-4 transition hover:border-[rgb(var(--accent))]">
              <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('navPartners')}</div>
              <div className="mt-2 text-xs leading-6 text-[rgb(var(--muted))]">
                {isGlobalLocale
                  ? 'Providers can also join the platform and present backlink, guest post, and outreach capabilities.'
                  : locale === 'zh-tw'
                    ? '如果你是服務商，也可以入駐展示 Guest Post、外鏈與站外推廣能力。'
                    : '如果你是服务商，也可以入驻展示 Guest Post、外链与站外推广能力。'}
              </div>
            </Link>
          </div>
        </Card>
      </section>

      <section>
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">
            {isGlobalLocale
              ? 'Common questions about backlink resources'
              : locale === 'zh-tw'
                ? '關於外鏈資源頁的常見問題'
                : '关于外链资源页的常见问题'}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqItems.map((item) => (
            <Card key={item.q} className="p-5">
              <div className="text-base font-medium tracking-tight text-[rgb(var(--fg))]">{item.q}</div>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
