import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md'

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant
    size?: Size
  },
) {
  const { className, variant = 'primary', size = 'md', ...rest } = props

  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))] disabled:pointer-events-none disabled:opacity-50',
        size === 'md' ? 'h-10 px-4' : 'h-8 px-3 text-xs',
        variant === 'primary' &&
          'border-[rgb(var(--accent))] bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] hover:brightness-95 active:brightness-90',
        variant === 'outline' &&
          'border-[rgb(var(--border))] bg-transparent text-[rgb(var(--fg))] hover:bg-[rgb(var(--card))]',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-[rgb(var(--fg))] hover:bg-[rgb(var(--card))]',
        className,
      )}
    />
  )
}

