import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useI18n } from '@/i18n/useI18n'
import { buildResourcePath } from '@/i18n/routing'
import { listResources } from '@/api/kuankedao'
import type { ResourceItem } from '@/api/types'
import { formatCategory } from '@/utils/category'

export default function Resources() {
  const { t, locale } = useI18n()
  const [sp, setSp] = useSearchParams()
  const [items, setItems] = useState<ResourceItem[] | null>(null)
  const [total, setTotal] = useState<number>(0)

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

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('resourcesTitle')}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[rgb(var(--muted))]">
            {t('resourcesDesc')} {total ? `(${total})` : ''}
          </p>
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
    </div>
  )
}
