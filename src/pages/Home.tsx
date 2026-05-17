import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe2, Languages, ShieldCheck, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { listBlogPosts } from '@/blog/content'
import { useI18n } from '@/i18n/useI18n'
import { buildArticlePath, buildBlogArticlePath, buildPagePath, buildResourcePath } from '@/i18n/routing'
import { listArticles, listResources } from '@/api/kuankedao'
import type { ArticleItem, ResourceItem } from '@/api/types'

function Section(props: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-sm font-medium tracking-tight text-[rgb(var(--fg))]">{props.title}</h2>
        {props.right}
      </div>
      {props.children}
    </section>
  )
}

export default function Home() {
  const { t, locale } = useI18n()
  const [resources, setResources] = useState<ResourceItem[] | null>(null)
  const [articles, setArticles] = useState<ArticleItem[] | null>(null)
  const blogPosts = useMemo(() => listBlogPosts().slice(0, 4), [])

  useEffect(() => {
    let alive = true
    Promise.all([listResources({ page: 1 }), listArticles({ page: 1 })])
      .then(([r, a]) => {
        if (!alive) return
        setResources(r.items.slice(0, 6))
        setArticles(a.items.slice(0, 4))
      })
      .catch(() => {
        if (!alive) return
        setResources([])
        setArticles([])
      })
    return () => {
      alive = false
    }
  }, [])

  const steps = useMemo(
    () => [
      { title: t('howStep1Title'), desc: t('howStep1Desc') },
      { title: t('howStep2Title'), desc: t('howStep2Desc') },
      { title: t('howStep3Title'), desc: t('howStep3Desc') },
      { title: t('howStep4Title'), desc: t('howStep4Desc') },
    ],
    [t],
  )

  const valueCards = useMemo(
    () => [
      { title: t('valuePlatform'), desc: t('valuePlatformDesc') },
      { title: t('valueAggregation'), desc: t('valueAggregationDesc') },
      { title: t('valueConnection'), desc: t('valueConnectionDesc') },
      { title: t('valueCommunity'), desc: t('valueCommunityDesc') },
    ],
    [t],
  )

  const globalCards = useMemo(
    () => [
      { icon: Languages, title: t('globalCardMarketsTitle'), desc: t('globalCardMarketsDesc') },
      { icon: Globe2, title: t('globalCardRoutesTitle'), desc: t('globalCardRoutesDesc') },
      { icon: ShieldCheck, title: t('globalCardBrandTitle'), desc: t('globalCardBrandDesc') },
    ],
    [t],
  )

  const heroStats = useMemo(
    () => [
      { value: t('heroStatResourcesValue'), label: t('heroStatResourcesLabel') },
      { value: t('heroStatMarketsValue'), label: t('heroStatMarketsLabel') },
      { value: t('heroStatResponseValue'), label: t('heroStatResponseLabel') },
    ],
    [t],
  )

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[rgba(56,189,248,0.10)] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[rgba(14,165,233,0.08)] blur-3xl" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 px-3 py-1 text-xs text-[rgb(var(--muted))]">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--accent))]" />
              <span>{t('brandNameEn')}</span>
              <span className="h-1 w-1 rounded-full bg-[rgb(var(--border))]" />
              <span>{t('brandSubtitle')}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="border-transparent bg-[rgba(14,165,233,0.10)] text-[rgb(var(--fg))]">{t('heroBadgeCurated')}</Badge>
              <Badge className="border-transparent bg-[rgba(14,165,233,0.08)] text-[rgb(var(--fg))]">{t('heroBadgeGlobal')}</Badge>
              <Badge className="border-transparent bg-[rgba(14,165,233,0.06)] text-[rgb(var(--fg))]">{t('heroBadgeTrusted')}</Badge>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[rgb(var(--fg))] sm:text-5xl">
              {t('heroTitleA')}
            </h1>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-[rgb(var(--fg))]/88">{t('heroTitleB')}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[rgb(var(--muted))]">{t('heroDesc')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={buildPagePath(locale, 'request')}>
                <Button className="min-w-32">{t('ctaPrimary')}</Button>
              </Link>
              <Link to={buildPagePath(locale, 'partners')}>
                <Button variant="outline" className="min-w-32 bg-[rgb(var(--bg))]/70">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 p-4">
                  <div className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{item.value}</div>
                  <div className="mt-1 text-xs leading-6 text-[rgb(var(--muted))]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Card className="h-full bg-[rgb(var(--bg))]/80 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('heroPanelTitle')}</div>
                  <div className="mt-2 text-xs leading-6 text-[rgb(var(--muted))]">{t('heroPanelDesc')}</div>
                </div>
                <Badge className="border-transparent bg-[rgba(14,165,233,0.10)] text-[rgb(var(--fg))]">HTML</Badge>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                  <div className="text-xs text-[rgb(var(--muted))]">{t('heroPanelLanguagesLabel')}</div>
                  <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">CN / EN / TW / JA / KO</div>
                </div>
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                  <div className="text-xs text-[rgb(var(--muted))]">{t('heroPanelRoutesLabel')}</div>
                  <div className="mt-2 break-all text-sm font-medium text-[rgb(var(--fg))]">{t('heroPanelRouteExample')}</div>
                </div>
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                  <div className="text-xs text-[rgb(var(--muted))]">{t('heroPanelShowcaseLabel')}</div>
                  <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{t('heroPanelShowcaseValue')}</div>
                </div>
              </div>

              <div className="mt-6 border-t border-[rgb(var(--border))] pt-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('sectionHowItWorks')}</div>
                  <Badge>Flow</Badge>
                </div>
                <div className="space-y-4">
                  {steps.map((s, idx) => (
                    <div key={s.title} className="flex gap-3">
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-xs text-[rgb(var(--muted))]">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[rgb(var(--fg))]">{s.title}</div>
                        <div className="mt-1 text-xs leading-6 text-[rgb(var(--muted))]">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {valueCards.map((item) => (
          <Card key={item.title} className="p-5">
            <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">{t('brandNameEn')}</div>
            <div className="mt-3 text-lg font-medium tracking-tight text-[rgb(var(--fg))]">{item.title}</div>
            <div className="mt-2 text-sm leading-7 text-[rgb(var(--muted))]">{item.desc}</div>
          </Card>
        ))}
      </section>

      <Section
        title={t('sectionFeaturedResources')}
        right={
          <Link to={buildPagePath(locale, 'resources')} className="inline-flex items-center gap-1 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
            {t('navResources')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {resources === null &&
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-4">
                <div className="h-4 w-28 animate-pulse rounded bg-[rgb(var(--border))]" />
                <div className="mt-3 h-3 w-40 animate-pulse rounded bg-[rgb(var(--border))]" />
              </Card>
            ))}
          {resources !== null && resources.length === 0 && (
            <Card className="p-6 md:col-span-2 lg:col-span-3">
              <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('emptyTitle')}</div>
              <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('emptyDesc')}</div>
              <div className="mt-4">
                <Link to={buildPagePath(locale, 'request')}>
                  <Button size="sm">{t('ctaPrimary')}</Button>
                </Link>
              </div>
            </Card>
          )}
          {resources?.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{r.name}</div>
                  <div className="mt-1 text-xs text-[rgb(var(--muted))]">{r.summary}</div>
                </div>
                {r.recommended && <Badge className="text-[rgb(var(--fg))]">Top</Badge>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.tags.slice(0, 3).map((x) => (
                  <Badge key={x}>{x}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-[rgb(var(--muted))]">{r.priceRange}</div>
                <Link to={buildResourcePath(locale, r.slug)} className="text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
                  {t('actionView')}
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 sm:px-8">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">{t('sectionGlobalVision')}</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('globalVisionTitle')}</h2>
          <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">{t('globalVisionDesc')}</p>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {globalCards.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="bg-[rgb(var(--bg))]/80 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(14,165,233,0.10)]">
                  <Icon className="h-5 w-5 text-[rgb(var(--accent))]" />
                </div>
                <div className="mt-4 text-lg font-medium tracking-tight text-[rgb(var(--fg))]">{item.title}</div>
                <div className="mt-2 text-sm leading-7 text-[rgb(var(--muted))]">{item.desc}</div>
              </Card>
            )
          })}
        </div>
      </section>

      <Section
        title={t('sectionLatestArticles')}
        right={
          <Link to={buildPagePath(locale, 'community')} className="inline-flex items-center gap-1 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
            {t('navCommunity')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          {articles === null &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4">
                <div className="h-4 w-44 animate-pulse rounded bg-[rgb(var(--border))]" />
                <div className="mt-3 h-3 w-72 animate-pulse rounded bg-[rgb(var(--border))]" />
              </Card>
            ))}
          {articles?.map((a) => (
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
        </div>
      </Section>

      <Section
        title={t('sectionLatestBlog')}
        right={
          <Link to={buildPagePath(locale, 'blog')} className="inline-flex items-center gap-1 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
            {t('navBlog')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      >
        <div className="grid gap-3 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={buildBlogArticlePath(locale, post.slug)}>
              <Card className="h-full p-4 transition hover:border-[rgb(var(--accent))]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{post.title}</div>
                  {post.category && <Badge className="bg-transparent">{post.category}</Badge>}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">{post.description}</div>
                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[rgb(var(--muted))]">
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <span>{post.readingTime}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}
