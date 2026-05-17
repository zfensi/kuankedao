import { Fragment, type ReactNode } from 'react'

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean)

  return tokens.map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={index}>{token.slice(2, -2)}</strong>
    }

    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded bg-[rgb(var(--card))] px-1.5 py-0.5 text-[0.9em] text-[rgb(var(--fg))]"
        >
          {token.slice(1, -1)}
        </code>
      )
    }

    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={index}>{token.slice(1, -1)}</em>
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[rgb(var(--accent))] underline decoration-[rgb(var(--accent))]/40 underline-offset-4 hover:decoration-[rgb(var(--accent))]"
        >
          {linkMatch[1]}
        </a>
      )
    }

    return <Fragment key={index}>{token}</Fragment>
  })
}

function renderBlock(block: string, index: number) {
  const lines = block.split('\n')
  const firstLine = lines[0]?.trim() ?? ''

  const headingMatch = firstLine.match(/^(#{1,6})\s+(.*)$/)
  if (headingMatch) {
    const level = headingMatch[1].length
    const content = renderInline(headingMatch[2])

    if (level === 1) {
      return (
        <h1 key={index} className="text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">
          {content}
        </h1>
      )
    }

    if (level === 2) {
      return (
        <h2 key={index} className="mt-10 text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">
          {content}
        </h2>
      )
    }

    return (
      <h3 key={index} className="mt-8 text-xl font-semibold tracking-tight text-[rgb(var(--fg))]">
        {content}
      </h3>
    )
  }

  if (lines.every((line) => line.trim().startsWith('- '))) {
    return (
      <ul key={index} className="list-disc space-y-2 pl-6 text-sm leading-7 text-[rgb(var(--fg))]">
        {lines.map((line, lineIndex) => (
          <li key={lineIndex}>{renderInline(line.trim().slice(2))}</li>
        ))}
      </ul>
    )
  }

  return (
    <p key={index} className="text-sm leading-7 text-[rgb(var(--fg))]">
      {renderInline(lines.join(' '))}
    </p>
  )
}

export function MarkdownRenderer(props: { content: string }) {
  const blocks = props.content
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  return <div className="space-y-5">{blocks.map((block, index) => renderBlock(block, index))}</div>
}
