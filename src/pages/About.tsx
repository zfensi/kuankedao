import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { buildPagePath } from '@/i18n/routing'
import { useI18n } from '@/i18n/useI18n'

export default function About() {
  const { t, locale } = useI18n()
  const isZh = locale === 'zh' || locale === 'zh-tw'

  const pillars = isZh
    ? [
        {
          id: '01',
          title: '平台定位 Platform Positioning',
          body: '宽客岛希望把资源展示、需求收集、合作沟通和方法内容连接到同一个入口里，让品牌方与服务方在更清晰的结构中完成对接。',
        },
        {
          id: '02',
          title: '内容与筛选 Content & Curation',
          body: '我们关注的不只是资源数量，也关注资料清晰度、应用场景、合作边界与沟通效率，让页面信息更接近可执行判断。',
        },
        {
          id: '03',
          title: '合作方式 How We Work',
          body: '平台支持 partner onboarding、business contact、basic matching 与后续支持分流，不同类型的问题会进入不同处理路径。',
        },
        {
          id: '04',
          title: '长期目标 Long-Term Direction',
          body: '通过持续补充内容、流程说明与公开联系路径，逐步把 Kuankedao 做成更稳定的增长协作入口，而不是单纯的信息堆放页。',
        },
      ]
    : [
        {
          id: '01',
          title: 'Platform Positioning 平台定位',
          body: 'Kuankedao brings resource discovery, request collection, partner communication, and practical content into one structured entry so that brands and service providers can connect more efficiently.',
        },
        {
          id: '02',
          title: 'Content & Curation 内容与筛选',
          body: 'We care not only about the number of listings, but also about clarity, practical fit, collaboration boundaries, and communication quality.',
        },
        {
          id: '03',
          title: 'How We Work 合作方式',
          body: 'The platform supports partner onboarding, business contact, basic matching, and support routing. Different issue types are handled through different workflows.',
        },
        {
          id: '04',
          title: 'Long-Term Direction 长期目标',
          body: 'By improving content, process visibility, and public contact paths, we want Kuankedao to become a more stable growth collaboration entry rather than a simple listing page.',
        },
      ]

  const quickLinks = isZh
    ? [
        { to: buildPagePath(locale, 'contact'), label: '联系我们 Contact', desc: '一般商务咨询、内容反馈与公开联系入口。' },
        { to: buildPagePath(locale, 'support'), label: '支持中心 Support', desc: '处理页面问题、流程问题、隐私请求与争议说明。' },
        { to: buildPagePath(locale, 'partners'), label: '资源入驻 Partners', desc: '服务方与渠道方提交机构资料、能力范围与案例摘要。' },
      ]
    : [
        { to: buildPagePath(locale, 'contact'), label: 'Contact Us 联系我们', desc: 'General business inquiries, content feedback, and public contact entry.' },
        { to: buildPagePath(locale, 'support'), label: 'Support Center 支持中心', desc: 'For page issues, process questions, privacy requests, and dispute notes.' },
        { to: buildPagePath(locale, 'partners'), label: 'Partner Onboarding 资源入驻', desc: 'For service providers and channels sharing profiles, capabilities, and case summaries.' },
      ]

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
            {isZh ? '关于我们 / About Us' : 'About Us / 关于我们'}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('aboutTitle')}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">{t('aboutDesc')}</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">
            {isZh
              ? 'Kuankedao 关注 resource clarity、workflow transparency 与沟通效率，希望让需求方与服务方在更低噪音的环境里完成判断、连接与推进。'
              : 'Kuankedao focuses on resource clarity, workflow transparency, and communication efficiency so that buyers and providers can evaluate, connect, and move forward with less noise.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>{t('valuePlatform')}</Badge>
            <Badge>{t('valueAggregation')}</Badge>
            <Badge>{t('valueConnection')}</Badge>
            <Badge>{t('navCommunity')}</Badge>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--fg))]">
              <Mail className="h-4 w-4" />
              <span>{isZh ? '公开联系邮箱' : 'Public Contact Email'}</span>
            </div>
            <a
              href="mailto:hi@kuankedao.com"
              className="mt-4 inline-flex items-center gap-2 text-base font-medium text-[rgb(var(--accent))] hover:underline"
            >
              hi@kuankedao.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted))]">
              {isZh
                ? '适用于一般商务咨询、合作沟通、内容反馈与公开联系。更具体的入驻、支持或隐私问题，建议走对应页面提交，以便平台更快分流。'
                : 'Use this address for general business inquiries, cooperation discussions, content feedback, and public contact. For partner onboarding, support cases, or privacy issues, the dedicated site pages usually provide faster routing.'}
            </p>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {pillars.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="text-xs text-[rgb(var(--muted))]">{item.id}</div>
            <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{item.title}</div>
            <div className="mt-2 text-sm leading-7 text-[rgb(var(--muted))]">{item.body}</div>
          </Card>
        ))}
      </section>

      <section>
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">
            {isZh ? '快速入口 Quick Links' : 'Quick Links 快速入口'}
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {quickLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 transition hover:border-[rgb(var(--accent))]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{item.label}</div>
                  <ArrowUpRight className="h-4 w-4 text-[rgb(var(--muted))]" />
                </div>
                <p className="mt-2 text-xs leading-6 text-[rgb(var(--muted))]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
