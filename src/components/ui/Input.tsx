import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props
  return (
    <input
      {...rest}
      className={cn(
        'h-10 w-full rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]',
        className,
      )}
    />
  )
}

