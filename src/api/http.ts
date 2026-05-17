export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      accept: 'application/json',
    },
  })

  const ct = res.headers.get('content-type') ?? ''
  if (!ct.toLowerCase().includes('application/json')) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }

  const data = (await res.json()) as unknown
  if (!res.ok) {
    const msg = typeof data === 'object' && data ? (data as any).error : null
    throw new Error(msg || `HTTP ${res.status}`)
  }
  return data as T
}

