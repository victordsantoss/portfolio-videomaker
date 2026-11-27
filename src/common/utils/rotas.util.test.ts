import { describe, expect, it } from 'vitest'

import { Ancoras, Rotas } from './rotas.util'

describe('Rotas', () => {
  it('monta a página inicial de cada idioma', () => {
    expect(Rotas.inicio('pt')).toBe('/pt')
    expect(Rotas.inicio('en')).toBe('/en')
  })

  it('monta o link de uma seção da página inicial', () => {
    expect(Rotas.secao('en', Ancoras.TRABALHOS)).toBe('/en#trabalhos')
  })
})
