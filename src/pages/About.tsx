import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useI18n } from '@/i18n/useI18n'

export default function About() {
  const { t } = useI18n()
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('aboutTitle')}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">{t('aboutDesc')}</p>
      </div>
      <div className="lg:col-span-7">
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{t('valuePlatform')}</Badge>
            <Badge>{t('valueAggregation')}</Badge>
            <Badge>{t('valueConnection')}</Badge>
            <Badge>{t('navCommunity')}</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4">
              <div className="text-xs text-[rgb(var(--muted))]">01</div>
              <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{t('sectionFeaturedResources')}</div>
              <div className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">{t('resourcesDesc')}</div>
            </div>
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4">
              <div className="text-xs text-[rgb(var(--muted))]">02</div>
              <div className="mt-2 text-sm font-medium text-[rgb(var(--fg))]">{t('sectionHowItWorks')}</div>
              <div className="mt-2 text-xs leading-relaxed text-[rgb(var(--muted))]">{t('heroDesc')}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

