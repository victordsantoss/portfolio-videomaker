import { describe, expect, it } from 'vitest'

import { cn } from './classes.util'

describe('cn', () => {
  it('ignora valores falsos', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b')
  })

  it('resolve conflitos do Tailwind mantendo a última classe', () => {
    expect(cn('px-2 text-sm', 'px-4')).toBe('text-sm px-4')
  })
})
