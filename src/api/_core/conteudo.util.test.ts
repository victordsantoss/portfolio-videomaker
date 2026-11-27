import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { localizar, textoLocalizadoSchema, validarConteudo } from './conteudo.util'

describe('localizar', () => {
  it('devolve o texto do idioma pedido', () => {
    expect(localizar({ pt: 'Olá', en: 'Hello' }, 'en')).toBe('Hello')
  })
})

describe('textoLocalizadoSchema', () => {
  it('exige texto em todos os idiomas', () => {
    expect(textoLocalizadoSchema.safeParse({ pt: 'Olá' }).success).toBe(false)
    expect(textoLocalizadoSchema.safeParse({ pt: 'Olá', en: ' ' }).success).toBe(false)
  })
})

describe('validarConteudo', () => {
  const schema = z.object({ ano: z.number() })

  it('devolve os dados quando são válidos', () => {
    expect(validarConteudo(schema, { ano: 2025 }, 'teste.json')).toEqual({ ano: 2025 })
  })

  it('lança um erro com a origem quando são inválidos', () => {
    expect(() => validarConteudo(schema, { ano: 'x' }, 'teste.json')).toThrow(/teste\.json/)
  })
})
