export type ResourceItem = {
  id: string
  slug: string
  name: string
  category: string
  regions: string[]
  tags: string[]
  priceRange: string
  summary: string
  recommended: boolean
}

export type ResourceListResponse = {
  items: ResourceItem[]
  total: number
  page: number
  pageSize: number
}

export type ResourceDetailResponse = {
  id: string
  slug: string
  name: string
  category: string
  regions: string[]
  tags: string[]
  priceRange: string
  description: string
  scenarios: string[]
  advantages: string[]
  cases: { title: string; result: string }[]
  contactMethod: string
}

export type ArticleItem = {
  id: string
  slug: string
  title: string
  cover: string
  topic: string
  summary: string
  publishedAt: string
}

export type ArticleListResponse = {
  items: ArticleItem[]
  total: number
  page: number
  pageSize: number
}

export type ArticleDetailResponse = ArticleItem & {
  contentMd: string
}

