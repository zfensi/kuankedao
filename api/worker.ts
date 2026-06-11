type Env = {
  ASSETS: Fetcher
  DB: D1Database
}

type JsonResponse = {
  status?: number
  headers?: Record<string, string>
  body: unknown
}

function json(res: JsonResponse): Response {
  const headers = new Headers(res.headers)
  headers.set('content-type', 'application/json; charset=utf-8')
  headers.set('cache-control', 'no-store')
  return new Response(JSON.stringify(res.body), { status: res.status ?? 200, headers })
}

function notFound(body: unknown = { error: 'Not found' }) {
  return json({ status: 404, body })
}

function methodNotAllowed(body: unknown = { error: 'Method not allowed' }) {
  return json({ status: 405, body })
}

function badRequest(message: string) {
  return json({ status: 400, body: { error: message } })
}

function toNullableString(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const trimmed = v.trim()
  return trimmed.length ? trimmed : null
}

async function parseJson<T>(req: Request): Promise<T | null> {
  const ct = req.headers.get('content-type') ?? ''
  if (!ct.toLowerCase().includes('application/json')) return null
  try {
    return (await req.json()) as T
  } catch {
    return null
  }
}

function ok(body: unknown) {
  return json({ body })
}

async function listResources(req: Request, env: Env) {
  const url = new URL(req.url)
  const keyword = toNullableString(url.searchParams.get('keyword'))
  const category = toNullableString(url.searchParams.get('category'))
  const region = toNullableString(url.searchParams.get('region'))
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1)
  const pageSize = 12
  const offset = (page - 1) * pageSize

  const where: string[] = []
  const binds: unknown[] = []

  if (keyword) {
    where.push('(name LIKE ? OR summary LIKE ?)')
    binds.push(`%${keyword}%`, `%${keyword}%`)
  }
  if (category) {
    where.push('category = ?')
    binds.push(category)
  }
  if (region) {
    where.push('EXISTS (SELECT 1 FROM resource_regions rr WHERE rr.resource_id = resources.id AND rr.region = ?)')
    binds.push(region)
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
  const countStmt = env.DB.prepare(`SELECT COUNT(1) as c FROM resources ${whereSql}`)
  const count = await countStmt.bind(...binds).first<{ c: number }>()

  const rowsStmt = env.DB.prepare(
    `
      SELECT id, slug, name, category, price_range as priceRange, summary, recommended
      FROM resources
      ${whereSql}
      ORDER BY recommended DESC, created_at DESC
      LIMIT ? OFFSET ?
    `.trim(),
  )

  const rows = await rowsStmt.bind(...binds, pageSize, offset).all<{
    id: string
    slug: string
    name: string
    category: string
    priceRange: string
    summary: string
    recommended: number
  }>()

  const items = await Promise.all(
    rows.results.map(async (r) => {
      const tags = await env.DB.prepare(
        'SELECT tag FROM resource_tags WHERE resource_id = ? ORDER BY tag ASC',
      )
        .bind(r.id)
        .all<{ tag: string }>()
      const regions = await env.DB.prepare(
        'SELECT region FROM resource_regions WHERE resource_id = ? ORDER BY region ASC',
      )
        .bind(r.id)
        .all<{ region: string }>()

      return {
        id: r.id,
        slug: r.slug,
        name: r.name,
        category: r.category,
        priceRange: r.priceRange,
        summary: r.summary,
        recommended: Boolean(r.recommended),
        tags: tags.results.map((t) => t.tag),
        regions: regions.results.map((x) => x.region),
      }
    }),
  )

  return ok({ items, total: count?.c ?? 0, page, pageSize })
}

