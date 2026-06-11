import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useI18n } from '@/i18n/useI18n'
import { buildArticlePath, buildPagePath } from '@/i18n/routing'
import { useManagedJsonLd, usePageSeoOverride } from '@/lib/seo'
import { resolveShareImage } from '@/lib/shareImage'
import { getArticle } from '@/api/kuankedao'
import type { ArticleDetailResponse } from '@/api/types'

export default function Article() {
  const { t, locale } = useI18n()
  const { slug } = useParams()
  const [data, setData] = useState<ArticleDetailResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const seoMeta = useMemo(() => {
    if (!data) {
      return null
    }

    const pageUrl = new URL(buildArticlePath(locale, data.slug), window.location.origin).toString()
    const imageUrl = resolveShareImage({
      preferredPath: data.cover,
      subject: data.title,
      summary: data.summary,
      theme: data.topic,
    })

    return {
      title: `${data.title} - ${t('brandName')}`,
      description: data.summary,
      url: pageUrl,
      type: 'article',
      imageUrl,
    }
  }, [data, locale, t])
  const articleSchema = useMemo(() => {
    if (!data) {
      return null
    }

    const pageUrl = new URL(buildArticlePath(locale, data.slug), window.location.origin).toString()
    const imageUrl = resolveShareImage({
      preferredPath: data.cover,
      subject: data.title,
      summary: data.summary,
      theme: data.topic,
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: data.title,
      description: data.summary,
      datePublished: data.publishedAt,
      dateModified: data.publishedAt,
      articleSection: data.topic,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      image: [imageUrl],
      author: {
        '@type': 'Organization',
        name: 'Kuankedao',
        url: window.location.origin,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Kuankedao',
        url: window.location.origin,
        logo: {
          '@type': 'ImageObject',
          url: new URL('/icon-512.svg', window.location.origin).toString(),
        },
      },
    }
  }, [data, locale])

  useManagedJsonLd('community-article', articleSchema)
  usePageSeoOverride(seoMeta)

  useEffect(() => {
    if (!slug) return
    let alive = true
    setStatus('loading')
    getArticle(slug)
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
        <div className="h-5 w-44 animate-pulse rounded bg-[rgb(var(--border))]" />
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
          <Link to={buildPagePath(locale, 'community')}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              {t('navCommunity')}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link to={buildPagePath(locale, 'community')} className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
          <ChevronLeft className="h-4 w-4" />
          {t('navCommunity')}
        </Link>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{data.topic}</Badge>
            <span className="text-xs text-[rgb(var(--muted))]">{new Date(data.publishedAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{data.title}</h1>
          <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">{data.summary}</p>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[rgb(var(--fg))]">{data.contentMd}</div>
        </div>
      </Card>
    </div>
  )
}
