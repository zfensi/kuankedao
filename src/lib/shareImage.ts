const GENERIC_ICON_PATHS = new Set(['/favicon.svg', '/icon-192.svg', '/icon-512.svg'])

function toAbsoluteUrl(path: string) {
  return new URL(path, window.location.origin).toString()
}

function buildGeneratedImageUrl(prompt: string) {
  const encodedPrompt = encodeURIComponent(prompt)
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=landscape_16_9`
}

function buildEditorialPrompt(subject: string, summary: string, theme: string) {
  return [
    'professional editorial website hero image',
    subject,
    theme,
    summary,
    'clean modern composition',
    'soft blue and indigo palette',
    'subtle abstract depth',
    'high-end SaaS marketing visual',
    'no text',
    'no watermark',
  ].join(', ')
}

export function resolveShareImage(options: {
  preferredPath?: string
  subject: string
  summary: string
  theme: string
}) {
  const preferredPath = options.preferredPath?.trim()
  if (preferredPath && !GENERIC_ICON_PATHS.has(preferredPath)) {
    return toAbsoluteUrl(preferredPath)
  }

  return buildGeneratedImageUrl(buildEditorialPrompt(options.subject, options.summary, options.theme))
}
