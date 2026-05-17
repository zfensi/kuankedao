import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Shell } from '@/components/Shell'
import { useI18n } from '@/i18n/useI18n'
import { detectLocaleFromPathname } from '@/i18n/routing'

export default function Layout() {
  const location = useLocation()
  const { locale, setLocale } = useI18n()

  useEffect(() => {
    const nextLocale = detectLocaleFromPathname(location.pathname)
    if (nextLocale !== locale) {
      setLocale(nextLocale)
    }
  }, [locale, location.pathname, setLocale])

  return (
    <Shell>
      <Outlet />
    </Shell>
  )
}
