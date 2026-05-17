import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Languages, Moon, Sun } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n/useI18n'
import { buildPagePath, localeOptions, translatePathname } from '@/i18n/routing'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'

const linkBase =
  'rounded-lg px-3 py-2 text-sm text-[rgb(var(--muted))] transition hover:bg-[rgb(var(--card))] hover:text-[rgb(var(--fg))]'

export function Shell(props: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t, locale, setLocale } = useI18n()
  const { toggleTheme, isDark } = useTheme()

  const items = [
    { to: buildPagePath(locale, 'home'), label: t('navHome') },
    { to: buildPagePath(locale, 'resources'), label: t('navResources') },
    { to: buildPagePath(locale, 'request'), label: t('navRequest') },
    { to: buildPagePath(locale, 'community'), label: t('navCommunity') },
    { to: buildPagePath(locale, 'blog'), label: t('navBlog') },
    { to: buildPagePath(locale, 'partners'), label: t('navPartners') },
    { to: buildPagePath(locale, 'about'), label: t('navAbout') },
  ]

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <NavLink to={buildPagePath(locale, 'home')} className="group flex items-baseline gap-2">
              <span className="text-sm font-medium tracking-tight text-[rgb(var(--fg))]">{t('brandName')}</span>
              <span className="hidden text-xs text-[rgb(var(--muted))] sm:inline">{t('brandSubtitle')}</span>
            </NavLink>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn(linkBase, isActive && 'bg-[rgb(var(--card))] text-[rgb(var(--fg))]')
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              <Select
                aria-label={t('langLabel')}
                className="w-28 sm:w-32"
                value={locale}
                onChange={(event) => {
                  const nextLocale = event.target.value as typeof locale
                  setLocale(nextLocale)
                  navigate(`${translatePathname(location.pathname, nextLocale)}${location.search}`)
                }}
              >
                {localeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={t('themeLabel')}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cn('rounded-lg px-3 py-2 text-xs', isActive ? 'bg-[rgb(var(--card))]' : 'text-[rgb(var(--muted))]')
                }
              >
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{props.children}</main>

      <footer className="border-t border-[rgb(var(--border))]">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 text-xs text-[rgb(var(--muted))]">{t('footerNote')}</div>
      </footer>
    </div>
  )
}
