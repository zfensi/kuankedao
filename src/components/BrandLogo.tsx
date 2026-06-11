import { Link } from 'react-router-dom'
import { buildPagePath } from '@/i18n/routing'
import { useI18n } from '@/i18n/useI18n'

function BrandMark(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={props.className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="18" fill="#111827" />
      <rect x="14" y="21" width="16" height="16" rx="6" stroke="#F8E7A1" strokeWidth="5" />
      <rect x="34" y="21" width="16" height="16" rx="6" stroke="#D4A017" strokeWidth="5" />
      <path d="M29 29H35" stroke="#FCD34D" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

export function BrandLogo(props: { compact?: boolean; className?: string }) {
  const { locale, t } = useI18n()

  return (
    <Link
      to={buildPagePath(locale, 'home')}
      aria-label={t('siteTitle')}
      className={[
        'group inline-flex items-center rounded-2xl border border-[rgba(148,163,184,0.14)] bg-[rgba(255,255,255,0.36)] px-3 py-2.5 shadow-[0_6px_18px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-sm transition hover:border-[rgba(212,160,23,0.26)] hover:bg-[rgba(255,252,245,0.52)] hover:shadow-[0_10px_24px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.45)]',
        props.className ?? '',
      ]
        .join(' ')
        .trim()}
    >
      <span className="flex shrink-0 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.16)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
        <BrandMark className="h-11 w-11 rounded-2xl" />
      </span>
      <span className="ml-3 flex min-w-0 flex-col">
        <span className="text-sm font-semibold tracking-tight text-[rgb(var(--fg))]">{t('brandName')}</span>
        {!props.compact && (
          <span className="max-w-[18rem] truncate text-[11px] leading-5 text-[rgb(var(--muted))]">
            {t('brandSubtitle')}
          </span>
        )}
      </span>
    </Link>
  )
}
