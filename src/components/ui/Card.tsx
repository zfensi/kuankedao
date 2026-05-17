import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props
  return (
    <div
      {...rest}
      className={cn(
        'rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-[0_1px_0_rgba(0,0,0,0.02)]',
        className,
      )}
    />
  )
}

