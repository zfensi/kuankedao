import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultLocale, supportedLocales, translations, type Locale, type TranslationKey } from './translations'

type I18nContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  toggleLocale: () => void
  t: (key: TranslationKey) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

function isSupportedLocale(value: string | null): value is Locale {
  return value !== null && supportedLocales.includes(value as Locale)
}

function getInitialLocale(): Locale {
  const stored = localStorage.getItem('locale')
  if (isSupportedLocale(stored)) return stored

  const nav = (navigator.language || '').toLowerCase()

  if (nav.startsWith('zh-tw') || nav.includes('hant')) return 'zh-tw'
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('en')) return 'en'

  return defaultLocale
}

export function I18nProvider(props: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const index = supportedLocales.indexOf(prev)
      return supportedLocales[(index + 1) % supportedLocales.length]
    })
  }, [])

  const t = useCallback(
    (key: TranslationKey) => {
      const dict = translations[locale] as Record<string, string>
      return dict[key] ?? (translations[defaultLocale] as Record<string, string>)[key] ?? key
    },
    [locale],
  )

  useEffect(() => {
    localStorage.setItem('locale', locale)
    document.documentElement.lang =
      {
        zh: 'zh-CN',
        en: 'en',
        'zh-tw': 'zh-TW',
      }[locale] ?? 'zh-CN'
  }, [locale])

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, toggleLocale, t }), [locale, setLocale, toggleLocale, t])

  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
}
