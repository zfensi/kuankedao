import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Badge(props: HTMLAttributes<HTMLSpanElement>) {
  const { className, ...rest } = props
  return (
    <span
      {...rest}
      className={cn(
        'inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-2.5 py-1 text-xs text-[rgb(var(--muted))]',
        className,
      )}
    />
  )
}

