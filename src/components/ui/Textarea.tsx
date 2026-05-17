import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props
  return (
    <textarea
      {...rest}
      className={cn(
        'min-h-28 w-full resize-y rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]',
        className,
      )}
    />
  )
}

