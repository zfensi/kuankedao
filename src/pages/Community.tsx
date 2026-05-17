import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'
import { useI18n } from '@/i18n/useI18n'
import { buildArticlePath } from '@/i18n/routing'
import { listArticles } from '@/api/kuankedao'
import type { ArticleItem } from '@/api/types'

export default function Community() {
  const { t, locale } = useI18n()
  const [sp, setSp] = useSearchParams()
  const [items, setItems] = useState<ArticleItem[] | null>(null)
  const [total, setTotal] = useState<number>(0)

  const topic = sp.get('topic') ?? ''

  useEffect(() => {
    let alive = true
    setItems(null)
    listArticles({ topic: topic || undefined, page: 1 })
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
  }, [topic])

  const topics = useMemo(() => {
    const set = new Set<string>()
    ;(items ?? []).forEach((x) => set.add(x.topic))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [items])

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('communityTitle')}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[rgb(var(--muted))]">
            {t('communityDesc')} {total ? `(${total})` : ''}
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <Select
            value={topic}
            onChange={(e) => {
              sp.set('topic', e.target.value)
              if (!e.target.value) sp.delete('topic')
              setSp(sp, { replace: true })
            }}
          >
            <option value="">{t('topicAll')}</option>
            {topics.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {items === null &&
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="h-4 w-40 animate-pulse rounded bg-[rgb(var(--border))]" />
              <div className="mt-3 h-3 w-72 animate-pulse rounded bg-[rgb(var(--border))]" />
            </Card>
          ))}
        {items?.map((a) => (
          <Link key={a.id} to={buildArticlePath(locale, a.slug)}>
            <Card className="p-4 transition hover:border-[rgb(var(--accent))]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-[rgb(var(--fg))]">{a.title}</div>
                <Badge>{a.topic}</Badge>
              </div>
              <div className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">{a.summary}</div>
              <div className="mt-4 text-xs text-[rgb(var(--muted))]">{new Date(a.publishedAt).toLocaleDateString()}</div>
            </Card>
          </Link>
        ))}
        {items !== null && items.length === 0 && (
          <Card className="p-6 md:col-span-2">
            <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('emptyTitle')}</div>
            <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('emptyDesc')}</div>
          </Card>
        )}
      </div>
    </div>
  )
}
