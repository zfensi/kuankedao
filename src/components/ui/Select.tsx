import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, children, ...rest } = props
  return (
    <div className={cn('relative', className)}>
      <select
        {...rest}
        className="h-10 w-full appearance-none rounded-lg border border-[rgb(var(--border))] bg-transparent px-3 pr-10 text-sm text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
    </div>
  )
}

