import type { ComponentProps } from 'react'
import Link from 'next/link'

import { cn } from '../../utils/classes.util'

/** Ação principal das telas de estado: texto sublinhado, sem cara de botão de SaaS. */
export function LinkEstado({ className, ...props }: Readonly<ComponentProps<typeof Link>>) {
  return (
    <Link
      className={cn(
        'border-foreground border-b pb-1 text-sm transition-colors hover:border-destaque hover:text-destaque',
        className,
      )}
      {...props}
    />
  )
}
