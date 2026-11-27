import { describe, expect, it } from 'vitest'

import { lerCookie, serializarCookie } from './cookie.util'

describe('serializarCookie', () => {
  it('usa validade de um ano, caminho raiz e SameSite=Lax por padrão', () => {
    expect(serializarCookie('tema', 'escuro')).toBe(
      'tema=escuro; Path=/; Max-Age=31536000; SameSite=Lax',
    )
  })

  it('codifica o valor e adiciona Secure quando pedido', () => {
    expect(serializarCookie('a', 'b c', { secure: true, maxAge: 10 })).toBe(
      'a=b%20c; Path=/; Max-Age=10; SameSite=Lax; Secure',
    )
  })
})

describe('lerCookie', () => {
  it('encontra o cookie pelo nome exato', () => {
    expect(lerCookie('x=1; portfolio.esquema-cor=claro; y=2', 'portfolio.esquema-cor')).toBe(
      'claro',
    )
  })

  it('devolve undefined quando o cookie não existe', () => {
    expect(lerCookie('x=1', 'portfolio.esquema-cor')).toBeUndefined()
  })
})
