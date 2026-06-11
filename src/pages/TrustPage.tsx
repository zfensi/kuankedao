import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getTrustPageContent, type TrustPageId } from '@/content/trustPages'
import { buildPagePath } from '@/i18n/routing'
import { useI18n } from '@/i18n/useI18n'

export default function TrustPage(props: { pageId: TrustPageId }) {
  const { locale } = useI18n()
  const page = useMemo(() => getTrustPageContent(locale, props.pageId), [locale, props.pageId])

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
        <div className="text-xs uppercase tracking-[0.24em] text-[rgb(var(--muted))]">{page.eyebrow}</div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">{page.intro}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {page.badges.map((badge) => (
            <Badge key={badge}>{badge}</Badge>
          ))}
        </div>
        <div className="mt-4 text-xs text-[rgb(var(--muted))]">{page.updatedLabel}</div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {page.sections.map((section) => (
          <Card key={section.title} className="p-5">
            <h2 className="text-base font-semibold tracking-tight text-[rgb(var(--fg))]">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-7 text-[rgb(var(--muted))]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
        ))}
      </section>

      {page.contactCard && (
        <section>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--fg))]">
              <Mail className="h-4 w-4" />
              <span>{page.contactCard.title}</span>
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">{page.contactCard.emailLabel}</div>
            <a
              href={`mailto:${page.contactCard.email}`}
              className="mt-2 inline-flex items-center gap-2 text-base font-medium text-[rgb(var(--accent))] hover:underline"
            >
              {page.contactCard.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-4 space-y-2 text-sm leading-7 text-[rgb(var(--muted))]">
              {page.contactCard.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </Card>
        </section>
      )}

      <section>
        <Card className="p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{page.linksTitle}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {page.links.map((item) => (
              <Link
                key={item.label}
                to={buildPagePath(locale, item.target)}
                className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4 transition hover:border-[rgb(var(--accent))]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-[rgb(var(--fg))]">{item.label}</div>
                  <ArrowRight className="h-4 w-4 text-[rgb(var(--muted))]" />
                </div>
                <p className="mt-2 text-xs leading-6 text-[rgb(var(--muted))]">{item.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
