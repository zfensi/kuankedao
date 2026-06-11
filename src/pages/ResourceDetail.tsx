import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/useI18n'
import { buildPagePath, buildResourcePath } from '@/i18n/routing'
import { useManagedJsonLd } from '@/lib/seo'
import { getResource } from '@/api/kuankedao'
import type { ResourceDetailResponse } from '@/api/types'
import { formatCategory } from '@/utils/category'

export default function ResourceDetail() {
  const { t, locale } = useI18n()
  const { slug } = useParams()
  const [data, setData] = useState<ResourceDetailResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const contactLabel = locale === 'en' ? 'Contact Us' : locale === 'zh-tw' ? '聯絡我們' : '联系我们'
  const serviceSchema = useMemo(() => {
    if (!data) {
      return null
    }

    const pageUrl = new URL(buildResourcePath(locale, data.slug), window.location.origin).toString()

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: data.name,
      description: data.description,
      category: formatCategory(data.category, locale),
      serviceType: formatCategory(data.category, locale),
      areaServed: data.regions,
      keywords: data.tags,
      provider: {
        '@type': 'Organization',
        name: 'Kuankedao',
        url: window.location.origin,
      },
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        availability: 'https://schema.org/InStock',
        description: data.priceRange,
      },
      url: pageUrl,
    }
  }, [data, locale])

  useManagedJsonLd('resource-service', serviceSchema)

  useEffect(() => {
    if (!slug) return
    let alive = true
    setStatus('loading')
    getResource(slug)
      .then((res) => {
        if (!alive) return
        setData(res)
        setStatus('ready')
      })
      .catch(() => {
        if (!alive) return
        setData(null)
        setStatus('error')
      })
    return () => {
      alive = false
    }
  }, [slug])

  if (status === 'loading') {
    return (
      <Card className="p-6">
        <div className="h-5 w-40 animate-pulse rounded bg-[rgb(var(--border))]" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-[rgb(var(--border))]" />
      </Card>
    )
  }

  if (status === 'error' || !data) {
    return (
      <Card className="p-6">
        <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('emptyTitle')}</div>
        <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('emptyDesc')}</div>
        <div className="mt-4">
          <Link to={buildPagePath(locale, 'resources')}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              {t('navResources')}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link to={buildPagePath(locale, 'resources')} className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
          <ChevronLeft className="h-4 w-4" />
          {t('navResources')}
        </Link>
        <Link to={buildPagePath(locale, 'contact')}>
          <Button size="sm">{contactLabel}</Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{data.name}</div>
            <div className="mt-2 text-sm text-[rgb(var(--muted))]">{data.description}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{formatCategory(data.category, locale)}</Badge>
              {data.tags.map((x) => (
                <Badge key={x}>{x}</Badge>
              ))}
              {data.regions.map((x) => (
                <Badge key={x}>{x}</Badge>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 lg:w-64">
            <div className="text-xs text-[rgb(var(--muted))]">{t('filterCategory')}</div>
            <div className="mt-1 text-sm font-medium text-[rgb(var(--fg))]">{formatCategory(data.category, locale)}</div>
            <div className="mt-4 text-xs text-[rgb(var(--muted))]">{t('labelPrice')}</div>
            <div className="mt-1 text-sm font-medium text-[rgb(var(--fg))]">{data.priceRange}</div>
            <div className="mt-4 text-xs text-[rgb(var(--muted))]">{t('labelContact')}</div>
            <div className="mt-1 text-sm text-[rgb(var(--fg))]">{data.contactMethod}</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('labelScenarios')}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.scenarios.map((x) => (
              <Badge key={x}>{x}</Badge>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('labelAdvantages')}</div>
          <div className="mt-3 space-y-2">
            {data.advantages.map((x) => (
              <div key={x} className="text-xs text-[rgb(var(--muted))]">
                {x}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('labelCases')}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.cases.map((c) => (
            <div key={c.title} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4">
              <div className="text-sm font-medium text-[rgb(var(--fg))]">{c.title}</div>
              <div className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">{c.result}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