async function getResource(req: Request, env: Env, slug: string) {
  const row = await env.DB.prepare(
    `
      SELECT id, slug, name, category, price_range as priceRange, description
      FROM resources
      WHERE slug = ?
      LIMIT 1
    `.trim(),
  )
    .bind(slug)
    .first<{
      id: string
      slug: string
      name: string
      category: string
      priceRange: string
      description: string
    }>()

  if (!row) return notFound()

  const tags = await env.DB.prepare('SELECT tag FROM resource_tags WHERE resource_id = ? ORDER BY tag ASC')
    .bind(row.id)
    .all<{ tag: string }>()
  const regions = await env.DB.prepare(
    'SELECT region FROM resource_regions WHERE resource_id = ? ORDER BY region ASC',
  )
    .bind(row.id)
    .all<{ region: string }>()
  const scenarios = await env.DB.prepare(
    'SELECT scenario FROM resource_scenarios WHERE resource_id = ? ORDER BY scenario ASC',
  )
    .bind(row.id)
    .all<{ scenario: string }>()
  const advantages = await env.DB.prepare(
    'SELECT advantage FROM resource_advantages WHERE resource_id = ? ORDER BY advantage ASC',
  )
    .bind(row.id)
    .all<{ advantage: string }>()
  const cases = await env.DB.prepare(
    'SELECT title, result FROM resource_cases WHERE resource_id = ? ORDER BY id DESC',
  )
    .bind(row.id)
    .all<{ title: string; result: string }>()

  return ok({
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    priceRange: row.priceRange,
    description: row.description,
    tags: tags.results.map((t) => t.tag),
    regions: regions.results.map((r) => r.region),
    scenarios: scenarios.results.map((s) => s.scenario),
    advantages: advantages.results.map((a) => a.advantage),
    cases: cases.results,
    contactMethod: '联系平台后由平台协助对接',
  })
}

type PartnerApplicationBody = {
  organizationName?: unknown
  contactName?: unknown
  contactValue?: unknown
  serviceCategories?: unknown
  serviceRegions?: unknown
  clientIndustries?: unknown
  caseSummary?: unknown
  website?: unknown
}

async function createPartnerApplication(req: Request, env: Env) {
  const body = await parseJson<PartnerApplicationBody>(req)
  if (!body) return badRequest('需要 application/json 请求体')

  const organizationName = toNullableString(body.organizationName)
  const contactName = toNullableString(body.contactName)
  const contactValue = toNullableString(body.contactValue)
  const caseSummary = toNullableString(body.caseSummary)
  const website = toNullableString(body.website)

  const serviceCategories = Array.isArray(body.serviceCategories)
    ? (body.serviceCategories
        .filter((x) => typeof x === 'string')
        .map((x) => x.trim())
        .filter(Boolean) as string[])
    : []
  const serviceRegions = Array.isArray(body.serviceRegions)
    ? (body.serviceRegions.filter((x) => typeof x === 'string').map((x) => x.trim()).filter(Boolean) as string[])
    : []
  const clientIndustries = Array.isArray(body.clientIndustries)
    ? (body.clientIndustries.filter((x) => typeof x === 'string').map((x) => x.trim()).filter(Boolean) as string[])
    : []

  if (!organizationName) return badRequest('organizationName 不能为空')
  if (!contactValue) return badRequest('contactValue 不能为空')
  if (!caseSummary) return badRequest('caseSummary 不能为空')
  if (!serviceCategories.length) return badRequest('serviceCategories 至少选择 1 项')

  const id = crypto.randomUUID()
  await env.DB.prepare(
    `
      INSERT INTO partner_applications (
        id, organization_name, contact_name, contact_value, case_summary, website
      ) VALUES (
        ?, ?, ?, ?, ?, ?
      )
    `.trim(),
  )
    .bind(id, organizationName, contactName ?? '', contactValue, caseSummary, website ?? '')
    .run()

  for (const c of serviceCategories) {
    await env.DB.prepare('INSERT INTO partner_service_categories (application_id, category) VALUES (?, ?)')
      .bind(id, c)
      .run()
  }
  for (const r of serviceRegions) {
    await env.DB.prepare('INSERT INTO partner_service_regions (application_id, region) VALUES (?, ?)')
      .bind(id, r)
      .run()
  }
  for (const i of clientIndustries) {
    await env.DB.prepare('INSERT INTO partner_client_industries (application_id, industry) VALUES (?, ?)')
      .bind(id, i)
      .run()
  }

  return ok({ success: true, applicationId: id, message: '已收到入驻申请，我们会尽快审核' })
}

