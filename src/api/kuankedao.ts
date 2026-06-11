import { fetchJson } from './http'
import type {
  ArticleDetailResponse,
  ArticleListResponse,
  ResourceDetailResponse,
  ResourceListResponse,
} from './types'

export function listResources(params: { keyword?: string; category?: string; region?: string; page?: number }) {
  const sp = new URLSearchParams()
  if (params.keyword) sp.set('keyword', params.keyword)
  if (params.category) sp.set('category', params.category)
  if (params.region) sp.set('region', params.region)
  if (params.page) sp.set('page', String(params.page))
  const qs = sp.toString()
  return fetchJson<ResourceListResponse>(`/api/resources${qs ? `?${qs}` : ''}`)
}

export function getResource(slug: string) {
  return fetchJson<ResourceDetailResponse>(`/api/resources/${encodeURIComponent(slug)}`)
}

export function createPartnerApplication(body: {
  organizationName: string
  contactName: string
  contactValue: string
  serviceCategories: string[]
  serviceRegions: string[]
  clientIndustries: string[]
  caseSummary: string
  website?: string
}) {
  return fetchJson<{ success: boolean; applicationId: string; message: string }>(`/api/partner-applications`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function listArticles(params: { topic?: string; page?: number }) {
  const sp = new URLSearchParams()
  if (params.topic) sp.set('topic', params.topic)
  if (params.page) sp.set('page', String(params.page))
  const qs = sp.toString()
  return fetchJson<ArticleListResponse>(`/api/articles${qs ? `?${qs}` : ''}`)
}

export function getArticle(slug: string) {
  return fetchJson<ArticleDetailResponse>(`/api/articles/${encodeURIComponent(slug)}`)
}
