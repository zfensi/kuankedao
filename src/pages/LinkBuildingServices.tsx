import { Link } from 'react-router-dom'
import { Clock3, Database, Wrench } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { buildPagePath } from '@/i18n/routing'
import { useI18n } from '@/i18n/useI18n'

export default function LinkBuildingServices() {
  const { locale } = useI18n()
  const isZh = locale !== 'en'

  const blocks = isZh
    ? [
        {
          icon: Database,
          title: '最近 7 天数据入口',
          desc: '这个页面后续会用于承接最近 7 天外链数据下载、查看或 API 相关入口，目前先保留页面位置。',
        },
        {
          icon: Clock3,
          title: '当前状态',
          desc: '页面已占位，内容暂未开放。后续接入后，你可以从价格页或平台入口直接跳转到这里。',
        },
        {
          icon: Wrench,
          title: '后续计划',
          desc: '未来可在这里放最近 7 天数据展示、下载按钮、账号权限说明、字段说明与 API 文档入口。',
        },
      ]
    : [
        {
          icon: Database,
          title: 'Recent 7-Day Data Entry',
          desc: 'This page is reserved for recent 7-day backlink data view, download, or API-related entry points in a later update.',
        },
        {
          icon: Clock3,
          title: 'Current Status',
          desc: 'The page exists as a placeholder for now. Once connected, users will be able to jump here directly from the pricing or platform pages.',
        },
        {
          icon: Wrench,
          title: 'Planned Use',
          desc: 'This page can later host recent 7-day data preview, download actions, account access notes, field explanation, and API entry points.',
        },
      ]

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
        <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">
          {isZh ? '占位页面 / Placeholder Page' : 'Placeholder Page / 占位页面'}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-4xl">
          {isZh ? '最近 7 天数据 link-building-services' : 'Recent 7-Day Data link-building-services'}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">
          {isZh
            ? '这个页面当前为空，先作为 `link-building-services.html` 的独立占位页存在。后续如果你要接最近 7 天数据下载、Dashboard 入口或 API 文档，可以直接在这里继续扩展。'
            : 'This page is intentionally empty for now and serves as the placeholder for `link-building-services.html`. It can later host recent 7-day data download, dashboard entry, or API-related content.'}
        </p>
        <div className="mt-6">
          <Link to={buildPagePath(locale, 'price')}>
            <Button variant="outline">{isZh ? '返回价格页' : 'Back to Pricing'}</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {blocks.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="p-5">
              <Icon className="h-5 w-5 text-[rgb(var(--accent))]" />
              <h2 className="mt-4 text-base font-semibold tracking-tight text-[rgb(var(--fg))]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{item.desc}</p>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