async function listArticles(req: Request, env: Env) {
  const url = new URL(req.url)
  const topic = toNullableString(url.searchParams.get('topic'))
  const page = Math.max(1, Number(url.searchParams.get('page') ?? '1') || 1)
  const pageSize = 12
  const offset = (page - 1) * pageSize

  const where = topic ? 'WHERE topic = ?' : ''
  const binds = topic ? [topic] : []

  const count = await env.DB.prepare(`SELECT COUNT(1) as c FROM articles ${where}`)
    .bind(...binds)
    .first<{ c: number }>()

  const rows = await env.DB.prepare(
    `
      SELECT id, slug, title, cover, topic, summary, published_at as publishedAt
      FROM articles
      ${where}
      ORDER BY published_at DESC
      LIMIT ? OFFSET ?
    `.trim(),
  )
    .bind(...binds, pageSize, offset)
    .all<{
      id: string
      slug: string
      title: string
      cover: string
      topic: string
      summary: string
      publishedAt: string
    }>()

  return ok({ items: rows.results, total: count?.c ?? 0, page, pageSize })
}

async function getArticle(req: Request, env: Env, slug: string) {
  const row = await env.DB.prepare(
    `
      SELECT id, slug, title, cover, topic, summary, content_md as contentMd, published_at as publishedAt
      FROM articles
      WHERE slug = ?
      LIMIT 1
    `.trim(),
  )
    .bind(slug)
    .first<{
      id: string
      slug: string
      title: string
      cover: string
      topic: string
      summary: string
      contentMd: string
      publishedAt: string
    }>()

  if (!row) return notFound()
  return ok(row)
}

function matchApi(url: URL): { name: string; params: Record<string, string> } | null {
  const path = url.pathname.replace(/\/+$/, '')
  if (path === '/api/resources') return { name: 'listResources', params: {} }
  if (path.startsWith('/api/resources/')) {
    const slug = path.slice('/api/resources/'.length)
    if (!slug) return null
    return { name: 'getResource', params: { slug } }
  }
  if (path === '/api/partner-applications') return { name: 'createPartnerApplication', params: {} }
  if (path === '/api/articles') return { name: 'listArticles', params: {} }
  if (path.startsWith('/api/articles/')) {
    const slug = path.slice('/api/articles/'.length)
    if (!slug) return null
    return { name: 'getArticle', params: { slug } }
  }
  return null
}

async function handleApi(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url)
  const match = matchApi(url)
  if (!match) return notFound()

  if (match.name === 'listResources') {
    if (req.method !== 'GET') return methodNotAllowed()
    return listResources(req, env)
  }
  if (match.name === 'getResource') {
    if (req.method !== 'GET') return methodNotAllowed()
    return getResource(req, env, match.params.slug)
  }
  if (match.name === 'createPartnerApplication') {
    if (req.method !== 'POST') return methodNotAllowed()
    return createPartnerApplication(req, env)
  }
  if (match.name === 'listArticles') {
    if (req.method !== 'GET') return methodNotAllowed()
    return listArticles(req, env)
  }
  if (match.name === 'getArticle') {
    if (req.method !== 'GET') return methodNotAllowed()
    return getArticle(req, env, match.params.slug)
  }
  return notFound()
}

async function handleAssets(req: Request, env: Env): Promise<Response> {
  const res = await env.ASSETS.fetch(req)
  if (res.status !== 404) return res

  const accept = (req.headers.get('accept') ?? '').toLowerCase()
  if (!accept.includes('text/html')) return res

  const url = new URL(req.url)
  const indexUrl = new URL(url.origin)
  indexUrl.pathname = '/index.html'
  return env.ASSETS.fetch(new Request(indexUrl.toString(), req))
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (url.pathname.startsWith('/api/')) return handleApi(req, env)
    return handleAssets(req, env)
  },
}
