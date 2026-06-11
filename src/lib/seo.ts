import { useEffect } from 'react'

type JsonLdNode = Record<string, unknown>

export type JsonLdValue = JsonLdNode | JsonLdNode[]

function getJsonLdSelector(id: string) {
  return `script[type="application/ld+json"][data-seo-id="${id}"]`
}

export function upsertJsonLd(id: string, data: JsonLdValue) {
  const serialized = JSON.stringify(data)
  let element = document.head.querySelector<HTMLScriptElement>(getJsonLdSelector(id))

  if (!element) {
    element = document.createElement('script')
    element.type = 'application/ld+json'
    element.setAttribute('data-seo-id', id)
    element.setAttribute('data-managed-seo', 'true')
    document.head.appendChild(element)
  }

  element.textContent = serialized
}

export function removeJsonLd(id: string) {
  const element = document.head.querySelector<HTMLScriptElement>(getJsonLdSelector(id))
  element?.parentElement?.removeChild(element)
}

function ensureMetaContent(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function useManagedJsonLd(id: string, data: JsonLdValue | null) {
  const serialized = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (!serialized) {
      removeJsonLd(id)
      return
    }

    let element = document.head.querySelector<HTMLScriptElement>(getJsonLdSelector(id))
    if (!element) {
      element = document.createElement('script')
      element.type = 'application/ld+json'
      element.setAttribute('data-seo-id', id)
      element.setAttribute('data-managed-seo', 'true')
      document.head.appendChild(element)
    }

    element.textContent = serialized

    return () => {
      removeJsonLd(id)
    }
  }, [id, serialized])
}

export function usePageSeoOverride(meta: { title: string; description: string; url?: string } | null) {
  const serialized = meta ? JSON.stringify(meta) : null

  useEffect(() => {
    if (!serialized) {
      return
    }

    queueMicrotask(() => {
      const nextMeta = JSON.parse(serialized) as { title: string; description: string; url?: string }

      document.title = nextMeta.title
      ensureMetaContent('name', 'description', nextMeta.description)
      ensureMetaContent('property', 'og:title', nextMeta.title)
      ensureMetaContent('property', 'og:description', nextMeta.description)
      ensureMetaContent('name', 'twitter:title', nextMeta.title)
      ensureMetaContent('name', 'twitter:description', nextMeta.description)

      if (nextMeta.url) {
        ensureMetaContent('property', 'og:url', nextMeta.url)
      }
    })
  }, [serialized])
}
