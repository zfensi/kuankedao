import type { Locale } from '@/i18n/translations'

const dict: Record<string, { zh: string; en: string }> = {
  media_buying: { zh: '媒介投放', en: 'Media Buying' },
  kol_koc: { zh: 'KOL/KOC', en: 'KOL/KOC' },
  seo: { zh: 'SEO', en: 'SEO' },
  community: { zh: '社群增长', en: 'Community Growth' },
  overseas: { zh: '海外增长', en: 'Overseas Growth' },
}

export function formatCategory(category: string, locale: Locale) {
  const hit = dict[category]
  if (hit) return hit[locale]
  return category
}

