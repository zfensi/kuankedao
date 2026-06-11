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
