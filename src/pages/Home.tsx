import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { listBlogPosts } from '@/blog/content'
import { useI18n } from '@/i18n/useI18n'
import { buildArticlePath, buildBlogArticlePath, buildPagePath } from '@/i18n/routing'
import { listArticles } from '@/api/kuankedao'
import type { ArticleItem } from '@/api/types'

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
  const [articles, setArticles] = useState<ArticleItem[] | null>(null)
  const blogPosts = useMemo(() => listBlogPosts().slice(0, 4), [])
  const isGlobalLocale = ['en', 'ja', 'ko'].includes(locale)

  useEffect(() => {
    let alive = true
    listArticles({ page: 1 })
      .then((a) => {
        if (!alive) return
        setArticles(a.items.slice(0, 4))
      })
      .catch(() => {
        if (!alive) return
        setArticles([])
      })
    return () => {
      alive = false
    }
  }, [])

  const heroStats = useMemo(
    () => [
      { value: t('heroStatResourcesValue'), label: t('heroStatResourcesLabel') },
      { value: t('heroStatMarketsValue'), label: t('heroStatMarketsLabel') },
      { value: t('heroStatResponseValue'), label: t('heroStatResponseLabel') },
    ],
    [t],
  )

  const keywordGroups = useMemo(() => {
    if (isGlobalLocale) {
      return [
        {
          title: 'Core Keywords',
          items: [
            'guest post',
            'guest post sites',
            'guest post opportunities',
            'write for us',
            'free backlinks',
            'backlink exchange',
            'dofollow backlinks',
            'link building services',
            'buy guest post',
            'high authority backlinks',
          ],
        },
        {
          title: 'Services',
          items: ['guest posting', 'free backlink discovery', 'backlink exchange', 'authority outreach', 'SEO partnerships'],
        },
      ]
    }

    if (locale === 'zh-tw') {
      return [
        {
          title: '核心詞',
          items: [
            'Guest Post',
            '外鏈',
            '免費外鏈',
            '外鏈交換',
            '友情連結交換',
            'Google 外鏈',
            'SEO 外鏈',
            '外鏈平台',
            '網站投稿外鏈',
            '高權重外鏈',
          ],
        },
        {
          title: '服務方向',
          items: ['投稿站點篩選', 'Guest Post 合作', '外鏈交換', '免費外鏈整理', '高權重資源對接'],
        },
      ]
    }

    return [
      {
        title: '核心词',
        items: [
          '外链',
            'SEO 外链',
            'Google 外链',
          '外链平台',
          '免费外链',
            'dofollow backlinks',
            'free backlinks',
            'link building services',
        ],
      },
      {
        title: '服务方向',
          items: ['SEO 外链服务', 'Google 外链资源', '外链发布', '外链建设', '高权重外链资源'],
      },
    ]
  }, [locale])

  const actionSteps = useMemo(() => {
    if (isGlobalLocale) {
      return ['Free Backlinks', 'Real-Time Data', '299 RMB / Month']
    }

    if (locale === 'zh-tw') {
      return ['免費獲取外鏈', '觀察即時數據', '滿意再包月 299 RMB']
    }

    return ['免费获取外链', '观察实时数据', '满意再包月 299 RMB']
  }, [isGlobalLocale, locale])

  const priceHighlights = useMemo(() => {
    if (isGlobalLocale) {
      return [
        { label: 'Monthly Price', value: '299 RMB / month' },
        { label: 'Project Setup', value: '1 URL, 1-3 keywords' },
        { label: 'Daily Range', value: '10-100 / day' },
        { label: 'Backlink Structure', value: 'Tier1 + Tier2 supported' },
      ]
    }

    if (locale === 'zh-tw') {
      return [
        { label: '包月價格', value: '299 RMB / 月' },
        { label: '項目配置', value: '1 個 URL，1~3 個關鍵詞' },
        { label: '配速範圍', value: '10~100 / day' },
        { label: '外鏈結構', value: '支持 Tier1、Tier2 搭建' },
      ]
    }

    return [
      { label: '包月价格', value: '299 RMB / 月' },
      { label: '项目配置', value: '1 个 URL，1~3 个关键词' },
      { label: '配速范围', value: '10~100 / day' },
      { label: '外链结构', value: '支持 Tier1、Tier2 搭建' },
    ]
  }, [isGlobalLocale, locale])

  const orderFlow = useMemo(() => {
    if (isGlobalLocale) {
      return {
        title: 'Order Flow',
        intro: 'Clear process, visible data, and predictable updates from setup to renewal reminder.',
        steps: [
          {
            title: '1. Register Account',
            desc: 'Create an account and get backend access to view the dashboard and order entry.',
          },
          {
            title: '2. Place Order and Set Parameters',
            desc: 'After payment, fill in the URL, keywords, delivery speed, and industry keyword settings.',
          },
          {
            title: '3. Setup Review in 12-24 Hours',
            desc: 'Within about 12 to 24 hours, we complete the initial review and setup confirmation.',
          },
          {
            title: '4. Ongoing Data Updates',
            desc: 'After activation, backlink data and daily report data are refreshed about every 24 hours, and renewal reminders are sent 7 days before expiry.',
          },
        ],
      }
    }

    if (locale === 'zh-tw') {
      return {
        title: '下單流程',
        intro: '流程清晰、數據可見，從註冊到續費提醒都有固定節奏。',
        steps: [
          {
            title: '1. 註冊賬號獲得後台入口',
            desc: '註冊後即可進入後台，查看 Dashboard 與下單入口。',
          },
          {
            title: '2. 下單扣費並填寫參數',
            desc: '完成下單後，填寫 URL、關鍵詞、速度參數與行業關鍵詞。',
          },
          {
            title: '3. 12~24 小時完成 Setup 核查',
            desc: '系統會在約 12 到 24 小時內完成初始配置與核查。',
          },
          {
            title: '4. 激活後持續更新數據',
            desc: '訂單激活後，平均每 24 小時更新一次最新外鏈數據與日報數據，到期前 7 天提醒續費。',
          },
        ],
      }
    }

    return {
      title: '下单流程',
      intro: '流程清晰、数据可见，从注册到续费提醒都有固定节奏。',
      steps: [
        {
          title: '1. 注册账号获得后台入口',
          desc: '注册后即可进入后台，查看 Dashboard 与下单入口。',
        },
        {
          title: '2. 下单扣费并填写参数',
          desc: '完成下单后，填写 URL、关键词、速度参数与行业关键词。',
        },
        {
          title: '3. 12~24 小时完成 Setup 核查',
          desc: '系统会在约 12 到 24 小时内完成初始配置与核查。',
        },
        {
          title: '4. 激活后持续更新数据',
          desc: '订单激活后，平均每 24 小时更新一次最新外链数据与日报数据，到期前 7 天提醒续费。',
        },
      ],
    }
  }, [isGlobalLocale, locale])


  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[rgba(56,189,248,0.10)] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[rgba(14,165,233,0.08)] blur-3xl" />
        </div>

        <div className="relative">
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
            {t('homeTitleA')}
          </h1>
          <h2 className="mt-4 max-w-2xl text-xl font-medium leading-relaxed text-[rgb(var(--fg))]/88">{t('homeTitleB')}</h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {actionSteps.map((item) => (
              <Badge key={item} className="border-transparent bg-[rgba(14,165,233,0.08)] px-3 py-1.5 text-[rgb(var(--fg))]">
                {item}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={buildPagePath(locale, 'link-building-services')}>
              <Button className="min-w-32">
                {isGlobalLocale ? 'Get Free Backlinks' : locale === 'zh-tw' ? '免費獲取外鏈' : '免费获取外链'}
              </Button>
            </Link>
            <Link to={buildPagePath(locale, 'price')}>
              <Button variant="outline" className="min-w-32">
                {isGlobalLocale ? 'View 299 Pricing' : locale === 'zh-tw' ? '查看 299 包月' : '查看 299 包月'}
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
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <h2 className="sr-only">
          {isGlobalLocale ? 'Homepage Keyword Groups' : locale === 'zh-tw' ? '首頁關鍵詞分組' : '首页关键词分组'}
        </h2>
        {keywordGroups.map((group) => (
          <Card key={group.title} className="p-6">
            <h3 className="text-lg font-medium tracking-tight text-[rgb(var(--fg))]">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} className="border-transparent bg-[rgba(14,165,233,0.08)] text-[rgb(var(--fg))]">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">
              {isGlobalLocale ? '299 Monthly Plan' : locale === 'zh-tw' ? '299 包月價格' : '299 包月价格'}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="border-transparent bg-[rgba(14,165,233,0.10)] text-[rgb(var(--fg))]">
                {isGlobalLocale ? 'Free first' : locale === 'zh-tw' ? '免費優先' : '免费优先'}
              </Badge>
              <Badge className="border-transparent bg-[rgba(14,165,233,0.08)] text-[rgb(var(--fg))]">
                {isGlobalLocale ? 'See the quality first' : locale === 'zh-tw' ? '先看質量' : '先看质量'}
              </Badge>
              <Badge className="border-transparent bg-[rgba(14,165,233,0.06)] text-[rgb(var(--fg))]">
                {isGlobalLocale ? 'Order later if satisfied' : locale === 'zh-tw' ? '滿意再下單' : '满意再下单'}
              </Badge>
            </div>
          </div>
          <Link to={buildPagePath(locale, 'price')}>
            <Button variant="outline">{isGlobalLocale ? 'More on Price.html' : '更多链接到 Price.html'}</Button>
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {priceHighlights.map((item) => (
            <Card key={item.label} className="p-5">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">{item.label}</h3>
              <div className="mt-3 text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{item.value}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 sm:px-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{orderFlow.title}</h2>
          <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{orderFlow.intro}</p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {orderFlow.steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < orderFlow.steps.length - 1 ? (
                <div className="pointer-events-none absolute right-[-0.75rem] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[rgb(var(--border))] xl:block" />
              ) : null}
              <Card className="h-full p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(var(--accent))] text-base font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)]">
                    {index + 1}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent))]">
                    {isGlobalLocale ? 'Step' : '步骤'}
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{step.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <h2 className="sr-only">
          {isGlobalLocale ? 'Homepage Quick Links' : locale === 'zh-tw' ? '首頁快速入口' : '首页快速入口'}
        </h2>
        <Link to={buildPagePath(locale, 'link-building-services')}>
          <Card className="p-6 transition hover:border-[rgb(var(--accent))]">
            <h3 className="text-sm font-medium text-[rgb(var(--fg))]">
              {isGlobalLocale ? 'Get Free Backlinks' : locale === 'zh-tw' ? '免費獲取外鏈' : '免费获取外链'}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>free backlinks</Badge>
              <Badge>SEO 外链</Badge>
              <Badge>Google 外链</Badge>
              <Badge>{isGlobalLocale ? 'real-time data' : locale === 'zh-tw' ? '即時數據' : '实时数据'}</Badge>
            </div>
          </Card>
        </Link>

        <Link to={buildPagePath(locale, 'price')}>
          <Card className="p-6 transition hover:border-[rgb(var(--accent))]">
            <h3 className="text-sm font-medium text-[rgb(var(--fg))]">
              {isGlobalLocale ? '299 RMB / Month' : '299 RMB / 月'}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>free backlinks</Badge>
              <Badge>link building services</Badge>
              <Badge>Tier1</Badge>
              <Badge>Tier2</Badge>
            </div>
          </Card>
        </Link>

        <Link to={buildPagePath(locale, 'resources')}>
          <Card className="p-6 transition hover:border-[rgb(var(--accent))]">
            <h3 className="text-sm font-medium text-[rgb(var(--fg))]">
              {isGlobalLocale ? 'Free Backlink Resources' : locale === 'zh-tw' ? '免費外鏈資源' : '免费外链资源'}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>外链</Badge>
              <Badge>SEO 外链</Badge>
              <Badge>Google 外链</Badge>
              <Badge>link building services</Badge>
            </div>
          </Card>
        </Link>
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
                  <h3 className="text-sm font-medium text-[rgb(var(--fg))]">{a.title}</h3>
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
                  <h3 className="text-sm font-medium text-[rgb(var(--fg))]">{post.title}</h3>
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
